
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Bookmark, Share2, TrendingUp, TrendingDown, ExternalLink, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import SourceBadge from './SourceBadge';

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
  country?: string;
}

interface NewsCardProps {
  news: NewsItem;
  index: number;
}

const NewsCard = ({ news, index }: NewsCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  const fallbackImages = [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=800&q=80'
  ];
  
  const getRandomFallbackImage = () => {
    const randomIndex = Math.floor(Math.random() * fallbackImages.length);
    return fallbackImages[randomIndex];
  };

  const timeAgo = (date: string) => {
    const now = new Date();
    const published = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - published.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

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

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked ? "Article removed from your reading list" : "Article saved to your reading list",
      duration: 2000,
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      navigator.share({
        title: news.title,
        text: news.summary,
        url: window.location.origin + `/news/${news.id}`
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + `/news/${news.id}`);
      toast({
        title: "Link copied",
        description: "Article link copied to clipboard",
        duration: 2000,
      });
    }
  };

  const sentiment = sentimentConfig[news.sentiment];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group news-card-enhanced bg-card border shadow-sm"
    >
      <Link to={`/news/${news.id}`} className="block h-full focus-elegant">
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
        
        <div className="p-6 space-y-4">
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
          
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className={`h-8 px-2 hover:bg-primary/10 ${isBookmarked ? 'text-primary' : ''}`}
                onClick={handleBookmark}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 hover:bg-primary/10"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-xs text-muted-foreground hover:text-primary"
            >
              Read more
              <ExternalLink className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default NewsCard;
