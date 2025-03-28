import React, { useState, useEffect } from 'react';
import NewsCard, { NewsItem } from './NewsCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Filter, RefreshCw, Search, X, Globe, Flag, Loader2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import SourceFilter from './SourceFilter';
import { toast } from '@/components/ui/use-toast';

interface NewsGridProps {
  news: NewsItem[];
  title?: string;
  loading?: boolean;
  onRefresh?: () => void;
  onFilterByCountry?: (country: string) => void;
}

const NewsGrid = ({ 
  news, 
  title, 
  loading = false, 
  onRefresh, 
  onFilterByCountry 
}: NewsGridProps) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  
  const countries = Array.from(new Set(news.map(item => item.country || 'Global'))).sort();
  const sources = Array.from(new Set(news.map(item => item.source))).sort();
  
  const filteredCountries = countries.filter(country => 
    country.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country === 'All' ? null : country);
    setShowSearch(false);
    setSearchQuery('');
    
    if (onFilterByCountry) {
      onFilterByCountry(country === 'All' ? '' : country);
      toast({
        title: `Filtered by ${country === 'All' ? 'all countries' : country}`,
        duration: 2000,
      });
    }
  };
  
  const handleSourceSelect = (source: string) => {
    setSelectedSource(source === 'All' ? null : source);
    toast({
      title: `Filtered by ${source === 'All' ? 'all sources' : source}`,
      duration: 2000,
    });
  };
  
  const filteredNews = news.filter(item => {
    const matchesCountry = selectedCountry ? item.country === selectedCountry : true;
    const matchesSource = selectedSource ? item.source === selectedSource : true;
    return matchesCountry && matchesSource;
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.country-search-container') && !target.closest('.country-filter-btn') &&
          !target.closest('.source-filter-container') && !target.closest('.source-filter-btn')) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderCountryFlag = (country: string) => {
    if (country === 'All' || country === 'Global') {
      return <Globe className="h-4 w-4 mr-2 text-blue-500" />;
    }
    return <Flag className="h-4 w-4 mr-2 text-blue-500" />;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {title && <h2 className="text-2xl font-medium">{title}</h2>}
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 mr-3" />
          <span className="text-lg text-gray-600">Loading news...</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="rounded-xl overflow-hidden bg-gray-100 animate-pulse">
              <div className="aspect-[16/9] bg-gray-200"></div>
              <div className="p-5 space-y-3">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No news found</h3>
        <p className="text-gray-600">Try adjusting your filters or check back later.</p>
        {onRefresh && (
          <Button onClick={onRefresh} variant="outline" className="mt-4">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh News
          </Button>
        )}
      </div>
    );
  }

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {title && (
          <motion.h2 
            className="text-2xl font-medium"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h2>
        )}
        
        <div className="flex items-center gap-3 flex-wrap">
          {selectedCountry && (
            <Badge variant="outline" className="animate-fadeIn flex items-center">
              {renderCountryFlag(selectedCountry)}
              {selectedCountry}
              <button 
                className="ml-1 text-gray-500 hover:text-gray-700"
                onClick={() => handleCountrySelect('All')}
              >
                ×
              </button>
            </Badge>
          )}
          
          <div className="relative country-search-container">
            <Button 
              variant="outline" 
              size="sm" 
              className="country-filter-btn flex items-center"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter by Country
            </Button>
            
            {showSearch && (
              <div className="absolute right-0 top-full mt-2 w-64 rounded-md bg-white shadow-lg border border-gray-200 z-10 overflow-hidden">
                <div className="p-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search country..."
                      className="pl-8 text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    {searchQuery && (
                      <button 
                        className="absolute right-2 top-2.5"
                        onClick={() => setSearchQuery('')}
                      >
                        <X className="h-4 w-4 text-gray-400" />
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="max-h-60 overflow-y-auto">
                  <div 
                    className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => handleCountrySelect('All')}
                  >
                    <Globe className="h-4 w-4 mr-2 text-blue-500" />
                    All Countries
                  </div>
                  
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map(country => (
                      <div
                        key={country}
                        className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer flex items-center"
                        onClick={() => handleCountrySelect(country)}
                      >
                        {renderCountryFlag(country)}
                        {country}
                      </div>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-sm text-gray-500">
                      No countries found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <SourceFilter 
            sources={sources}
            selectedSource={selectedSource}
            onSourceSelect={handleSourceSelect}
          />
          
          {onRefresh && (
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={onRefresh}
              className="hover:bg-blue-50"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          )}
        </div>
      </div>
      
      <AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <NewsCard news={item} index={index} />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </motion.div>
  );
};

export default NewsGrid;
