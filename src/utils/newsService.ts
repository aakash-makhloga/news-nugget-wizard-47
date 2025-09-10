import { NewsItem } from '@/components/NewsCard';

// Using your provided Current API key
const NEWS_API_KEY = '3SzDnSQ2utM0HZbBsCMN-ibhmrMGLi1hgqJU4t_lJlevBzRQ';
const NEWS_API_BASE_URL = 'https://api.currentsapi.services/v1';

// Function to transform the Current API response to our NewsItem format
const transformCurrentApiResponse = (articles: any[]): NewsItem[] => {
  return articles.map((article, index) => ({
    id: `${index}-${Date.now()}`, // Generate a unique ID
    title: article.title || 'No title available',
    summary: article.description || 'No description available',
    source: article.author || 'Unknown Source',
    publishedAt: article.published || new Date().toISOString(),
    imageUrl: article.image || 'https://via.placeholder.com/800x450?text=No+Image',
    category: article.category || determineCategory(article.title, article.description),
    sentiment: determineSentiment(article.title, article.description),
    url: article.url || '#',
    country: article.language === 'en' ? 'USA' : 'Global'
  }));
};

// Helper function to determine category based on title and description
const determineCategory = (title: string = '', description: string = ''): string => {
  const content = (title + ' ' + description).toLowerCase();
  
  if (content.includes('bitcoin') || content.includes('crypto') || content.includes('blockchain')) {
    return 'Cryptocurrency';
  } else if (content.includes('stock') || content.includes('market') || content.includes('investment')) {
    return 'Business';
  } else if (content.includes('tech') || content.includes('ai') || content.includes('software')) {
    return 'Technology';
  } else if (content.includes('oil') || content.includes('gas') || content.includes('energy')) {
    return 'Commodities';
  } else if (content.includes('bank') || content.includes('interest rate') || content.includes('financial')) {
    return 'Economy';
  } else if (content.includes('climate') || content.includes('environment') || content.includes('sustainable')) {
    return 'Environment';
  } else {
    return 'General';
  }
};

// Helper function to determine sentiment based on title and description
const determineSentiment = (title: string = '', description: string = ''): 'positive' | 'negative' | 'neutral' => {
  const content = (title + ' ' + description).toLowerCase();
  
  const positiveWords = ['growth', 'increase', 'rise', 'gain', 'profit', 'success', 'positive', 'breakthrough'];
  const negativeWords = ['decline', 'decrease', 'fall', 'loss', 'crisis', 'negative', 'crash', 'concern'];
  
  let positiveScore = 0;
  let negativeScore = 0;
  
  positiveWords.forEach(word => {
    if (content.includes(word)) positiveScore++;
  });
  
  negativeWords.forEach(word => {
    if (content.includes(word)) negativeScore++;
  });
  
  if (positiveScore > negativeScore) return 'positive';
  if (negativeScore > positiveScore) return 'negative';
  return 'neutral';
};

// Helper function to determine country based on source name
const determineCountry = (sourceName: string = ''): string => {
  const sourceCountryMap: Record<string, string> = {
    'BBC': 'United Kingdom',
    'CNN': 'USA',
    'Reuters': 'Global',
    'Associated Press': 'USA',
    'CNBC': 'USA',
    'Bloomberg': 'USA',
    'Financial Times': 'United Kingdom',
    'The New York Times': 'USA',
    'The Wall Street Journal': 'USA',
    'The Guardian': 'United Kingdom',
    'The Washington Post': 'USA'
  };
  
  return sourceCountryMap[sourceName] || 'Global';
};

export const fetchLatestNews = async (): Promise<NewsItem[]> => {
  try {
    const response = await fetch(
      `${NEWS_API_BASE_URL}/latest-news?apiKey=${NEWS_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return transformCurrentApiResponse(data.news || []);
  } catch (error) {
    console.error('Error fetching latest news:', error);
    // Fallback to mock data if API fails
    return fetchMockNews();
  }
};

export const fetchNewsByCategory = async (category: string): Promise<NewsItem[]> => {
  try {
    // Map categories to Current API categories
    const categoryMap: Record<string, string> = {
      'business': 'business',
      'technology': 'technology',
      'economy': 'business',
      'cryptocurrency': 'technology',
      'general': 'general'
    };
    
    const apiCategory = categoryMap[category.toLowerCase()] || 'business';
    
    const response = await fetch(
      `${NEWS_API_BASE_URL}/latest-news?category=${apiCategory}&apiKey=${NEWS_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return transformCurrentApiResponse(data.news || []);
  } catch (error) {
    console.error('Error fetching news by category:', error);
    // Fallback to mock data if API fails
    const allNews = await fetchMockNews();
    return allNews.filter(news => news.category.toLowerCase() === category.toLowerCase());
  }
};

export const fetchNewsByCountry = async (country: string): Promise<NewsItem[]> => {
  try {
    // Map countries to Current API regions
    const countryMap: Record<string, string> = {
      'usa': 'US',
      'united kingdom': 'GB',
      'japan': 'JP',
      'india': 'IN',
      'china': 'CN',
      'brazil': 'BR',
      'european union': 'EU',
      'global': 'US' // Default to US for global news
    };
    
    const regionCode = countryMap[country.toLowerCase()] || 'US';
    
    const response = await fetch(
      `${NEWS_API_BASE_URL}/latest-news?region=${regionCode}&apiKey=${NEWS_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return transformCurrentApiResponse(data.news || []);
  } catch (error) {
    console.error('Error fetching news by country:', error);
    // Fallback to mock data if API fails
    const allNews = await fetchMockNews();
    return country 
      ? allNews.filter(news => news.country === country)
      : allNews;
  }
};

export const fetchNewsById = async (id: string): Promise<NewsItem | null> => {
  try {
    const allNews = await fetchMockNews();
    return allNews.find(news => news.id === id) || null;
  } catch (error) {
    console.error('Error fetching news by ID:', error);
    return null;
  }
};

// The original mock news function
const fetchMockNews = async (): Promise<NewsItem[]> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
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
