
import { NewsItem } from '@/components/NewsCard';

const API_BASE_URL = 'https://api.example.com/news'; // This would be replaced with a real API

// This simulates real-world API calls
export const fetchLatestNews = async (): Promise<NewsItem[]> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In production, this would be an actual API call like:
  // const response = await fetch(`${API_BASE_URL}/latest`);
  // return await response.json();
  
  return [
    {
      id: '1',
      title: 'Tesla Announces Revolutionary Battery Technology',
      summary: 'Tesla has created a new battery that makes electric cars go much further on one charge. This means electric cars might become cheaper for everyone to buy and use every day.',
      source: 'Tech Finance',
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1617704548623-340376564e68?q=80&w=2070',
      category: 'Technology',
      sentiment: 'positive',
      url: '/news/1',
      country: 'USA'
    },
    {
      id: '2',
      title: 'Federal Reserve Signals Interest Rate Cut',
      summary: 'The Federal Reserve might make it cheaper to borrow money soon. When this happens, it\'s usually easier to get loans for houses and cars. This could help more people buy things they need.',
      source: 'Market Watch',
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070',
      category: 'Economy',
      sentiment: 'positive',
      url: '/news/2',
      country: 'USA'
    },
    {
      id: '3',
      title: 'Amazon Reports Record Quarterly Earnings',
      summary: 'Amazon made more money than ever before in the last three months. This shows that many people are shopping online and using Amazon\'s services. This is good news for people who own Amazon stock.',
      source: 'Business Insider',
      publishedAt: new Date(Date.now() - 10800000).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?q=80&w=2070',
      category: 'Business',
      sentiment: 'positive',
      url: '/news/3',
      country: 'USA'
    },
    {
      id: '4',
      title: 'Bitcoin and Other Cryptocurrencies Drop in Value',
      summary: 'The value of Bitcoin and other digital currencies has fallen a lot today. This happens often with these kinds of currencies because their prices change quickly. If you bought some recently, it might be worth less now.',
      source: 'Crypto News',
      publishedAt: new Date(Date.now() - 14400000).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=2069',
      category: 'Cryptocurrency',
      sentiment: 'negative',
      url: '/news/4',
      country: 'Global'
    },
    {
      id: '5',
      title: 'Apple and Microsoft Partner on AI Initiative',
      summary: 'Two big tech companies, Apple and Microsoft, are working together on new AI technology. This is surprising because these companies usually compete against each other. Their teamwork could lead to better technology for all of us.',
      source: 'Tech Today',
      publishedAt: new Date(Date.now() - 18000000).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=2021',
      category: 'Technology',
      sentiment: 'positive',
      url: '/news/5',
      country: 'USA'
    },
    {
      id: '6',
      title: 'Oil Prices Drop Amid Supply Chain Concerns',
      summary: 'Oil prices have fallen today because of problems getting oil from where it\'s made to where it\'s needed. This might mean cheaper gas for cars, which is good for drivers.',
      source: 'Energy Report',
      publishedAt: new Date(Date.now() - 21600000).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1545244402-024d4aaecde6?q=80&w=2070',
      category: 'Commodities',
      sentiment: 'negative',
      url: '/news/6',
      country: 'Global'
    },
    {
      id: '7',
      title: 'European Union Announces New Climate Change Initiative',
      summary: 'The EU has announced a plan to fight climate change by reducing pollution. This includes helping companies switch to cleaner energy and encouraging people to use electric cars.',
      source: 'EU News',
      publishedAt: new Date(Date.now() - 25200000).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1559825481-12a05cc00344?q=80&w=2000',
      category: 'Environment',
      sentiment: 'positive',
      url: '/news/7',
      country: 'European Union'
    },
    {
      id: '8',
      title: 'Japan\'s Central Bank Maintains Negative Interest Rates',
      summary: 'Japan\'s main bank is keeping interest rates below zero. This unusual approach is meant to encourage people and businesses to spend money instead of saving it, which helps the economy grow.',
      source: 'Asia Finance',
      publishedAt: new Date(Date.now() - 28800000).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=2070',
      category: 'Economy',
      sentiment: 'neutral',
      url: '/news/8',
      country: 'Japan'
    },
    {
      id: '9',
      title: 'Indian Tech Sector Experiences Strong Growth',
      summary: 'India\'s technology companies are growing quickly as more businesses around the world hire them for tech work. This is creating many new jobs in India and helping the country\'s economy.',
      source: 'India Business',
      publishedAt: new Date(Date.now() - 32400000).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1583424287550-35e476d380b0?q=80&w=2074',
      category: 'Technology',
      sentiment: 'positive',
      url: '/news/9',
      country: 'India'
    },
    {
      id: '10',
      title: 'UK Announces New Financial Regulations',
      summary: 'The UK government has introduced new rules for banks and financial companies. These rules aim to protect people\'s money better and prevent problems like the 2008 financial crisis.',
      source: 'UK Finance',
      publishedAt: new Date(Date.now() - 36000000).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070',
      category: 'Finance',
      sentiment: 'neutral',
      url: '/news/10',
      country: 'United Kingdom'
    },
    {
      id: '11',
      title: 'Chinese Manufacturing Activity Expands',
      summary: 'Factories in China are making more products than before, showing that the economy is doing well. This is important because many products used around the world are made in China.',
      source: 'China Economic Review',
      publishedAt: new Date(Date.now() - 39600000).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1570841398833-43e352792f7e?q=80&w=2025',
      category: 'Manufacturing',
      sentiment: 'positive',
      url: '/news/11',
      country: 'China'
    },
    {
      id: '12',
      title: 'Brazil\'s Agricultural Exports Hit Record Highs',
      summary: 'Brazil is selling more food and farm products to other countries than ever before. This includes things like soybeans, coffee, and beef. This is good for Brazil\'s economy and helps feed people around the world.',
      source: 'Brazil Business',
      publishedAt: new Date(Date.now() - 43200000).toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070',
      category: 'Agriculture',
      sentiment: 'positive',
      url: '/news/12',
      country: 'Brazil'
    }
  ];
};

export const fetchNewsById = async (id: string): Promise<NewsItem | null> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In production, this would be:
  // const response = await fetch(`${API_BASE_URL}/news/${id}`);
  // return await response.json();
  
  const allNews = await fetchLatestNews();
  return allNews.find(news => news.id === id) || null;
};

export const fetchNewsByCategory = async (category: string): Promise<NewsItem[]> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In production, this would be:
  // const response = await fetch(`${API_BASE_URL}/news/category/${category}`);
  // return await response.json();
  
  const allNews = await fetchLatestNews();
  return allNews.filter(news => news.category.toLowerCase() === category.toLowerCase());
};

export const fetchNewsByCountry = async (country: string): Promise<NewsItem[]> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // In production, this would be:
  // const response = await fetch(`${API_BASE_URL}/news/country/${country}`);
  // return await response.json();
  
  const allNews = await fetchLatestNews();
  return country 
    ? allNews.filter(news => news.country === country)
    : allNews;
};
