import React from 'react';
import { Bookmark, Share2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NewsCardActionsProps {
  isBookmarked: boolean;
  onBookmark: (e: React.MouseEvent) => void;
  onShare: (e: React.MouseEvent) => void;
}

  const NewsCardActions = ({ isBookmarked, onBookmark, onShare }: NewsCardActionsProps) => {
  const handleClick = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  return (
    <div className="flex items-center justify-between pt-2 border-t border-border/50">
      <div className="flex items-center gap-1">
        <Button 
          variant="ghost" 
          size="sm" 
          className={`h-8 px-2 hover:bg-primary/10 ${isBookmarked ? 'text-primary' : ''}`}
          onClick={(e) => handleClick(e, () => onBookmark(e))}
        >
          <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 px-2 hover:bg-primary/10"
          onClick={(e) => handleClick(e, () => onShare(e))}
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default NewsCardActions;