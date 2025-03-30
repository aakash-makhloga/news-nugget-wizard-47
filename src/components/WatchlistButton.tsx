
import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addToWatchlist, isInWatchlist, removeFromWatchlist } from '@/utils/watchlistService';
import { toast } from '@/components/ui/use-toast';

interface WatchlistButtonProps {
  symbol: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const WatchlistButton: React.FC<WatchlistButtonProps> = ({ 
  symbol,
  variant = 'outline',
  size = 'sm'
}) => {
  const [inWatchlist, setInWatchlist] = React.useState(isInWatchlist(symbol));

  const toggleWatchlist = () => {
    if (inWatchlist) {
      removeFromWatchlist(symbol);
      setInWatchlist(false);
      toast({
        title: "Removed from watchlist",
        description: `${symbol} has been removed from your watchlist`,
      });
    } else {
      addToWatchlist(symbol);
      setInWatchlist(true);
      toast({
        title: "Added to watchlist",
        description: `${symbol} has been added to your watchlist`,
      });
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleWatchlist}
    >
      {inWatchlist ? (
        <>
          <EyeOff className="h-4 w-4 mr-2" />
          Remove from Watchlist
        </>
      ) : (
        <>
          <Eye className="h-4 w-4 mr-2" />
          Add to Watchlist
        </>
      )}
    </Button>
  );
};

export default WatchlistButton;
