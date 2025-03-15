
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

const StockTicker = () => {
  const [stocks, setStocks] = useState<StockData[]>([
    { symbol: 'AAPL', price: 173.75, change: 1.23, changePercent: 0.71 },
    { symbol: 'MSFT', price: 415.50, change: -2.30, changePercent: -0.55 },
    { symbol: 'GOOGL', price: 152.33, change: 0.89, changePercent: 0.59 },
    { symbol: 'AMZN', price: 178.75, change: -1.24, changePercent: -0.69 },
    { symbol: 'TSLA', price: 246.30, change: 5.78, changePercent: 2.40 },
    { symbol: 'META', price: 482.15, change: 3.25, changePercent: 0.68 },
    { symbol: 'NFLX', price: 638.92, change: -4.23, changePercent: -0.66 },
    { symbol: 'NVDA', price: 879.85, change: 12.75, changePercent: 1.47 },
  ]);

  // This would be replaced with real API call in production
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks => 
        prevStocks.map(stock => ({
          ...stock,
          price: parseFloat((stock.price + (Math.random() * 2 - 1) * 0.5).toFixed(2)),
          change: parseFloat((Math.random() * 2 - 1 * 3).toFixed(2)),
          changePercent: parseFloat((Math.random() * 2 - 1 * 0.8).toFixed(2))
        }))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full bg-white/50 backdrop-blur-sm border-y border-gray-200">
      <div className="ticker-container py-3 overflow-hidden">
        <div className="ticker-content inline-flex items-center space-x-8 animate-ticker">
          {stocks.map((stock, index) => (
            <motion.div 
              key={`${stock.symbol}-${index}`}
              className="flex items-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="font-medium text-sm">{stock.symbol}</span>
              <span className="text-sm">${stock.price.toFixed(2)}</span>
              <div className={`flex items-center ${stock.change >= 0 ? 'text-finance-positive' : 'text-finance-negative'}`}>
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
          ))}
          
          {/* Duplicate tickers for seamless loop */}
          {stocks.map((stock, index) => (
            <motion.div 
              key={`${stock.symbol}-duplicate-${index}`}
              className="flex items-center space-x-2"
            >
              <span className="font-medium text-sm">{stock.symbol}</span>
              <span className="text-sm">${stock.price.toFixed(2)}</span>
              <div className={`flex items-center ${stock.change >= 0 ? 'text-finance-positive' : 'text-finance-negative'}`}>
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
