
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search } from 'lucide-react';

const stockData = [
  { date: '2023-01', price: 180 },
  { date: '2023-02', price: 190 },
  { date: '2023-03', price: 175 },
  { date: '2023-04', price: 200 },
  { date: '2023-05', price: 210 },
  { date: '2023-06', price: 205 },
  { date: '2023-07', price: 220 },
];

const popularStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 189.37, change: 1.24, changePercent: 0.68 },
  { symbol: 'MSFT', name: 'Microsoft Corp', price: 329.06, change: 2.53, changePercent: 0.78 },
  { symbol: 'GOOGL', name: 'Alphabet Inc', price: 138.22, change: -0.82, changePercent: -0.59 },
  { symbol: 'AMZN', name: 'Amazon.com Inc', price: 142.83, change: 1.37, changePercent: 0.97 },
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 470.61, change: 8.71, changePercent: 1.89 },
  { symbol: 'TSLA', name: 'Tesla Inc', price: 238.59, change: -3.42, changePercent: -1.41 },
  { symbol: 'META', name: 'Meta Platforms Inc', price: 325.74, change: 3.84, changePercent: 1.19 },
  { symbol: 'V', name: 'Visa Inc', price: 243.99, change: 0.67, changePercent: 0.28 },
  { symbol: 'JPM', name: 'JPMorgan Chase & Co', price: 154.28, change: -0.45, changePercent: -0.29 },
  { symbol: 'WMT', name: 'Walmart Inc', price: 161.54, change: 1.26, changePercent: 0.79 },
];

const Stocks = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedStock, setSelectedStock] = useState<string>('AAPL');

  const filteredStocks = popularStocks.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectStock = (symbol: string) => {
    setSelectedStock(symbol);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <motion.main 
        className="flex-1 pt-20 pb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container px-4 md:px-6 mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Stock Market</h1>
            <p className="text-lg text-gray-600">Explore top companies, track performance and discover investment opportunities.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{selectedStock} Performance</CardTitle>
                  <CardDescription>
                    {popularStocks.find(stock => stock.symbol === selectedStock)?.name || 'Loading stock data...'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="text-3xl font-bold mb-1">
                      ${popularStocks.find(stock => stock.symbol === selectedStock)?.price.toFixed(2) || '0.00'}
                    </div>
                    {selectedStock && 
                      <div className={`text-sm font-medium ${
                        (popularStocks.find(stock => stock.symbol === selectedStock)?.changePercent || 0) >= 0 
                        ? 'text-green-600' 
                        : 'text-red-500'
                      }`}>
                        {(popularStocks.find(stock => stock.symbol === selectedStock)?.changePercent || 0) >= 0 ? '+' : ''}
                        {popularStocks.find(stock => stock.symbol === selectedStock)?.change.toFixed(2) || '0.00'} 
                        ({(popularStocks.find(stock => stock.symbol === selectedStock)?.changePercent || 0).toFixed(2)}%)
                      </div>
                    }
                  </div>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={stockData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <defs>
                          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="price" stroke="#0ea5e9" fillOpacity={1} fill="url(#colorPrice)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Market Cap</div>
                      <div className="font-medium">$2.97T</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">P/E Ratio</div>
                      <div className="font-medium">31.26</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Dividend Yield</div>
                      <div className="font-medium">0.52%</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">52 Week High</div>
                      <div className="font-medium">$198.23</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">52 Week Low</div>
                      <div className="font-medium">$146.82</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">EPS</div>
                      <div className="font-medium">$6.07</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Volume</div>
                      <div className="font-medium">48.76M</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Avg. Volume</div>
                      <div className="font-medium">56.32M</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:w-1/3 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Find Stocks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search by symbol or name"
                      className="pl-9"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Popular Stocks</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="max-h-[400px] overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[80px]">Symbol</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead className="text-right">Change</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredStocks.map((stock) => (
                          <TableRow 
                            key={stock.symbol} 
                            className={`cursor-pointer ${selectedStock === stock.symbol ? 'bg-gray-50' : ''}`}
                            onClick={() => handleSelectStock(stock.symbol)}
                          >
                            <TableCell className="font-medium">
                              <div>{stock.symbol}</div>
                              <div className="text-xs text-gray-500">{stock.name}</div>
                            </TableCell>
                            <TableCell>${stock.price.toFixed(2)}</TableCell>
                            <TableCell className={`text-right ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                              {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default Stocks;
