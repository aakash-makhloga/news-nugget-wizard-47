
import React from 'react';
import NewsCard, { NewsItem } from './NewsCard';
import { motion } from 'framer-motion';

interface NewsGridProps {
  news: NewsItem[];
  title?: string;
  loading?: boolean;
}

const NewsGrid = ({ news, title, loading = false }: NewsGridProps) => {
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item, index) => (
          <NewsCard key={item.id} news={item} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default NewsGrid;
