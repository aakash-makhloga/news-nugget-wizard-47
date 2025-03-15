
import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AIAnalysisProps {
  newsId?: string;
  title: string;
  content: string;
  impact: 'positive' | 'negative' | 'neutral';
  confidence: number;
  categories: string[];
}

const AIAnalysis = ({ title, content, impact, confidence, categories }: AIAnalysisProps) => {
  const renderImpactIcon = () => {
    switch (impact) {
      case 'positive':
        return <TrendingUp className="h-5 w-5 text-finance-positive" />;
      case 'negative':
        return <TrendingDown className="h-5 w-5 text-finance-negative" />;
      default:
        return <BarChart3 className="h-5 w-5 text-finance-neutral" />;
    }
  };

  const renderImpactColor = () => {
    switch (impact) {
      case 'positive':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'negative':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200';
    }
  };

  const renderConfidenceBar = () => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
        <div 
          className={`h-1.5 rounded-full ${
            confidence > 80 ? 'bg-green-500' : 
            confidence > 50 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ width: `${confidence}%` }}
        />
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden backdrop-blur-sm border border-blue-100 bg-blue-50/30">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 rounded-md">
              <Lightbulb className="h-4 w-4 text-blue-600" />
            </div>
            <CardTitle className="text-lg font-medium">AI Analysis</CardTitle>
          </div>
          <CardDescription>
            Simplified explanation of this news and its potential impact
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700">What this means:</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {content}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-700">Potential Impact:</h4>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${renderImpactColor()}`}>
                {renderImpactIcon()}
                <span className="ml-1.5 capitalize">{impact} Impact</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-700">Confidence: {confidence}%</h4>
              {renderConfidenceBar()}
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-gray-700">Related to:</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <span 
                  key={index}
                  className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2 flex justify-end">
          <Button variant="link" size="sm" className="text-blue-600 font-medium">
            Learn more about these terms
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AIAnalysis;
