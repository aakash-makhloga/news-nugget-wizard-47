
// This would be replaced with real API calls in production
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

export const fetchStockData = async (symbol: string): Promise<StockData | null> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const stocks: Record<string, StockData> = {
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
    'TCEHY': {
      symbol: 'TCEHY',
      name: 'Tencent Holdings Ltd.',
      price: 43.15,
      change: 0.67,
      changePercent: 1.58,
      volume: 3485632,
      marketCap: 412850000000,
      peRatio: 22.1,
      dividend: 0.25,
      sector: 'Technology',
      country: 'China',
      history: generateMockHistory(43.15)
    },
    'BABA': {
      symbol: 'BABA',
      name: 'Alibaba Group Holding Ltd.',
      price: 84.20,
      change: -1.35,
      changePercent: -1.58,
      volume: 12564738,
      marketCap: 213450000000,
      peRatio: 18.7,
      dividend: 0,
      sector: 'Consumer Cyclical',
      country: 'China',
      history: generateMockHistory(84.20)
    },
    '9984': {
      symbol: '9984',
      name: 'SoftBank Group Corp.',
      price: 6985.00,
      change: 125.00,
      changePercent: 1.82,
      volume: 8573921,
      marketCap: 10829500000000, // in JPY
      peRatio: 9.3,
      dividend: 44.00,
      sector: 'Technology',
      country: 'Japan',
      history: generateMockHistory(6985.00)
    },
    'SAP': {
      symbol: 'SAP',
      name: 'SAP SE',
      price: 178.84,
      change: 2.36,
      changePercent: 1.34,
      volume: 1254863,
      marketCap: 219650000000, // in EUR
      peRatio: 31.2,
      dividend: 2.05,
      sector: 'Technology',
      country: 'Germany',
      history: generateMockHistory(178.84)
    },
    'RIL': {
      symbol: 'RIL',
      name: 'Reliance Industries Ltd.',
      price: 2875.45,
      change: 35.60,
      changePercent: 1.25,
      volume: 5824637,
      marketCap: 19452000000000, // in INR
      peRatio: 17.8,
      dividend: 9.00,
      sector: 'Energy',
      country: 'India',
      history: generateMockHistory(2875.45)
    }
  };
  
  return stocks[symbol] || null;
};

export const fetchPopularStocks = async (): Promise<StockData[]> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const symbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'TCEHY', 'BABA', '9984', 'SAP', 'RIL'];
  const stocks = await Promise.all(
    symbols.map(async (symbol) => {
      const stock = await fetchStockData(symbol);
      return stock!;
    })
  );
  
  return stocks.filter(Boolean);
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
