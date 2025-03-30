
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, DollarSign, Calendar, Briefcase, ListOrdered } from 'lucide-react';

const PortfolioGuide = () => {
  return (
    <Card className="mb-8 border-2 border-dashed border-blue-300 bg-blue-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center text-blue-700">
          <Briefcase className="mr-2 h-5 w-5" />
          How to Add Stocks to Your Portfolio
        </CardTitle>
        <CardDescription className="text-blue-600">
          Follow these simple steps to build your investment portfolio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
              <ListOrdered className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <h3 className="font-medium text-blue-700">Go to the Portfolio Page</h3>
              <p className="text-blue-600 text-sm">
                Click on "Portfolio" in the navigation menu at the top
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
              <Plus className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <h3 className="font-medium text-blue-700">Click the "Add Stock" Button</h3>
              <p className="text-blue-600 text-sm">
                Look for the "Add Stock" button in the upper right corner of the portfolio page
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
              <DollarSign className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <h3 className="font-medium text-blue-700">Enter Stock Details</h3>
              <p className="text-blue-600 text-sm">
                Enter the stock symbol (e.g., AAPL, MSFT), number of shares, and purchase price
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
              <Calendar className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <h3 className="font-medium text-blue-700">Select Purchase Date</h3>
              <p className="text-blue-600 text-sm">
                Choose the date when you purchased the stock (defaults to today's date)
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
              <Briefcase className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <h3 className="font-medium text-blue-700">Click "Add to Portfolio"</h3>
              <p className="text-blue-600 text-sm">
                Submit the form by clicking the "Add to Portfolio" button to add the stock to your portfolio
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioGuide;
