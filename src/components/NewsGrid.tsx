import React, { useState, useEffect } from 'react';
import NewsCard, { NewsItem } from './NewsCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Filter, RefreshCw, Search, X, Globe, Flag, Loader2, Newspaper } from 'lucide-react';
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
      <div className="space-y-8">
        {title && (
          <div className="skeleton h-8 w-48 animate-shimmer"></div>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="skeleton h-6 w-32 animate-shimmer"></div>
          <div className="flex items-center gap-3">
            <div className="skeleton h-9 w-32 animate-shimmer"></div>
            <div className="skeleton h-9 w-24 animate-shimmer"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <motion.div 
              key={index} 
              className="card-premium overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="aspect-[16/9] skeleton animate-shimmer"></div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="skeleton h-5 w-20 animate-shimmer"></div>
                  <div className="skeleton h-4 w-12 animate-shimmer"></div>
                </div>
                <div className="skeleton h-6 w-full animate-shimmer"></div>
                <div className="skeleton h-4 w-3/4 animate-shimmer"></div>
                <div className="skeleton h-4 w-1/2 animate-shimmer"></div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="skeleton h-4 w-16 animate-shimmer"></div>
                  <div className="flex gap-2">
                    <div className="skeleton h-8 w-8 rounded animate-shimmer"></div>
                    <div className="skeleton h-8 w-8 rounded animate-shimmer"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <motion.div 
        className="text-center py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="glass rounded-2xl p-8 max-w-md mx-auto">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Newspaper className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No news found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your filters or check back later for new stories.
          </p>
          {onRefresh && (
            <Button onClick={onRefresh} variant="outline" className="glass">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh News
            </Button>
          )}
        </div>
      </motion.div>
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
            <AnimatePresence mode="popLayout">
              {selectedCountry && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Badge variant="outline" className="glass flex items-center gap-2 pr-1">
                    {renderCountryFlag(selectedCountry)}
                    {selectedCountry}
                    <button 
                      className="ml-1 hover:bg-destructive/20 rounded-sm p-0.5 transition-colors"
                      onClick={() => handleCountrySelect('All')}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="relative country-search-container">
              <Button 
                variant="outline" 
                size="sm" 
                className="country-filter-btn flex items-center glass hover:bg-primary/5"
                onClick={() => setShowSearch(!showSearch)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter by Region
              </Button>
              
              <AnimatePresence>
                {showSearch && (
                  <motion.div 
                    className="absolute right-0 top-full mt-2 w-64 glass rounded-lg border shadow-lg z-20 overflow-hidden"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="p-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search regions..."
                          className="pl-9 text-sm focus-elegant"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          autoFocus
                        />
                        {searchQuery && (
                          <button 
                            className="absolute right-2 top-2.5 hover:bg-muted rounded-sm p-0.5"
                            onClick={() => setSearchQuery('')}
                          >
                            <X className="h-4 w-4 text-muted-foreground" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="max-h-60 overflow-y-auto">
                      <motion.div 
                        className="px-4 py-3 text-sm hover:bg-muted/50 cursor-pointer flex items-center transition-colors"
                        onClick={() => handleCountrySelect('All')}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.1 }}
                      >
                        <Globe className="h-4 w-4 mr-3 text-primary" />
                        All Regions
                      </motion.div>
                      
                      <AnimatePresence mode="popLayout">
                        {filteredCountries.length > 0 ? (
                          filteredCountries.map((country, index) => (
                            <motion.div
                              key={country}
                              className="px-4 py-3 text-sm hover:bg-muted/50 cursor-pointer flex items-center transition-colors"
                              onClick={() => handleCountrySelect(country)}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.2, delay: index * 0.05 }}
                              whileHover={{ x: 4 }}
                            >
                              {renderCountryFlag(country)}
                              <span className="ml-3">{country}</span>
                            </motion.div>
                          ))
                        ) : (
                          <div className="px-4 py-6 text-sm text-muted-foreground text-center">
                            No regions found
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
