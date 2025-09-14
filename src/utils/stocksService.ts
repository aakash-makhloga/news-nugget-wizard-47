const FINNHUB_API_KEY = 'd33bu91r01qib1p0buk0d33bu91r01qib1p0bukg';
const FINNHUB_BASE_URL = 'https://finnhub.io/api/v1';

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  peRatio: number;
  dividend: number;
  sector: string;
  country?: string;
  history: {
    date: string;
    price: number;
  }[];
}

// Fallback mock data for when API limits are reached
const mockStockData: Record<string, StockData> = {
  'AAPL': {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 173.75,
    change: 1.23,
    changePercent: 0.71,
    volume: 75482365,
    marketCap: 2723500000000,
    peRatio: 28.5,
    dividend: 0.92,
    sector: 'Technology',
    country: 'USA',
    history: generateMockHistory(173.75)
  },
  'MSFT': {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 415.50,
    change: -2.30,
    changePercent: -0.55,
    volume: 25876432,
    marketCap: 3089200000000,
    peRatio: 35.8,
    dividend: 0.68,
    sector: 'Technology',
    country: 'USA',
    history: generateMockHistory(415.50)
  },
  'GOOGL': {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 152.33,
    change: 0.89,
    changePercent: 0.59,
    volume: 18954623,
    marketCap: 1892600000000,
    peRatio: 24.7,
    dividend: 0,
    sector: 'Technology',
    country: 'USA',
    history: generateMockHistory(152.33)
  },
  'AMZN': {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 178.75,
    change: -1.24,
    changePercent: -0.69,
    volume: 32564897,
    marketCap: 1857300000000,
    peRatio: 55.2,
    dividend: 0,
    sector: 'Consumer Cyclical',
    country: 'USA',
    history: generateMockHistory(178.75)
  },
  'TSLA': {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 246.30,
    change: 5.78,
    changePercent: 2.40,
    volume: 128745632,
    marketCap: 783500000000,
    peRatio: 68.4,
    dividend: 0,
    sector: 'Automotive',
    country: 'USA',
    history: generateMockHistory(246.30)
  },
  'META': {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    price: 298.50,
    change: 3.45,
    changePercent: 1.17,
    volume: 15234567,
    marketCap: 758900000000,
    peRatio: 23.8,
    dividend: 0,
    sector: 'Technology',
    country: 'USA',
    history: generateMockHistory(298.50)
  },
  'NVDA': {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 875.20,
    change: 15.67,
    changePercent: 1.82,
    volume: 42356789,
    marketCap: 2156700000000,
    peRatio: 45.2,
    dividend: 0.16,
    sector: 'Technology',
    country: 'USA',
    history: generateMockHistory(875.20)
  },
  'NFLX': {
    symbol: 'NFLX',
    name: 'Netflix Inc.',
    price: 445.80,
    change: -2.15,
    changePercent: -0.48,
    volume: 8765432,
    marketCap: 192340000000,
    peRatio: 38.7,
    dividend: 0,
    sector: 'Entertainment',
    country: 'USA',
    history: generateMockHistory(445.80)
  },
  'CRM': {
    symbol: 'CRM',
    name: 'Salesforce Inc.',
    price: 275.30,
    change: 4.20,
    changePercent: 1.55,
    volume: 5432187,
    marketCap: 268450000000,
    peRatio: 42.1,
    dividend: 0,
    sector: 'Technology',
    country: 'USA',
    history: generateMockHistory(275.30)
  },
  'ADBE': {
    symbol: 'ADBE',
    name: 'Adobe Inc.',
    price: 598.75,
    change: -3.25,
    changePercent: -0.54,
    volume: 3214567,
    marketCap: 278900000000,
    peRatio: 47.3,
    dividend: 0,
    sector: 'Technology',
    country: 'USA',
    history: generateMockHistory(598.75)
  }
};

// Helper function to generate mock historical data
function generateMockHistory(currentPrice: number) {
  const dates = 30; // 30 days of history
  const history = [];
  let price = currentPrice;
  
  const now = new Date();
  
  for (let i = 0; i < dates; i++) {
    const date = new Date();
    date.setDate(now.getDate() - (dates - i));
    
    // Generate a random price change between -3% and +3%
    const change = price * (Math.random() * 0.06 - 0.03);
    price = parseFloat((price - change).toFixed(2));
    
    history.push({
      date: date.toISOString().split('T')[0],
      price
    });
  }
  
  return history.reverse(); // Most recent last
}

// Fetch real-time stock quote from Finnhub with fallback to mock data
export const fetchStockData = async (symbol: string): Promise<StockData | null> => {
  try {
    // First try to fetch from Finnhub API
    const quoteResponse = await fetch(
      `${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    );
    const quoteData = await quoteResponse.json();

    // Check if API limit reached or error occurred
    if (quoteData.error || quoteResponse.status === 429 || !quoteData.c) {
      console.warn(`Finnhub API limit reached for ${symbol}, using mock data`);
      return mockStockData[symbol] || null;
    }

    // If we have quote data, try to get additional info
    const [profileResponse, financialsResponse] = await Promise.all([
      fetch(`${FINNHUB_BASE_URL}/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`),
      fetch(`${FINNHUB_BASE_URL}/stock/metric?symbol=${symbol}&metric=all&token=${FINNHUB_API_KEY}`)
    ]);

    const profileData = await profileResponse.json();
    const financialsData = await financialsResponse.json();

    // Fetch historical data (30 days)
    const to = Math.floor(Date.now() / 1000);
    const from = to - (30 * 24 * 60 * 60); // 30 days ago
    const historyResponse = await fetch(
      `${FINNHUB_BASE_URL}/stock/candle?symbol=${symbol}&resolution=D&from=${from}&to=${to}&token=${FINNHUB_API_KEY}`
    );
    const historyData = await historyResponse.json();

    // Process historical data
    const history = [];
    if (historyData.t && historyData.c && !historyData.error) {
      for (let i = 0; i < historyData.t.length; i++) {
        history.push({
          date: new Date(historyData.t[i] * 1000).toISOString().split('T')[0],
          price: historyData.c[i]
        });
      }
    } else {
      // Use mock history if API limit reached
      history.push(...generateMockHistory(quoteData.c));
    }

    return {
      symbol: symbol,
      name: (profileData && !profileData.error) ? profileData.name || symbol : symbol,
      price: quoteData.c || 0,
      change: quoteData.d || 0,
      changePercent: quoteData.dp || 0,
      volume: quoteData.totalVolume || 0,
      marketCap: (profileData && !profileData.error) ? profileData.marketCapitalization || 0 : 0,
      peRatio: (financialsData && !financialsData.error) ? financialsData.metric?.peBasicExclExtraTTM || 0 : 0,
      dividend: (financialsData && !financialsData.error) ? financialsData.metric?.dividendYieldIndicatedAnnual || 0 : 0,
      sector: (profileData && !profileData.error) ? profileData.finnhubIndustry || 'Technology' : 'Technology',
      country: (profileData && !profileData.error) ? profileData.country || 'US' : 'US',
      history: history
    };
  } catch (error) {
    console.warn(`Error fetching stock data for ${symbol}, using mock data:`, error);
    return mockStockData[symbol] || null;
  }
};

export const fetchPopularStocks = async (): Promise<StockData[]> => {
  const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX', 'CRM', 'ADBE'];
  const stocks = await Promise.all(
    symbols.map(async (symbol) => {
      const stock = await fetchStockData(symbol);
      return stock;
    })
  );
  
  return stocks.filter(Boolean) as StockData[];
};


// Search for stocks using Finnhub symbol lookup with fallback
export const searchStocks = async (query: string): Promise<StockData[]> => {
  if (!query || query.length < 2) return [];
  
  try {
    // Try Finnhub symbol lookup first
    const response = await fetch(
      `${FINNHUB_BASE_URL}/search?q=${encodeURIComponent(query)}&token=${FINNHUB_API_KEY}`
    );
    const data = await response.json();
    
    // If API limit reached or error, use mock data search
    if (data.error || response.status === 429 || !data.result) {
      console.warn('Finnhub API limit reached for search, using mock data');
      const lowerQuery = query.toLowerCase();
      return Object.values(mockStockData).filter(stock => 
        stock.symbol.toLowerCase().includes(lowerQuery) || 
        stock.name.toLowerCase().includes(lowerQuery)
      );
    }
    
    // Get stock data for first few results
    const symbols = data.result.slice(0, 10).map((item: any) => item.symbol);
    const stocks = await Promise.all(
      symbols.map(async (symbol: string) => {
        const stock = await fetchStockData(symbol);
        return stock;
      })
    );
    
    return stocks.filter(Boolean) as StockData[];
  } catch (error) {
    console.warn('Error searching stocks, using mock data:', error);
    const lowerQuery = query.toLowerCase();
    return Object.values(mockStockData).filter(stock => 
      stock.symbol.toLowerCase().includes(lowerQuery) || 
      stock.name.toLowerCase().includes(lowerQuery)
    );
  }
};
