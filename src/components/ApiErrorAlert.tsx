
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Button } from './ui/button';

interface ApiErrorAlertProps {
  title?: string;
  description?: string;
  showDocLink?: boolean;
  onRetry?: () => void;
}

const ApiErrorAlert = ({
  title = "Using sample news data",
  description = "The News API has CORS restrictions on browser requests in the Developer plan.",
  showDocLink = true,
  onRetry
}: ApiErrorAlertProps) => {
  return (
    <Alert variant="warning" className="bg-amber-50 border-amber-200 mb-6">
      <AlertTriangle className="h-4 w-4 text-amber-600" />
      <AlertTitle className="text-amber-800">{title}</AlertTitle>
      <AlertDescription className="text-amber-700">
        {description}
        {showDocLink && (
          <span>
            {' '}Learn more at <a href="https://newsapi.org/pricing" target="_blank" rel="noopener noreferrer" className="underline font-medium">newsapi.org/pricing</a>
          </span>
        )}
        {onRetry && (
          <div className="mt-2">
            <Button variant="outline" size="sm" onClick={onRetry} className="bg-white hover:bg-amber-50">
              Retry
            </Button>
          </div>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default ApiErrorAlert;
