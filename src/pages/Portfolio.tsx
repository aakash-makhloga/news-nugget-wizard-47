import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Briefcase, TrendingUp, TrendingDown, RefreshCw, Plus, Trash2, 
  Info, DollarSign, Calendar, PieChart, Loader2, BarChart3, Newspaper
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import ApiErrorAlert from '@/components/ApiErrorAlert';
import PortfolioGuide from '@/components/PortfolioGuide';
import { getPortfolio, addStockToPortfolio, removeStockFromPortfolio, getPortfolioValuation, getRelevantNewsForPortfolio } from '@/utils/portfolioService';
import { fetchLatestNews } from '@/utils/newsService';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Form schema for adding stocks
const addStockSchema = z.object({
  symbol: z.string().min(1, "Symbol is required").max(10, "Symbol cannot exceed 10 characters"),
  shares: z.coerce.number().positive("Shares must be positive"),
  purchasePrice: z.coerce.number().positive("Purchase price must be positive"),
  purchaseDate: z.string().min(1, "Purchase date is required"),
});

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(getPortfolio());
  const [valuation, setValuation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [relevantNews, setRelevantNews] = useState<any[]>([]);
  
  const form = useForm<z.infer<typeof addStockSchema>>({
    resolver: zodResolver(addStockSchema),
    defaultValues: {
      symbol: "",
      shares: 1,
      purchasePrice: 0,
      purchaseDate: new Date().toISOString().split('T')[0],
    },
  });

  const loadPortfolioData = async () => {
    try {
      setLoading(true);
      
      // Get portfolio valuation
      const value = await getPortfolioValuation();
      setValuation(value);
      
      // Get latest news
      const news = await fetchLatestNews();
      
      // Filter for relevant news
      const relevant = getRelevantNewsForPortfolio(news, portfolio);
      setRelevantNews(relevant);
      
    } catch (error) {
      console.error('Error loading portfolio data:', error);
      toast({
        title: "Error loading portfolio",
        description: "There was a problem fetching your portfolio data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPortfolioData();
  }, [portfolio]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadPortfolioData();
    setRefreshing(false);
    toast({
      title: "Portfolio refreshed",
      description: "Your portfolio data has been updated.",
    });
  };

  const handleAddStock = (data: z.infer<typeof addStockSchema>) => {
    addStockToPortfolio({
      symbol: data.symbol.toUpperCase(),
      shares: data.shares,
      purchasePrice: data.purchasePrice,
      purchaseDate: data.purchaseDate,
    });
    
    setPortfolio(getPortfolio());
    setAddDialogOpen(false);
    form.reset();
    
    toast({
      title: "Stock added",
      description: `${data.shares} shares of ${data.symbol.toUpperCase()} added to your portfolio.`,
    });
  };

  const handleRemoveStock = (symbol: string) => {
    removeStockFromPortfolio(symbol);
    setPortfolio(getPortfolio());
    
    toast({
      title: "Stock removed",
      description: `${symbol} has been removed from your portfolio.`,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        <div className="container px-4 md:px-6 mx-auto mt-8">
          <ApiErrorAlert 
            title="Using demo portfolio data"
            description="This portfolio uses sample data for demonstration purposes."
            onRetry={handleRefresh}
            autoCloseAfter={300000} // 5 minutes
          />
        </div>
        
        <section className="py-8">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-display font-medium mb-2 flex items-center">
                  <Briefcase className="mr-3 h-6 w-6 text-blue-600" />
                  मेरा पोर्टफोलियो
                </h1>
                <p className="text-gray-600">
                  अपने निवेशों को ट्रैक करें और संबंधित समाचार देखें
                </p>
              </div>
              
              <div className="flex gap-3 mt-4 sm:mt-0">
                <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      स्टॉक जोड़ें
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>पोर्टफोलियो में स्टॉक जोड़ें</DialogTitle>
                      <DialogDescription>
                        उस स्टॉक का विवरण दर्ज करें जिसे आप अपने पोर्टफोलियो में जोड़ना चाहते हैं।
                      </DialogDescription>
                    </DialogHeader>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleAddStock)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="symbol"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>स्टॉक सिंबल</FormLabel>
                              <FormControl>
                                <Input placeholder="AAPL" {...field} />
                              </FormControl>
                              <FormDescription>
                                टिकर सिंबल दर्ज करें (उदाहरण, Apple के लिए AAPL)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="shares"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>शेयरों की संख्या</FormLabel>
                              <FormControl>
                                <Input type="number" min="0.01" step="0.01" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="purchasePrice"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>खरीद मूल्य (प्रति शेयर)</FormLabel>
                              <FormControl>
                                <Input type="number" min="0.01" step="0.01" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="purchaseDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>खरीद तिथि</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <DialogFooter>
                          <Button type="submit">पोर्टफोलियो में जोड़ें</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
                  {refreshing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      अपडेट हो रहा है...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      रिफ्रेश करें
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <PortfolioGuide />
            
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500 mr-3" />
                <span className="text-lg text-gray-600">पोर्टफोलियो डेटा लोड हो रहा है...</span>
              </div>
            ) : (
              <>
                {/* Portfolio Summary */}
                {valuation && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="mb-8">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-xl flex justify-between items-center">
                          <span>Portfolio Summary</span>
                          <Badge
                            className={valuation.totalGainLoss >= 0 ? "bg-finance-positive" : "bg-finance-negative"}
                          >
                            {valuation.totalGainLoss >= 0 ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {formatPercentage(valuation.totalGainLossPercent)}
                          </Badge>
                        </CardTitle>
                        <CardDescription>
                          Last updated: {new Date(portfolio.lastUpdated).toLocaleString()}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="p-4 rounded-lg bg-gray-50">
                            <div className="text-gray-500 text-sm mb-1 flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" />
                              Total Value
                            </div>
                            <div className="text-2xl font-semibold">
                              {formatCurrency(valuation.totalValue)}
                            </div>
                          </div>
                          <div className="p-4 rounded-lg bg-gray-50">
                            <div className="text-gray-500 text-sm mb-1 flex items-center">
                              <BarChart3 className="h-4 w-4 mr-1" />
                              Total Gain/Loss
                            </div>
                            <div className={`text-2xl font-semibold ${valuation.totalGainLoss >= 0 ? 'text-finance-positive' : 'text-finance-negative'}`}>
                              {formatCurrency(valuation.totalGainLoss)}
                            </div>
                          </div>
                          <div className="p-4 rounded-lg bg-gray-50">
                            <div className="text-gray-500 text-sm mb-1 flex items-center">
                              <PieChart className="h-4 w-4 mr-1" />
                              Number of Stocks
                            </div>
                            <div className="text-2xl font-semibold">
                              {valuation.stocks.length}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Tabs for stocks and news */}
                <Tabs defaultValue="stocks" className="w-full">
                  <TabsList className="mb-6">
                    <TabsTrigger value="stocks" className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-2" />
                      मेरे स्टॉक्स
                    </TabsTrigger>
                    <TabsTrigger value="news" className="flex items-center">
                      <Newspaper className="h-4 w-4 mr-2" />
                      संबंधित समाचार
                      {relevantNews.length > 0 && (
                        <Badge className="ml-2 bg-blue-100 text-blue-800">{relevantNews.length}</Badge>
                      )}
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="stocks">
                    {valuation && valuation.stocks.length > 0 ? (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {valuation.stocks.map((stock: any) => (
                          <motion.div
                            key={stock.symbol}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            <Card>
                              <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <CardTitle className="text-xl flex items-center">
                                      {stock.symbol}
                                      {stock.stockData && (
                                        <span className="text-sm font-normal text-gray-500 ml-2">
                                          {stock.stockData.name}
                                        </span>
                                      )}
                                    </CardTitle>
                                    <CardDescription>
                                      {stock.shares} shares at {formatCurrency(stock.purchasePrice)}
                                    </CardDescription>
                                  </div>
                                  <Badge
                                    className={stock.gainLoss >= 0 ? "bg-finance-positive" : "bg-finance-negative"}
                                  >
                                    {stock.gainLoss >= 0 ? (
                                      <TrendingUp className="h-3 w-3 mr-1" />
                                    ) : (
                                      <TrendingDown className="h-3 w-3 mr-1" />
                                    )}
                                    {formatPercentage(stock.gainLossPercent)}
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div>
                                    <div className="text-sm text-gray-500">Current Price</div>
                                    <div className="font-medium">{formatCurrency(stock.currentPrice)}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-gray-500">Market Value</div>
                                    <div className="font-medium">{formatCurrency(stock.value)}</div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-gray-500">Gain/Loss</div>
                                    <div className={`font-medium ${stock.gainLoss >= 0 ? 'text-finance-positive' : 'text-finance-negative'}`}>
                                      {formatCurrency(stock.gainLoss)}
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-sm text-gray-500">Purchase Date</div>
                                    <div className="font-medium">
                                      {new Date(stock.purchaseDate).toLocaleDateString()}
                                    </div>
                                  </div>
                                </div>
                                
                                {stock.stockData && (
                                  <div className="bg-gray-50 p-3 rounded-md text-sm">
                                    <div className="flex items-center gap-4 mb-2">
                                      <div>
                                        <span className="text-gray-500">Sector:</span>{" "}
                                        {stock.stockData.sector}
                                      </div>
                                      {stock.stockData.country && (
                                        <div>
                                          <span className="text-gray-500">Country:</span>{" "}
                                          {stock.stockData.country}
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <div>
                                        <span className="text-gray-500">P/E Ratio:</span>{" "}
                                        {stock.stockData.peRatio.toFixed(2)}
                                      </div>
                                      <div>
                                        <span className="text-gray-500">Dividend:</span>{" "}
                                        {stock.stockData.dividend.toFixed(2)}
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                              <CardFooter className="flex justify-between pt-2">
                                <Button asChild variant="link" className="text-blue-600">
                                  <Link to={`/stocks/${stock.symbol}`}>
                                    View Details
                                  </Link>
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => handleRemoveStock(stock.symbol)}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Remove
                                </Button>
                              </CardFooter>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                        <Briefcase className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-xl font-medium mb-2">Your portfolio is empty</h3>
                        <p className="text-gray-600 mb-6">Add stocks to start tracking your investments</p>
                        <Button onClick={() => setAddDialogOpen(true)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Your First Stock
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="news">
                    {relevantNews.length > 0 ? (
                      <div className="space-y-6">
                        <h3 className="text-xl font-medium mb-4 flex items-center">
                          <Info className="h-5 w-5 mr-2 text-blue-600" />
                          News that may impact your portfolio
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {relevantNews.map((news, index) => (
                            <NewsCard key={news.id} news={news} index={index} />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                        <Newspaper className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-xl font-medium mb-2">No relevant news found</h3>
                        <p className="text-gray-600 mb-6">We couldn't find any recent news related to your portfolio stocks</p>
                        <Button variant="outline" onClick={handleRefresh}>
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Refresh News
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Portfolio;
