
import React, { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { checkAlertTriggers } from '@/utils/stockAlertsService';
import { fetchPopularStocks } from '@/utils/stocksService';

const AlertsChecker = () => {
  const checkForAlerts = async () => {
    try {
      // Fetch current stock data
      const stocks = await fetchPopularStocks();
      
      // Format for alert checking
      const stockData = stocks.map(stock => ({
        symbol: stock.symbol,
        price: stock.price
      }));
      
      // Check for triggered alerts
      const triggeredAlerts = checkAlertTriggers(stockData);
      
      // Show toast notifications for each triggered alert
      triggeredAlerts.forEach(alert => {
        toast({
          title: `Price Alert: ${alert.symbol}`,
          description: `The price ${alert.isAboveTarget ? 'rose above' : 'fell below'} $${alert.targetPrice.toFixed(2)}`,
          variant: "success",
          duration: 5000
        });
      });
      
    } catch (error) {
      console.error('Error checking alerts:', error);
    }
  };
  
  useEffect(() => {
    // Check alerts immediately when component mounts
    checkForAlerts();
    
    // Set up interval to check alerts periodically (every 60 seconds)
    const intervalId = setInterval(checkForAlerts, 60000);
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);
  
  // This component doesn't render anything visible
  return null;
};

export default AlertsChecker;
