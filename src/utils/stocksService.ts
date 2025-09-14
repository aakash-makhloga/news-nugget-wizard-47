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

// Fetch real-time stock quote from Finnhub
export const fetchStockData = async (symbol: string): Promise<StockData | null> => {
  try {
    // Fetch quote data
    const quoteResponse = await fetch(
      `${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    );
    const quoteData = await quoteResponse.json();

    // Fetch company profile
    const profileResponse = await fetch(
      `${FINNHUB_BASE_URL}/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`
    );
    const profileData = await profileResponse.json();

    // Fetch basic financials
    const financialsResponse = await fetch(
      `${FINNHUB_BASE_URL}/stock/metric?symbol=${symbol}&metric=all&token=${FINNHUB_API_KEY}`
    );
    const financialsData = await financialsResponse.json();

    // Fetch historical data (30 days)
    const to = Math.floor(Date.now() / 1000);
    const from = to - (30 * 24 * 60 * 60); // 30 days ago
    const historyResponse = await fetch(
      `${FINNHUB_BASE_URL}/stock/candle?symbol=${symbol}&resolution=D&from=${from}&to=${to}&token=${FINNHUB_API_KEY}`
    );
    const historyData = await historyResponse.json();

    if (quoteData.error || !quoteData.c) {
      return null;
    }

    // Process historical data
    const history = [];
    if (historyData.t && historyData.c) {
      for (let i = 0; i < historyData.t.length; i++) {
        history.push({
          date: new Date(historyData.t[i] * 1000).toISOString().split('T')[0],
          price: historyData.c[i]
        });
      }
    }

    return {
      symbol: symbol,
      name: profileData.name || symbol,
      price: quoteData.c || 0,
      change: quoteData.d || 0,
      changePercent: quoteData.dp || 0,
      volume: quoteData.totalVolume || 0,
      marketCap: profileData.marketCapitalization || 0,
      peRatio: financialsData.metric?.peBasicExclExtraTTM || 0,
      dividend: financialsData.metric?.dividendYieldIndicatedAnnual || 0,
      sector: profileData.finnhubIndustry || 'Unknown',
      country: profileData.country || 'US',
      history: history
    };
  } catch (error) {
    console.error(`Error fetching stock data for ${symbol}:`, error);
    return null;
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


// Search for stocks using Finnhub symbol lookup
export const searchStocks = async (query: string): Promise<StockData[]> => {
  if (!query || query.length < 2) return [];
  
  try {
    // Use Finnhub symbol lookup
    const response = await fetch(
      `${FINNHUB_BASE_URL}/search?q=${encodeURIComponent(query)}&token=${FINNHUB_API_KEY}`
    );
    const data = await response.json();
    
    if (!data.result || data.result.length === 0) {
      return [];
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
    console.error('Error searching stocks:', error);
    return [];
  }
};
