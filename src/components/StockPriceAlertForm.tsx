
import React, { useState } from 'react';
import { BellRing, Plus, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { addStockAlert } from '@/utils/stockAlertsService';
import { toast } from '@/components/ui/use-toast';

interface StockPriceAlertFormProps {
  symbol: string;
  currentPrice: number;
}

const StockPriceAlertForm: React.FC<StockPriceAlertFormProps> = ({ symbol, currentPrice }) => {
  const [showForm, setShowForm] = useState(false);
  const [targetPrice, setTargetPrice] = useState(currentPrice.toString());
  const [direction, setDirection] = useState<'above' | 'below'>('above');

  const handleCreateAlert = () => {
    if (!targetPrice || isNaN(Number(targetPrice))) {
      toast({
        title: "Invalid price",
        description: "Please enter a valid target price",
        variant: "destructive",
      });
      return;
    }

    const price = parseFloat(targetPrice);
    
    const alert = addStockAlert({
      symbol,
      targetPrice: price,
      isAboveTarget: direction === 'above',
    });

    toast({
      title: "Alert created",
      description: `You'll be notified when ${symbol} goes ${direction} $${price.toFixed(2)}`,
    });

    setShowForm(false);
  };

  if (!showForm) {
    return (
      <Button 
        variant="outline" 
        size="sm" 
        className="gap-2" 
        onClick={() => setShowForm(true)}
      >
        <BellRing className="h-4 w-4" />
        Set Price Alert
      </Button>
    );
  }

  return (
    <div className="p-4 border rounded-lg space-y-4 bg-background shadow-sm">
      <div className="flex justify-between items-center">
        <h4 className="font-medium">Set Price Alert for {symbol}</h4>
        <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
          &times;
        </Button>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="alert-price">Alert me when price is:</Label>
          <RadioGroup 
            value={direction} 
            onValueChange={(val) => setDirection(val as 'above' | 'below')}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="above" id="above" />
              <Label htmlFor="above">Above</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="below" id="below" />
              <Label htmlFor="below">Below</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="target-price">Target Price ($)</Label>
          <Input
            id="target-price"
            type="number"
            step="0.01"
            value={targetPrice}
            onChange={(e) => setTargetPrice(e.target.value)}
          />
          <div className="text-xs text-muted-foreground">
            Current price: ${currentPrice.toFixed(2)}
          </div>
        </div>
        
        <Button onClick={handleCreateAlert} className="w-full">
          <BellRing className="h-4 w-4 mr-2" />
          Create Alert
        </Button>
      </div>
    </div>
  );
};

export default StockPriceAlertForm;
