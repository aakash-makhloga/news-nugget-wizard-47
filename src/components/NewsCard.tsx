import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Bookmark, Share2, TrendingUp, TrendingDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
  imageUrl: string;
  category: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  url: string;
  country?: string; // Added country as an optional property
}

interface NewsCardProps {
  news: NewsItem;
  index: number;
}

const NewsCard = ({ news, index }: NewsCardProps) => {
  const timeAgo = (date: string) => {
    const now = new Date();
    const published = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - published.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const sentimentIcon = () => {
    switch (news.sentiment) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-finance-positive" />;
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-finance-negative" />;
      default:
        return null;
    }
  };

  const sentimentColor = () => {
    switch (news.sentiment) {
      case 'positive':
        return 'border-finance-positive/20 bg-finance-positive/5';
      case 'negative':
        return 'border-finance-negative/20 bg-finance-negative/5';
      default:
        return 'border-finance-neutral/20 bg-finance-neutral/5';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`group overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm card-hover`}
    >
      <Link to={`/news/${news.id}`} className="block h-full">
        <div className="relative overflow-hidden aspect-[16/9]">
          <img 
            src={news.imageUrl || 'https://via.placeholder.com/800x450?text=No+Image'} 
            alt={news.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-xs font-medium">
              {news.category}
            </Badge>
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-600">{news.source}</span>
              <span className="text-gray-400">•</span>
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                {timeAgo(news.publishedAt)}
              </div>
            </div>
            
            <div className={`flex items-center rounded-full px-2 py-0.5 text-xs ${sentimentColor()}`}>
              {sentimentIcon()}
            </div>
          </div>
          
          <h3 className="font-medium text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors text-balance">
            {news.title}
          </h3>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {news.summary}
          </p>
          
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <span className="text-sm font-medium text-blue-600">Read more</span>
            
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default NewsCard;
