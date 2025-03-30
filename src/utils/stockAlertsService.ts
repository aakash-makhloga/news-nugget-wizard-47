
interface StockAlert {
  id: string;
  symbol: string;
  targetPrice: number;
  isAboveTarget: boolean; // true if alert when price goes above target, false for below
  isActive: boolean;
  createdAt: string;
}

// Local storage key
const ALERTS_STORAGE_KEY = 'stock_price_alerts';

// Get alerts from storage
export const getStockAlerts = (): StockAlert[] => {
  const stored = localStorage.getItem(ALERTS_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return [];
};

// Save alerts to storage
export const saveStockAlerts = (alerts: StockAlert[]): void => {
  localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(alerts));
};

// Add a new alert
export const addStockAlert = (alert: Omit<StockAlert, 'id' | 'createdAt' | 'isActive'>): StockAlert => {
  const alerts = getStockAlerts();
  
  const newAlert: StockAlert = {
    id: Math.random().toString(36).substr(2, 9),
    isActive: true,
    createdAt: new Date().toISOString(),
    ...alert
  };
  
  alerts.push(newAlert);
  saveStockAlerts(alerts);
  
  return newAlert;
};

// Remove an alert
export const removeStockAlert = (id: string): void => {
  const alerts = getStockAlerts();
  const filteredAlerts = alerts.filter(alert => alert.id !== id);
  saveStockAlerts(filteredAlerts);
};

// Toggle alert status
export const toggleAlertStatus = (id: string): StockAlert | null => {
  const alerts = getStockAlerts();
  const alertIndex = alerts.findIndex(alert => alert.id === id);
  
  if (alertIndex !== -1) {
    alerts[alertIndex].isActive = !alerts[alertIndex].isActive;
    saveStockAlerts(alerts);
    return alerts[alertIndex];
  }
  
  return null;
};

// Check if any alerts have been triggered based on current stock prices
export const checkAlertTriggers = (stockData: { symbol: string, price: number }[]): StockAlert[] => {
  const alerts = getStockAlerts();
  const triggeredAlerts: StockAlert[] = [];
  
  alerts.forEach(alert => {
    if (!alert.isActive) return;
    
    const stockMatch = stockData.find(stock => stock.symbol === alert.symbol);
    if (!stockMatch) return;
    
    const isTriggered = alert.isAboveTarget 
      ? stockMatch.price >= alert.targetPrice 
      : stockMatch.price <= alert.targetPrice;
    
    if (isTriggered) {
      triggeredAlerts.push(alert);
    }
  });
  
  return triggeredAlerts;
};
