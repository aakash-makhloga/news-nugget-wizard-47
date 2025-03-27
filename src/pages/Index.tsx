import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Loader2, ChevronRight, ArrowRight, TrendingUp, Newspaper, BarChart2, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
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

const Index = () => {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [featuredAnalysis, setFeaturedAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [activeTab, setActiveTab] = useState('all');

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      
      let news;
      if (selectedCountry) {
        news = await fetchNewsByCountry(selectedCountry);
      } else {
        news = await fetchLatestNews();
      }
      
      setLatestNews(news);
      
      // Generate featured analysis for the first news item
      if (news.length > 0) {
        const analysis = await generateNewsAnalysis(news[0].id);
        setFeaturedAnalysis({
          news: news[0],
          analysis
        });
      }
      
      toast({
        title: "Latest news loaded",
        description: "The news feed has been updated with the latest stories.",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error loading news",
        description: "There was a problem fetching the latest news. Please try again.",
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
        {/* Hero section */}
        <section className="relative bg-gradient-to-b from-blue-50 to-white">
          <div className="container px-4 md:px-6 mx-auto pt-16 pb-16 md:pt-20 md:pb-24">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-tight mb-6 text-balance">
                  Financial News That Anyone Can Understand
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 md:mb-10 max-w-2xl mx-auto text-balance">
                  Complex business news explained simply. Stay informed with AI-powered insights on what really matters for your financial decisions.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button size="lg" className="font-medium px-8" asChild>
                    <Link to="/get-started">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="lg" variant="outline" className="font-medium px-8">
                        <Globe className="mr-2 h-4 w-4" />
                        Browse by Country
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      {countries.map((country) => (
                        <DropdownMenuItem 
                          key={country.id} 
                          onClick={() => handleCountryFilter(country.id === 'global' ? '' : country.id)}
                        >
                          {country.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-[100px]">
              <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
            </svg>
          </div>
        </section>
        
        {/* Stock ticker */}
        <StockTicker />

        {/* Featured news with AI analysis */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <span className="ml-3 text-lg">Loading latest insights...</span>
              </div>
            ) : featuredAnalysis ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-6">
                  <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Featured Story {featuredAnalysis.news.country && `from ${featuredAnalysis.news.country}`}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-medium leading-tight">
                    {featuredAnalysis.news.title}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {featuredAnalysis.news.summary}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span>{featuredAnalysis.news.source}</span>
                    <span>•</span>
                    <span>{new Date(featuredAnalysis.news.publishedAt).toLocaleDateString()}</span>
                    {featuredAnalysis.news.country && (
                      <>
                        <span>•</span>
                        <span>{featuredAnalysis.news.country}</span>
                      </>
                    )}
                  </div>
                  <Button className="font-medium" asChild>
                    <a href={`/news/${featuredAnalysis.news.id}`}>
                      Read Full Story
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </div>
                
                <AIAnalysis 
                  title={featuredAnalysis.analysis.title}
                  content={featuredAnalysis.analysis.content}
                  impact={featuredAnalysis.analysis.impact}
                  confidence={featuredAnalysis.analysis.confidence}
                  categories={featuredAnalysis.analysis.categories}
                />
              </div>
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
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 mb-4">
                <BarChart2 className="h-4 w-4 mr-2" />
                Why Choose Us
              </div>
              <h2 className="text-3xl font-display font-medium mb-4">Finance News Made Simple</h2>
              <p className="text-lg text-gray-600">
                We break down complex financial news into easy-to-understand insights for everyone, 
                from beginners to experts.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="p-6 rounded-xl bg-blue-50 border border-blue-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Simple Explanations</h3>
                <p className="text-gray-600">
                  We explain financial news in plain language that everyone can understand, 
                  without confusing jargon.
                </p>
              </motion.div>
              
              <motion.div 
                className="p-6 rounded-xl bg-green-50 border border-green-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12h20"></path>
                    <path d="M12 2v20"></path>
                    <path d="M12 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                    <path d="M12 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                    <path d="M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                    <path d="M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">AI-Powered Insights</h3>
                <p className="text-gray-600">
                  Our AI technology analyzes news and provides clear explanations of potential impacts 
                  on markets and businesses.
                </p>
              </motion.div>
              
              <motion.div 
                className="p-6 rounded-xl bg-amber-50 border border-amber-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="M12 8v4"></path>
                    <path d="M12 16h.01"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Real-Time Updates</h3>
                <p className="text-gray-600">
                  Stay informed with the latest financial news and market movements as they happen, 
                  delivered instantly.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-display font-medium mb-6">
                Start Understanding Finance Today
              </h2>
              <p className="text-lg text-blue-100 mb-8">
                Join thousands of readers who get simple, clear financial news delivered to their inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 rounded-lg text-gray-900 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Subscribe Now
                </Button>
              </div>
              <p className="text-sm text-blue-200 mt-4">
                We'll never share your email. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
