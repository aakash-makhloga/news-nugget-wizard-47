
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { fetchPopularStocks } from '@/utils/stocksService';

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  country?: string;
}

const StockTicker = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadStockData = async () => {
    try {
      setLoading(true);
      setError(false);
      const stockData = await fetchPopularStocks();
      setStocks(stockData);
    } catch (err) {
      console.error('Error loading stock data:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStockData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(() => {
      loadStockData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading && stocks.length === 0) {
    return (
      <div className="relative w-full bg-white/50 backdrop-blur-sm border-y border-gray-200">
        <div className="ticker-container py-3 overflow-hidden flex justify-center">
          <div className="animate-pulse flex items-center">
            <div className="h-4 w-32 bg-gray-200 rounded mx-2"></div>
            <div className="h-4 w-16 bg-gray-200 rounded mx-2"></div>
            <div className="h-4 w-24 bg-gray-200 rounded mx-2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full bg-white/50 backdrop-blur-sm border-y border-gray-200">
        <div className="ticker-container py-3 overflow-hidden flex justify-center">
          <p className="text-red-500 flex items-center">
            <Info className="h-4 w-4 mr-2" />
            Unable to load stock data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full bg-white/50 backdrop-blur-sm border-y border-gray-200">
      <div className="ticker-container py-3 overflow-hidden">
        <div className="ticker-content inline-flex items-center space-x-8 animate-ticker">
          <AnimatePresence>
            {stocks.map((stock, index) => (
              <TooltipProvider key={`${stock.symbol}-${index}`}>
                <Tooltip>
                  <TooltipTrigger>
                    <motion.div 
                      className="flex items-center space-x-2 cursor-help"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="font-medium text-sm">{stock.symbol}</span>
                      <span className="text-sm">${stock.price.toFixed(2)}</span>
                      <div className={`flex items-center ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stock.change >= 0 ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        <span className="text-xs font-medium">
                          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="text-xs p-1">
                      <p className="font-semibold">{stock.name}</p>
                      {stock.country && <p className="text-muted-foreground">Market: {stock.country}</p>}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </AnimatePresence>
          
          {/* Duplicate tickers for seamless loop */}
          {stocks.map((stock, index) => (
            <TooltipProvider key={`${stock.symbol}-duplicate-${index}`}>
              <Tooltip>
                <TooltipTrigger>
                  <motion.div 
                    className="flex items-center space-x-2 cursor-help"
                  >
                    <span className="font-medium text-sm">{stock.symbol}</span>
                    <span className="text-sm">${stock.price.toFixed(2)}</span>
                    <div className={`flex items-center ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stock.change >= 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      <span className="text-xs font-medium">
                        {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="text-xs p-1">
                    <p className="font-semibold">{stock.name}</p>
                    {stock.country && <p className="text-muted-foreground">Market: {stock.country}</p>}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
      
      {/* Gradient overlays for smooth edges */}
      <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </div>
  );
};

export default StockTicker;
