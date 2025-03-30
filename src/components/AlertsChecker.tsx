
import { useEffect, useState } from 'react';
import { fetchPopularStocks } from '@/utils/stocksService';
import { checkAlertTriggers, getStockAlerts } from '@/utils/stockAlertsService';
import { toast } from '@/components/ui/use-toast';
import { BellRing } from 'lucide-react';

// This component doesn't render anything, it just runs in the background
const AlertsChecker = () => {
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  useEffect(() => {
    // Run immediately when the component mounts
    checkAlerts();
    
    // Then run every minute
    const interval = setInterval(checkAlerts, 60000);
    
    return () => clearInterval(interval);
  }, []);
  
  const checkAlerts = async () => {
    const alerts = getStockAlerts();
    
    // If no active alerts, no need to check
    if (!alerts.filter(a => a.isActive).length) return;
    
    try {
      const stocks = await fetchPopularStocks();
      const triggeredAlerts = checkAlertTriggers(stocks);
      
      // Notify for each triggered alert
      triggeredAlerts.forEach(alert => {
        const stockData = stocks.find(s => s.symbol === alert.symbol);
        
        if (stockData) {
          toast({
            title: `Price Alert: ${alert.symbol}`,
            description: `${alert.symbol} is now ${alert.isAboveTarget ? 'above' : 'below'} $${alert.targetPrice.toFixed(2)} (Current: $${stockData.price.toFixed(2)})`,
            duration: 10000,
          });
        }
      });
      
      setLastChecked(new Date());
    } catch (error) {
      console.error('Error checking price alerts:', error);
    }
  };
  
  // This component doesn't render anything visible
  return null;
};

export default AlertsChecker;
