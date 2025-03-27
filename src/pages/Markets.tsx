
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const marketData = [
  { date: 'Jan', SPX: 4200, DOW: 33000, NASDAQ: 14200 },
  { date: 'Feb', SPX: 4250, DOW: 33200, NASDAQ: 14300 },
  { date: 'Mar', SPX: 4180, DOW: 32900, NASDAQ: 14100 },
  { date: 'Apr', SPX: 4300, DOW: 33500, NASDAQ: 14500 },
  { date: 'May', SPX: 4350, DOW: 34000, NASDAQ: 14700 },
  { date: 'Jun', SPX: 4400, DOW: 34200, NASDAQ: 14900 },
  { date: 'Jul', SPX: 4450, DOW: 34500, NASDAQ: 15000 },
];

const Markets = () => {
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
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Market Overview</h1>
            <p className="text-lg text-gray-600">Track major indices, currencies, and commodities.</p>
          </div>

          <Tabs defaultValue="indices" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="indices">Major Indices</TabsTrigger>
              <TabsTrigger value="forex">Forex</TabsTrigger>
              <TabsTrigger value="commodities">Commodities</TabsTrigger>
            </TabsList>
            
            <TabsContent value="indices">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">S&P 500</CardTitle>
                    <CardDescription>US Large Cap</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">4,450.38 <span className="text-sm">+0.42%</span></div>
                    <div className="h-[120px] mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={marketData}>
                          <defs>
                            <linearGradient id="colorSPX" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="SPX" stroke="#22c55e" fillOpacity={1} fill="url(#colorSPX)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Dow Jones</CardTitle>
                    <CardDescription>US Large Cap</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">34,500.73 <span className="text-sm">+0.36%</span></div>
                    <div className="h-[120px] mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={marketData}>
                          <defs>
                            <linearGradient id="colorDOW" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="DOW" stroke="#22c55e" fillOpacity={1} fill="url(#colorDOW)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">NASDAQ</CardTitle>
                    <CardDescription>US Tech</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">15,002.48 <span className="text-sm">+0.52%</span></div>
                    <div className="h-[120px] mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={marketData}>
                          <defs>
                            <linearGradient id="colorNASDAQ" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="NASDAQ" stroke="#22c55e" fillOpacity={1} fill="url(#colorNASDAQ)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Market Performance</CardTitle>
                  <CardDescription>6-month history of major indices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={marketData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="SPX" stroke="#0ea5e9" activeDot={{ r: 8 }} name="S&P 500" />
                        <Line type="monotone" dataKey="DOW" stroke="#8b5cf6" name="Dow Jones" />
                        <Line type="monotone" dataKey="NASDAQ" stroke="#f43f5e" name="NASDAQ" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="forex">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">EUR/USD</CardTitle>
                    <CardDescription>Euro / US Dollar</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-500">1.0845 <span className="text-sm">-0.12%</span></div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">GBP/USD</CardTitle>
                    <CardDescription>British Pound / US Dollar</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">1.2632 <span className="text-sm">+0.08%</span></div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">USD/JPY</CardTitle>
                    <CardDescription>US Dollar / Japanese Yen</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">143.75 <span className="text-sm">+0.24%</span></div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="commodities">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Gold</CardTitle>
                    <CardDescription>Per ounce</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-amber-500">$1,943.60 <span className="text-sm">+0.34%</span></div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Crude Oil</CardTitle>
                    <CardDescription>WTI per barrel</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-500">$72.85 <span className="text-sm">-0.52%</span></div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">Silver</CardTitle>
                    <CardDescription>Per ounce</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-500">$23.78 <span className="text-sm">+0.15%</span></div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Market News & Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Global Markets Face Uncertainty as Fed Signals Potential Rate Hikes</CardTitle>
                  <CardDescription>Published 2 hours ago</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Global markets showed mixed reactions as Federal Reserve officials signaled 
                    the possibility of further interest rate hikes in response to persistent inflation.
                    Analysts remain divided on the economic outlook for the coming quarter.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Tech Stocks Rally Despite Broader Market Caution</CardTitle>
                  <CardDescription>Published 5 hours ago</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Technology stocks continued their upward trend on Thursday, 
                    outperforming the broader market amid cautious trading. AI-related 
                    companies led the gains, with investors showing strong confidence in the sector.
                  </p>
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

export default Markets;
