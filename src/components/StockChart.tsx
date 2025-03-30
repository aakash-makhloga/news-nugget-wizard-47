
import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  LineChart,
  Line,
  BarChart,
  Bar
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart as AreaChartIcon, LineChart as LineChartIcon, BarChart as BarChartIcon } from 'lucide-react';

interface ChartData {
  date: string;
  price: number;
  volume?: number;
}

interface StockChartProps {
  data: ChartData[];
  symbol: string;
  className?: string;
}

const timeRanges = [
  { label: '1D', value: '1d' },
  { label: '1W', value: '1w' },
  { label: '1M', value: '1m' },
  { label: '3M', value: '3m' },
  { label: '1Y', value: '1y' },
  { label: '5Y', value: '5y' },
];

const StockChart: React.FC<StockChartProps> = ({ data, symbol, className }) => {
  const [timeRange, setTimeRange] = useState('1m');
  const [chartType, setChartType] = useState('area');
  
  // Format data for displaying based on selected time range
  const formatData = () => {
    // In a real implementation, we would filter the data based on timeRange
    // For this demo, we'll just return the data as is
    return data;
  };
  
  const chartData = formatData();
  
  // Calculate price increase or decrease
  const priceChange = chartData.length >= 2 
    ? chartData[chartData.length - 1].price - chartData[0].price 
    : 0;
  
  const priceChangePercent = chartData.length >= 2 && chartData[0].price !== 0
    ? (priceChange / chartData[0].price) * 100
    : 0;
  
  // Determine chart color based on price movement
  const chartColor = priceChange >= 0 ? '#10b981' : '#ef4444';
  
  return (
    <div className={`rounded-lg border p-4 ${className}`}>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-wrap justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{symbol} Chart</h3>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-medium ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)
              </span>
              <span className="text-sm text-muted-foreground">
                {timeRange.toUpperCase()}
              </span>
            </div>
          </div>
          
          <Tabs defaultValue="area" value={chartType} onValueChange={setChartType}>
            <TabsList>
              <TabsTrigger value="area">
                <AreaChartIcon className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="line">
                <LineChartIcon className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="bar">
                <BarChartIcon className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColor} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="date" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke={chartColor} 
                  fillOpacity={1} 
                  fill="url(#colorPrice)" 
                />
              </AreaChart>
            ) : chartType === 'line' ? (
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="date" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke={chartColor} 
                  dot={false}
                />
              </LineChart>
            ) : (
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="date" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip />
                <Bar dataKey="price" fill={chartColor} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-between gap-1 flex-wrap">
          {timeRanges.map((range) => (
            <Button
              key={range.value}
              variant={timeRange === range.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range.value)}
              className="flex-1"
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockChart;
