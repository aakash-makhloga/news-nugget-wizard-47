
import React, { useState } from 'react';
import NewsCard, { NewsItem } from './NewsCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Filter, RefreshCw } from 'lucide-react';
import { Badge } from './ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

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
  
  const countries = Array.from(new Set(news.map(item => item.country || 'Global'))).sort();
  
  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country === 'All' ? null : country);
    if (onFilterByCountry) {
      onFilterByCountry(country === 'All' ? '' : country);
    }
  };
  
  const filteredNews = selectedCountry 
    ? news.filter(item => item.country === selectedCountry) 
    : news;

  if (loading) {
    return (
      <div className="space-y-6">
        {title && <h2 className="text-2xl font-medium">{title}</h2>}
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
        
        <div className="flex items-center gap-3">
          {selectedCountry && (
            <Badge variant="outline" className="animate-fadeIn">
              {selectedCountry}
              <button 
                className="ml-1 text-gray-500 hover:text-gray-700"
                onClick={() => handleCountrySelect('All')}
              >
                ×
              </button>
            </Badge>
          )}
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter by Country
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleCountrySelect('All')}>
                All Countries
              </DropdownMenuItem>
              {countries.map(country => (
                <DropdownMenuItem
                  key={country}
                  onClick={() => handleCountrySelect(country)}
                >
                  {country}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
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
