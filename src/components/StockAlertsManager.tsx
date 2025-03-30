
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BellRing, BellOff, Trash2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  getStockAlerts, 
  removeStockAlert, 
  toggleAlertStatus 
} from '@/utils/stockAlertsService';
import { toast } from '@/components/ui/use-toast';

interface StockAlert {
  id: string;
  symbol: string;
  targetPrice: number;
  isAboveTarget: boolean;
  isActive: boolean;
  createdAt: string;
}

interface StockAlertsManagerProps {
  onClose?: () => void;
}

const StockAlertsManager: React.FC<StockAlertsManagerProps> = ({ onClose }) => {
  const [alerts, setAlerts] = useState<StockAlert[]>([]);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = () => {
    const storedAlerts = getStockAlerts();
    setAlerts(storedAlerts);
  };

  const handleToggleStatus = (id: string) => {
    toggleAlertStatus(id);
    loadAlerts();
  };

  const handleRemoveAlert = (id: string) => {
    removeStockAlert(id);
    loadAlerts();
    toast({
      title: "Alert removed",
      description: "Price alert has been removed",
    });
  };

  if (alerts.length === 0) {
    return (
      <div className="p-6 text-center">
        <BellOff className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No price alerts set</h3>
        <p className="text-muted-foreground mt-2">
          Create alerts from any stock page to get notified when prices reach your targets.
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
        <h3 className="text-lg font-medium">Your Price Alerts</h3>
        <Button variant="ghost" size="sm" onClick={loadAlerts} className="gap-1">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="p-3 border rounded-lg mb-3 bg-background"
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">{alert.symbol}</div>
                <div className="text-sm text-muted-foreground">
                  Alert when price goes {alert.isAboveTarget ? 'above' : 'below'} ${alert.targetPrice.toFixed(2)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch 
                  checked={alert.isActive}
                  onCheckedChange={() => handleToggleStatus(alert.id)}
                />
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => handleRemoveAlert(alert.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {onClose && (
        <Button onClick={onClose} className="w-full">
          Close
        </Button>
      )}
    </div>
  );
};

export default StockAlertsManager;
