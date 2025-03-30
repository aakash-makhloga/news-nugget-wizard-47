
import React, { useState } from 'react';
import { Eye, Bell, BellRing } from 'lucide-react';
import ThemeModeToggle from './ThemeModeToggle';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import WatchlistPanel from './WatchlistPanel';
import StockAlertsManager from './StockAlertsManager';

const HeaderActions: React.FC = () => {
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowWatchlist(true)}
        aria-label="View watchlist"
      >
        <Eye className="h-5 w-5" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setShowAlerts(true)}
        aria-label="Manage price alerts"
      >
        <BellRing className="h-5 w-5" />
      </Button>
      
      <ThemeModeToggle />
      
      <Sheet open={showWatchlist} onOpenChange={setShowWatchlist}>
        <SheetContent side="right" className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Watchlist</SheetTitle>
          </SheetHeader>
          <WatchlistPanel onClose={() => setShowWatchlist(false)} />
        </SheetContent>
      </Sheet>
      
      <Dialog open={showAlerts} onOpenChange={setShowAlerts}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Price Alerts</DialogTitle>
          </DialogHeader>
          <StockAlertsManager onClose={() => setShowAlerts(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeaderActions;
