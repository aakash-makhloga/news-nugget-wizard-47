
import { NewsItem } from '@/components/NewsCard';

// This would be replaced with real API calls in production
export const fetchLatestNews = async (): Promise<NewsItem[]> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      id: '1',
      title: 'Tesla Announces Revolutionary Battery Technology',
      summary: 'Tesla has unveiled a new battery technology that could significantly extend the range of electric vehicles and reduce costs.',
      source: 'Tech Finance',
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=2070',
      category: 'Technology',
      sentiment: 'positive',
      url: '/news/1'
    },
    {
      id: '2',
      title: 'Federal Reserve Signals Interest Rate Cut',
      summary: 'The Federal Reserve has hinted at a potential interest rate cut in the coming months, citing economic concerns.',
      source: 'Market Watch',
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070',
      category: 'Economy',
      sentiment: 'positive',
      url: '/news/2'
    },
    {
      id: '3',
      title: 'Amazon Reports Record Quarterly Earnings',
      summary: 'Amazon has reported its highest quarterly earnings ever, beating analyst expectations by a significant margin.',
      source: 'Business Insider',
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?q=80&w=2070',
      category: 'Business',
      sentiment: 'positive',
      url: '/news/3'
    },
    {
      id: '4',
      title: 'Cryptocurrency Market Faces Major Correction',
      summary: 'The cryptocurrency market experienced a significant downturn as major coins lost over 10% of their value in 24 hours.',
      source: 'Crypto News',
      publishedAt: new Date(Date.now() - 14400000).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=2069',
      category: 'Cryptocurrency',
      sentiment: 'negative',
      url: '/news/4'
    },
    {
      id: '5',
      title: 'Apple and Microsoft Partner on AI Initiative',
      summary: 'Tech giants Apple and Microsoft have announced a strategic partnership focused on advancing artificial intelligence technology.',
      source: 'Tech Today',
      publishedAt: new Date(Date.now() - 18000000).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=2021',
      category: 'Technology',
      sentiment: 'positive',
      url: '/news/5'
    },
    {
      id: '6',
      title: 'Oil Prices Drop Amid Supply Chain Concerns',
      summary: 'Global oil prices have fallen sharply as supply chain disruptions and geopolitical tensions continue to impact the market.',
      source: 'Energy Report',
      publishedAt: new Date(Date.now() - 21600000).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1545244402-024d4aaecde6?q=80&w=2070',
      category: 'Commodities',
      sentiment: 'negative',
      url: '/news/6'
    },
  ];
};

export const fetchNewsById = async (id: string): Promise<NewsItem | null> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const allNews = await fetchLatestNews();
  return allNews.find(news => news.id === id) || null;
};

export const fetchNewsByCategory = async (category: string): Promise<NewsItem[]> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const allNews = await fetchLatestNews();
  return allNews.filter(news => news.category.toLowerCase() === category.toLowerCase());
};
