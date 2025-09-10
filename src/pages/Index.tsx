
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Loader2, ChevronRight, ArrowRight, TrendingUp, Newspaper, BarChart2, Globe, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Header from '@/components/Header';
import StockTicker from '@/components/StockTicker';
import NewsGrid from '@/components/NewsGrid';
import AIAnalysis from '@/components/AIAnalysis';
import Footer from '@/components/Footer';
import { fetchLatestNews, fetchNewsByCountry } from '@/utils/newsService';
import { NewsItem } from '@/components/NewsCard';
import { fetchPopularStocks } from '@/utils/stocksService';
import { generateNewsAnalysis } from '@/utils/aiService';
import { toast } from '@/components/ui/use-toast';
import ApiErrorAlert from '@/components/ApiErrorAlert';
import SourceBadge from '@/components/SourceBadge';

const Index = () => {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [featuredAnalysis, setFeaturedAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [activeTab, setActiveTab] = useState('all');
  const [usingMockData, setUsingMockData] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setApiError(null);
      
      let news;
      if (selectedCountry) {
        news = await fetchNewsByCountry(selectedCountry);
      } else {
        news = await fetchLatestNews();
      }
      
      setLatestNews(news);
      
      setUsingMockData(true);
      
      if (news.length > 0) {
        const analysis = await generateNewsAnalysis(news[0].id);
        setFeaturedAnalysis({
          news: news[0],
          analysis
        });
      }
      
      toast({
        title: "News data loaded",
        description: "The news feed has been updated with sample stories.",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error loading data:', error);
      
      setApiError("Could not load news data. Using sample data instead.");
      toast({
        title: "Error loading news",
        description: "There was a problem fetching the latest news. Using sample data instead.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  }, [selectedCountry]);
  
  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCountryFilter = (country: string) => {
    setSelectedCountry(country);
  };

  const handleRefresh = () => {
    loadData();
  };

  const countries = [
    { id: 'global', name: 'Global News' },
    { id: 'USA', name: 'United States' },
    { id: 'China', name: 'China' },
    { id: 'Japan', name: 'Japan' },
    { id: 'India', name: 'India' },
    { id: 'United Kingdom', name: 'United Kingdom' },
    { id: 'European Union', name: 'European Union' },
    { id: 'Brazil', name: 'Brazil' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Demo Data Alert */}
        <div className="container px-4 md:px-6 mx-auto mt-8">
          <ApiErrorAlert 
            title="Using demo news data"
            description="This application is showing sample financial news for demonstration purposes."
            onRetry={handleRefresh}
            autoCloseAfter={300000} // 5 minutes in milliseconds
          />
        </div>
        
        {/* Hero section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary-glow/5 to-background"></div>
          <div className="container px-4 md:px-6 mx-auto pt-20 pb-20 md:pt-24 md:pb-28 relative">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium glass border mb-6">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2 animate-pulse-glow"></div>
                  Live News Updates
                </div>
                <h1 className="text-responsive-xl font-bold tracking-tight mb-6 text-gradient">
                  Financial News That Anyone Can Understand
                </h1>
                <p className="text-responsive-lg text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
                  Complex business news explained simply with AI-powered insights. Stay informed about what really matters for your financial decisions.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                  <Button size="lg" className="btn-glow font-medium px-8 h-12" asChild>
                    <Link to="/get-started">
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="lg" variant="outline" className="font-medium px-8 h-12 glass">
                        <Globe className="mr-2 h-5 w-5" />
                        Browse by Region
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-56 glass">
                      {countries.map((country) => (
                        <DropdownMenuItem 
                          key={country.id} 
                          onClick={() => handleCountryFilter(country.id === 'global' ? '' : country.id)}
                          className="focus:bg-primary/10"
                        >
                          {country.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-1">50K+</div>
                    <div className="text-sm text-muted-foreground">Daily Readers</div>
                  </motion.div>
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-1">100+</div>
                    <div className="text-sm text-muted-foreground">News Sources</div>
                  </motion.div>
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <div className="text-2xl md:text-3xl font-bold text-primary mb-1">24/7</div>
                    <div className="text-sm text-muted-foreground">Live Updates</div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-[60px] md:h-[100px]">
              <path fill="hsl(var(--background))" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
            </svg>
          </div>
        </section>
        
        {/* Stock ticker */}
        <StockTicker />

        {/* Featured news with AI analysis */}
        <section className="py-20 bg-background relative">
          <div className="container px-4 md:px-6 mx-auto">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <div className="text-center space-y-4">
                  <div className="animate-pulse-glow w-16 h-16 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                  <h3 className="text-lg font-medium">Loading latest insights...</h3>
                  <p className="text-muted-foreground">Analyzing breaking news stories</p>
                </div>
              </div>
            ) : featuredAnalysis ? (
              <motion.div 
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-primary/10 text-primary border border-primary/20">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Featured Analysis {featuredAnalysis.news.country && `• ${featuredAnalysis.news.country}`}
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance">
                    {featuredAnalysis.news.title}
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {featuredAnalysis.news.summary}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <SourceBadge source={featuredAnalysis.news.source} showReliability />
                    </div>
                    <span>•</span>
                    <span>{new Date(featuredAnalysis.news.publishedAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex gap-3">
                    <Button className="btn-glow" asChild>
                      <Link to={`/news/${featuredAnalysis.news.id}`}>
                        Read Full Analysis
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" className="glass">
                      Share Article
                    </Button>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="card-premium p-8 h-full">
                    <AIAnalysis 
                      title={featuredAnalysis.analysis.title}
                      content={featuredAnalysis.analysis.content}
                      impact={featuredAnalysis.analysis.impact}
                      confidence={featuredAnalysis.analysis.confidence}
                      categories={featuredAnalysis.analysis.categories}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </div>
        </section>
        
        {/* Latest news */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                  <Newspaper className="h-4 w-4 mr-2" />
                  Latest Updates
                </div>
                <h2 className="text-3xl font-display font-medium">
                  {selectedCountry ? `Top Stories from ${selectedCountry}` : "Today's Top Stories"}
                </h2>
              </div>
              <Button variant="link" className="font-medium mt-4 md:mt-0">
                View All News
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-8">
                <TabsTrigger value="all" className="text-sm">All</TabsTrigger>
                <TabsTrigger value="business" className="text-sm">Business</TabsTrigger>
                <TabsTrigger value="markets" className="text-sm">Markets</TabsTrigger>
                <TabsTrigger value="technology" className="text-sm">Technology</TabsTrigger>
                <TabsTrigger value="crypto" className="text-sm">Crypto</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <NewsGrid 
                  news={latestNews} 
                  loading={loading} 
                  onRefresh={handleRefresh}
                  onFilterByCountry={handleCountryFilter}
                />
              </TabsContent>
              
              <TabsContent value="business">
                <NewsGrid 
                  news={latestNews.filter(n => n.category === 'Business')} 
                  loading={loading} 
                  onRefresh={handleRefresh}
                  onFilterByCountry={handleCountryFilter}
                />
              </TabsContent>
              
              <TabsContent value="markets">
                <NewsGrid 
                  news={latestNews.filter(n => n.category === 'Economy' || n.category === 'Commodities')} 
                  loading={loading}
                  onRefresh={handleRefresh}
                  onFilterByCountry={handleCountryFilter}
                />
              </TabsContent>
              
              <TabsContent value="technology">
                <NewsGrid 
                  news={latestNews.filter(n => n.category === 'Technology')} 
                  loading={loading}
                  onRefresh={handleRefresh}
                  onFilterByCountry={handleCountryFilter}
                />
              </TabsContent>
              
              <TabsContent value="crypto">
                <NewsGrid 
                  news={latestNews.filter(n => n.category === 'Cryptocurrency')} 
                  loading={loading}
                  onRefresh={handleRefresh}
                  onFilterByCountry={handleCountryFilter}
                />
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Features section */}
        <section className="py-24 bg-muted/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
          <div className="container px-4 md:px-6 mx-auto relative">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-6">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Why Choose Our Platform
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
                  Finance News Made Simple
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We transform complex financial jargon into clear, actionable insights that help you make informed decisions about your financial future.
                </p>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="card-premium p-8 text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Clear Explanations</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Complex financial concepts broken down into simple, understandable language that anyone can grasp.
                </p>
              </motion.div>
              
              <motion.div 
                className="card-premium p-8 text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 12l2 2 4-4"></path>
                    <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.35 0 4.49.9 6.1 2.38"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">AI-Powered Insights</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Advanced AI analyzes market trends and news to provide you with actionable insights and predictions.
                </p>
              </motion.div>
              
              <motion.div 
                className="card-premium p-8 text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="M12 8v4l3 3"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4">Real-Time Updates</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Stay ahead with instant notifications and real-time analysis of market-moving events and news.
                </p>
              </motion.div>
            </div>
            
            <motion.div 
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-6 glass rounded-full px-8 py-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">99.9%</div>
                  <div className="text-xs text-muted-foreground">Uptime</div>
                </div>
                <div className="w-px h-8 bg-border"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">&lt; 1s</div>
                  <div className="text-xs text-muted-foreground">Load Time</div>
                </div>
                <div className="w-px h-8 bg-border"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-xs text-muted-foreground">Support</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary-glow"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <div className="container px-4 md:px-6 mx-auto relative">
            <motion.div 
              className="max-w-4xl mx-auto text-center text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                Join 50,000+ Smart Investors
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Start Your Financial Journey Today
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                Get personalized news insights, real-time market updates, and AI-powered analysis delivered straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 placeholder:text-white/70 text-white text-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent min-w-[300px]"
                  />
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8 py-4 text-lg h-auto">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Free for 30 days
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Cancel anytime
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
