import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { NewsItem } from './NewsCard';

interface NewsCardImageProps {
  news: NewsItem;
  imageLoaded: boolean;
  imageError: boolean;
  setImageLoaded: (loaded: boolean) => void;
  setImageError: (error: boolean) => void;
  getRandomFallbackImage: () => string;
}

const NewsCardImage = ({ 
  news, 
  imageLoaded, 
  imageError, 
  setImageLoaded, 
  setImageError, 
  getRandomFallbackImage 
}: NewsCardImageProps) => {
  const sentimentConfig = {
    positive: {
      icon: <TrendingUp className="h-4 w-4" />,
      color: 'text-finance-positive',
      bgColor: 'bg-finance-positive/10 border-finance-positive/20'
    },
    negative: {
      icon: <TrendingDown className="h-4 w-4" />,
      color: 'text-finance-negative',
      bgColor: 'bg-finance-negative/10 border-finance-negative/20'
    },
    neutral: {
      icon: <Eye className="h-4 w-4" />,
      color: 'text-muted-foreground',
      bgColor: 'bg-muted/50 border-border'
    }
  };

  const sentiment = sentimentConfig[news.sentiment];

  return (
    <div className="relative overflow-hidden aspect-[16/9]">
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 skeleton" />
      )}
      
      <img 
        src={imageError ? getRandomFallbackImage() : (news.imageUrl || getRandomFallbackImage())} 
        alt={news.title}
        className={`w-full h-full object-cover transition-all duration-700 ${
          imageLoaded ? 'opacity-100 group-hover:scale-110' : 'opacity-0'
        }`}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        onError={() => {
          setImageError(true);
          setImageLoaded(true);
        }}
      />
      
      <div className="image-overlay" />
      
      <div className="absolute top-3 left-3 flex gap-2 z-10">
        <Badge 
          variant="secondary" 
          className="glass text-xs font-medium backdrop-blur-md"
        >
          {news.category}
        </Badge>
        {news.country && (
          <Badge 
            variant="outline" 
            className="glass text-xs backdrop-blur-md border-white/30 text-white"
          >
            {news.country}
          </Badge>
        )}
      </div>

      <div className="absolute top-3 right-3 z-10">
        <div className={`flex items-center rounded-full px-2 py-1 text-xs border ${sentiment.bgColor} glass backdrop-blur-md`}>
          <span className={sentiment.color}>
            {sentiment.icon}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsCardImage;