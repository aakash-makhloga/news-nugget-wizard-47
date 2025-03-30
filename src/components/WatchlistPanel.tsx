
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Trash, ExternalLink, RefreshCw, Pencil, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  getWatchlist, 
  removeFromWatchlist, 
  updateWatchlistNotes,
  WatchlistItem 
} from '@/utils/watchlistService';
import { fetchStockData } from '@/utils/stocksService';
import { toast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';

interface WatchlistPanelProps {
  onClose?: () => void;
}

const WatchlistPanel: React.FC<WatchlistPanelProps> = ({ onClose }) => {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [stockData, setStockData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    loadWatchlist();
  }, []);

  const loadWatchlist = async () => {
    setLoading(true);
    const { items } = getWatchlist();
    setWatchlist(items);
    
    // Fetch stock data for each watchlist item
    const stockDataMap: Record<string, any> = {};
    
    for (const item of items) {
      try {
        const data = await fetchStockData(item.symbol);
        if (data) {
          stockDataMap[item.symbol] = data;
        }
      } catch (error) {
        console.error(`Error fetching data for ${item.symbol}:`, error);
      }
    }
    
    setStockData(stockDataMap);
    setLoading(false);
  };

  const handleRemove = (symbol: string) => {
    removeFromWatchlist(symbol);
    setWatchlist(prev => prev.filter(item => item.symbol !== symbol));
    toast({
      title: "Removed from watchlist",
      description: `${symbol} has been removed from your watchlist`,
    });
  };

  const startEditingNote = (symbol: string, currentNote: string = '') => {
    setEditingNote(symbol);
    setNoteText(currentNote);
  };

  const saveNote = (symbol: string) => {
    updateWatchlistNotes(symbol, noteText);
    setWatchlist(prev => 
      prev.map(item => 
        item.symbol === symbol 
          ? { ...item, notes: noteText } 
          : item
      )
    );
    setEditingNote(null);
    toast({
      title: "Note updated",
      description: `Your note for ${symbol} has been saved`,
    });
  };

  if (loading && watchlist.length === 0) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin mx-auto h-8 w-8 border-2 border-primary border-t-transparent rounded-full mb-4" />
        <p>Loading watchlist...</p>
      </div>
    );
  }

  if (watchlist.length === 0) {
    return (
      <div className="p-6 text-center">
        <EyeOff className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">Your watchlist is empty</h3>
        <p className="text-muted-foreground mt-2">
          Add stocks to your watchlist to track them without adding them to your portfolio.
        </p>
        {onClose && (
          <Button onClick={onClose} variant="outline" className="mt-4">
            Close
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4 p-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Your Watchlist</h3>
        <Button variant="ghost" size="sm" onClick={loadWatchlist} className="gap-1">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <AnimatePresence>
        {watchlist.map((item) => {
          const stock = stockData[item.symbol];
          
          return (
            <motion.div
              key={item.symbol}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 border rounded-lg mb-3 bg-background"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <div className="font-medium">
                    {item.symbol} 
                    {stock && (
                      <span className="ml-2 text-sm">
                        ${stock.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {stock && (
                    <div className={`text-sm ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change >= 0 ? '▲' : '▼'} 
                      {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Link to={`/stocks/${item.symbol}`}>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleRemove(item.symbol)}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              
              {editingNote === item.symbol ? (
                <div className="mt-2">
                  <Textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Add your notes here..."
                    className="text-sm mb-2"
                    rows={2}
                  />
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingNote(null)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => saveNote(item.symbol)}
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div 
                  className="text-sm mt-1 flex justify-between items-start"
                  onClick={() => startEditingNote(item.symbol, item.notes)}
                >
                  {item.notes ? (
                    <div className="text-muted-foreground">
                      {item.notes}
                    </div>
                  ) : (
                    <div className="text-muted-foreground italic cursor-pointer">
                      Add note...
                    </div>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
      
      {onClose && (
        <Button onClick={onClose} className="w-full">
          Close
        </Button>
      )}
    </div>
  );
};

export default WatchlistPanel;
