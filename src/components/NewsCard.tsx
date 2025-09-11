
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import NewsCardImage from './NewsCardImage';
import NewsCardHeader from './NewsCardHeader';
import NewsCardActions from './NewsCardActions';

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

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group news-card-enhanced bg-card border shadow-sm"
    >
      <Link to={`/news/${news.id}`} className="block h-full focus-elegant">
        <NewsCardImage 
          news={news}
          imageLoaded={imageLoaded}
          imageError={imageError}
          setImageLoaded={setImageLoaded}
          setImageError={setImageError}
          getRandomFallbackImage={getRandomFallbackImage}
        />
        
        <div className="p-6 space-y-4">
          <NewsCardHeader news={news} timeAgo={timeAgo} />
          <NewsCardActions 
            isBookmarked={isBookmarked}
            onBookmark={handleBookmark}
            onShare={handleShare}
          />
        </div>
      </Link>
    </motion.article>
  );
};

export default NewsCard;
