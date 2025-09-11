import React from 'react';
import { Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import SourceBadge from './SourceBadge';
import { NewsItem } from './NewsCard';

interface NewsCardHeaderProps {
  news: NewsItem;
  timeAgo: (date: string) => string;
}

const NewsCardHeader = ({ news, timeAgo }: NewsCardHeaderProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <SourceBadge source={news.source} showReliability />
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          {timeAgo(news.publishedAt)}
        </div>
      </div>
      
      <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors text-balance">
        {news.title}
      </h3>
      
      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
        {news.summary}
      </p>
    </div>
  );
};

export default NewsCardHeader;