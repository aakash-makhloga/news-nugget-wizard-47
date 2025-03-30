
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, X } from "lucide-react";
import { Button } from './ui/button';

interface ApiErrorAlertProps {
  title?: string;
  description?: string;
  showDocLink?: boolean;
  onRetry?: () => void;
  autoCloseAfter?: number; // Time in milliseconds to auto-close
}

const ApiErrorAlert = ({
  title = "Using sample news data",
  description = "This application is currently using demo data instead of real-time news.",
  showDocLink = false,
  onRetry,
  autoCloseAfter = 5000 // Default to 5 seconds
}: ApiErrorAlertProps) => {
  const [visible, setVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState<number | null>(autoCloseAfter ? Math.ceil(autoCloseAfter / 1000) : null);

  useEffect(() => {
    if (!autoCloseAfter) return;

    // Setup auto-close timer
    const closeTimer = setTimeout(() => {
      setVisible(false);
    }, autoCloseAfter);

    // Setup countdown timer for seconds
    const countdownInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(countdownInterval);
          return null;
        }
        return prev - 1;
      });
    }, 1000); // Update every second

    return () => {
      clearTimeout(closeTimer);
      clearInterval(countdownInterval);
    };
  }, [autoCloseAfter]);

  if (!visible) return null;

  return (
    <Alert variant="warning" className="bg-amber-50 border-amber-200 mb-6 relative">
      <AlertTriangle className="h-4 w-4 text-amber-600" />
      <AlertTitle className="text-amber-800 pr-8">{title}</AlertTitle>
      <AlertDescription className="text-amber-700">
        {description}
        {showDocLink && (
          <span>
            {' '}Learn more at <a href="https://newsapi.org/pricing" target="_blank" rel="noopener noreferrer" className="underline font-medium">newsapi.org/pricing</a>
          </span>
        )}
        {timeLeft !== null && (
          <span className="ml-2 text-xs">
            (This message will close in {timeLeft} second{timeLeft !== 1 ? 's' : ''})
          </span>
        )}
        <div className="mt-2 flex items-center gap-2">
          {onRetry && (
            <Button variant="outline" size="sm" onClick={onRetry} className="bg-white hover:bg-amber-50">
              Refresh Data
            </Button>
          )}
        </div>
      </AlertDescription>
      
      {/* Close button */}
      <button 
        onClick={() => setVisible(false)}
        className="absolute right-2 top-2 p-1 rounded-full hover:bg-amber-100 transition-colors"
        aria-label="Close alert"
      >
        <X className="h-4 w-4 text-amber-600" />
      </button>
    </Alert>
  );
};

export default ApiErrorAlert;
