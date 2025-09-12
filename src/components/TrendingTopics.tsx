import React from 'react';
import { TrendingUp, Hash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Topic {
  name: string;
  count: number;
  trend: 'up' | 'down' | 'stable';
}

const TrendingTopics = () => {
  const topics: Topic[] = [
    { name: 'AI Technology', count: 24, trend: 'up' },
    { name: 'Stock Market', count: 18, trend: 'up' },
    { name: 'Cryptocurrency', count: 15, trend: 'down' },
    { name: 'Federal Reserve', count: 12, trend: 'stable' },
    { name: 'Electric Vehicles', count: 9, trend: 'up' },
    { name: 'Banking Sector', count: 7, trend: 'stable' },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-green-500" />;
      case 'down':
        return <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />;
      default:
        return <Hash className="h-3 w-3 text-muted-foreground" />;
    }
  };

  return (
    <Card className="trending-topics-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="h-5 w-5 text-primary" />
          Trending Topics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {topics.map((topic, index) => (
          <div
            key={topic.name}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              {getTrendIcon(topic.trend)}
              <span className="font-medium text-sm group-hover:text-primary transition-colors">
                {topic.name}
              </span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {topic.count}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TrendingTopics;