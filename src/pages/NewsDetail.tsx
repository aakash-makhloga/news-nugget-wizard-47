
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2, Bookmark, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIAnalysis from '@/components/AIAnalysis';
import NewsGrid from '@/components/NewsGrid';
import { fetchNewsById, fetchLatestNews } from '@/utils/newsService';
import { generateNewsAnalysis } from '@/utils/aiService';
import { NewsItem } from '@/components/NewsCard';

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [analysis, setAnalysis] = useState<any | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        const newsData = await fetchNewsById(id);
        setNews(newsData);
        
        if (newsData) {
          // Load AI analysis
          const analysisData = await generateNewsAnalysis(id);
          setAnalysis(analysisData);
          
          // Load related news
          const allNews = await fetchLatestNews();
          setRelatedNews(
            allNews
              .filter(item => item.id !== id)
              .filter(item => item.category === newsData.category)
              .slice(0, 3)
          );
        }
      } catch (error) {
        console.error('Error loading news data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-16 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500 mb-4" />
            <p className="text-lg text-gray-600">Loading article...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-16 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-medium mb-4">Article Not Found</h2>
            <p className="text-lg text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-16">
        {/* Breadcrumb navigation */}
        <div className="container px-4 md:px-6 mx-auto pt-8">
          <div className="flex items-center text-sm text-gray-600 mb-8">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <Link to={`/category/${news.category.toLowerCase()}`} className="hover:text-blue-600 transition-colors">
              {news.category}
            </Link>
            <ChevronRight className="h-3 w-3 mx-2" />
            <span className="text-gray-500 truncate">{news.title}</span>
          </div>
        </div>
        
        {/* Article header */}
        <motion.div 
          className="container px-4 md:px-6 mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-4xl mx-auto">
            <Badge variant="outline" className="mb-4">
              {news.category}
            </Badge>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold leading-tight mb-6 text-balance">
              {news.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-8">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {formatDate(news.publishedAt)}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                5 min read
              </div>
              <div className="ml-auto flex gap-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Save">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Share">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Feature image */}
        <div className="w-full aspect-video relative mb-12 overflow-hidden">
          <motion.img
            src={news.imageUrl || 'https://via.placeholder.com/1600x900?text=No+Image'}
            alt={news.title}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          />
        </div>
        
        {/* Article content and sidebar */}
        <div className="container px-4 md:px-6 mx-auto mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            <div className="lg:col-span-2">
              <motion.div 
                className="prose prose-lg max-w-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-xl font-medium leading-relaxed text-gray-800 mb-6">{news.summary}</p>
                
                <p className="mb-4">
                  The recent announcement by {news.source} has captured the attention of financial experts and everyday investors alike. Market analysts suggest that this development could have significant implications for the industry as a whole.
                </p>
                
                <p className="mb-4">
                  According to industry experts, this news represents a potential shift in how businesses approach their operations and strategic planning. The immediate impact was evident in market reactions, with related stocks showing notable movement following the announcement.
                </p>
                
                <h2 className="text-2xl font-medium mt-8 mb-4">What This Means for Investors</h2>
                
                <p className="mb-4">
                  For individual investors, this development presents both opportunities and challenges. Those with existing positions in affected sectors may want to reassess their portfolio strategy in light of this news.
                </p>
                
                <p className="mb-4">
                  Market strategists recommend maintaining a balanced approach while monitoring how this situation evolves over the coming weeks and months. Long-term implications remain to be seen, but short-term volatility is expected.
                </p>
                
                <h2 className="text-2xl font-medium mt-8 mb-4">Industry Response</h2>
                
                <p className="mb-4">
                  Competitors in the same space have already begun positioning themselves in response to this announcement. Some are taking defensive measures, while others see this as an opportunity to gain market share through strategic initiatives.
                </p>
                
                <p className="mb-4">
                  Regulatory bodies are also closely monitoring the situation, with potential oversight changes possible depending on how market dynamics shift in response to this development.
                </p>
                
                <h2 className="text-2xl font-medium mt-8 mb-4">Looking Ahead</h2>
                
                <p className="mb-4">
                  The next quarterly earnings reports will be particularly significant for companies in this sector, as they will provide concrete data on how this news has affected financial performance and future projections.
                </p>
                
                <p className="mb-6">
                  Investors and market watchers should stay informed as this situation continues to develop, with particular attention to official statements from key industry players and regulatory authorities.
                </p>
                
                <Separator className="my-8" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">
                      Source: {news.source}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="space-y-8">
              {analysis && (
                <AIAnalysis 
                  newsId={id}
                  title={analysis.title}
                  content={analysis.content}
                  impact={analysis.impact}
                  confidence={analysis.confidence}
                  categories={analysis.categories}
                />
              )}
              
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h3 className="text-lg font-medium mb-4">Key Takeaways</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 mr-3">
                      <span className="text-blue-600 text-xs font-bold">1</span>
                    </div>
                    <span className="text-gray-700">This development could significantly impact market dynamics in the coming months.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 mr-3">
                      <span className="text-blue-600 text-xs font-bold">2</span>
                    </div>
                    <span className="text-gray-700">Investors should monitor related sectors for potential opportunities or risks.</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 mr-3">
                      <span className="text-blue-600 text-xs font-bold">3</span>
                    </div>
                    <span className="text-gray-700">Regulatory responses could further influence how this situation unfolds.</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-lg font-medium mb-3">Learn More</h3>
                <p className="text-sm text-gray-600 mb-4">
                  New to financial news? Check out these resources to better understand the concepts mentioned in this article.
                </p>
                <ul className="space-y-2">
                  <li>
                    <Link to="/learn/investing" className="text-blue-600 hover:underline text-sm flex items-center">
                      <ChevronRight className="h-3 w-3 mr-1" />
                      Investment Basics
                    </Link>
                  </li>
                  <li>
                    <Link to="/learn/markets" className="text-blue-600 hover:underline text-sm flex items-center">
                      <ChevronRight className="h-3 w-3 mr-1" />
                      How Markets Work
                    </Link>
                  </li>
                  <li>
                    <Link to="/learn/terms" className="text-blue-600 hover:underline text-sm flex items-center">
                      <ChevronRight className="h-3 w-3 mr-1" />
                      Financial Terms Glossary
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related news */}
        {relatedNews.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-medium">Related News</h2>
                <Button variant="outline" asChild>
                  <Link to={`/category/${news.category.toLowerCase()}`}>
                    View All
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <NewsGrid news={relatedNews} />
            </div>
          </section>
        )}
        
        {/* Back to top */}
        <div className="container px-4 md:px-6 mx-auto py-8">
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Top
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewsDetail;
