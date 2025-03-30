
import { StockData, fetchStockData } from './stocksService';

export interface PortfolioStock {
  symbol: string;
  shares: number;
  purchasePrice: number;
  purchaseDate: string;
}

export interface Portfolio {
  stocks: PortfolioStock[];
  lastUpdated: string;
}

// Initialize with demo data
const DEMO_PORTFOLIO: Portfolio = {
  stocks: [
    { symbol: 'AAPL', shares: 10, purchasePrice: 150.75, purchaseDate: '2023-01-15' },
    { symbol: 'MSFT', shares: 5, purchasePrice: 380.60, purchaseDate: '2023-02-20' },
    { symbol: 'GOOGL', shares: 8, purchasePrice: 140.25, purchaseDate: '2023-03-10' }
  ],
  lastUpdated: new Date().toISOString()
};

// Local storage key
const PORTFOLIO_STORAGE_KEY = 'user_portfolio';

// Get portfolio from storage or use demo data
export const getPortfolio = (): Portfolio => {
  const stored = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return DEMO_PORTFOLIO;
};

// Save portfolio to storage
export const savePortfolio = (portfolio: Portfolio): void => {
  localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify({
    ...portfolio,
    lastUpdated: new Date().toISOString()
  }));
};

// Add a stock to portfolio
export const addStockToPortfolio = (stock: PortfolioStock): void => {
  const portfolio = getPortfolio();
  
  // Check if stock already exists
  const existingIndex = portfolio.stocks.findIndex(s => s.symbol === stock.symbol);
  
  if (existingIndex >= 0) {
    // Average out purchase price if adding more shares of existing stock
    const existing = portfolio.stocks[existingIndex];
    const totalShares = existing.shares + stock.shares;
    const totalValue = (existing.shares * existing.purchasePrice) + (stock.shares * stock.purchasePrice);
    
    portfolio.stocks[existingIndex] = {
      ...existing,
      shares: totalShares,
      purchasePrice: totalValue / totalShares
    };
  } else {
    portfolio.stocks.push(stock);
  }
  
  savePortfolio(portfolio);
};

// Remove a stock from portfolio
export const removeStockFromPortfolio = (symbol: string): void => {
  const portfolio = getPortfolio();
  portfolio.stocks = portfolio.stocks.filter(stock => stock.symbol !== symbol);
  savePortfolio(portfolio);
};

// Get current valuation of portfolio with performance data
export const getPortfolioValuation = async (): Promise<{
  totalValue: number;
  totalGainLoss: number;
  totalGainLossPercent: number;
  stocks: (PortfolioStock & { currentPrice: number; value: number; gainLoss: number; gainLossPercent: number; stockData: StockData | null })[];
}> => {
  const portfolio = getPortfolio();
  
  // Fetch current stock data for all portfolio stocks
  const stocksWithData = await Promise.all(
    portfolio.stocks.map(async (stock) => {
      const stockData = await fetchStockData(stock.symbol);
      const currentPrice = stockData?.price || 0;
      const value = stock.shares * currentPrice;
      const initialValue = stock.shares * stock.purchasePrice;
      const gainLoss = value - initialValue;
      const gainLossPercent = initialValue > 0 ? (gainLoss / initialValue) * 100 : 0;
      
      return {
        ...stock,
        currentPrice,
        value,
        gainLoss,
        gainLossPercent,
        stockData
      };
    })
  );
  
  // Calculate totals
  const totalValue = stocksWithData.reduce((sum, stock) => sum + stock.value, 0);
  const totalInitialValue = stocksWithData.reduce((sum, stock) => sum + (stock.shares * stock.purchasePrice), 0);
  const totalGainLoss = totalValue - totalInitialValue;
  const totalGainLossPercent = totalInitialValue > 0 ? (totalGainLoss / totalInitialValue) * 100 : 0;
  
  return {
    totalValue,
    totalGainLoss,
    totalGainLossPercent,
    stocks: stocksWithData
  };
};

// Function to find relevant news for portfolio stocks
export const getRelevantNewsForPortfolio = (news: any[], portfolio: Portfolio): any[] => {
  const symbols = portfolio.stocks.map(stock => stock.symbol);
  const stockNames = portfolio.stocks.map(stock => stock.symbol.toLowerCase());
  
  return news.filter(item => {
    const title = item.title.toLowerCase();
    const summary = item.summary.toLowerCase();
    
    // Check if any of the stock symbols or names appear in the news
    return symbols.some(symbol => 
      title.includes(symbol.toLowerCase()) || 
      summary.includes(symbol.toLowerCase())
    );
  });
};

// Generate summarized data about the portfolio
export const getPortfolioSummary = (portfolioData: any) => {
  if (!portfolioData) return null;
  
  const { stocks, totalValue, totalGainLoss, totalGainLossPercent } = portfolioData;
  
  // Get sector breakdown
  const sectorBreakdown: Record<string, number> = {};
  let totalSectorValue = 0;
  
  stocks.forEach((stock: any) => {
    const sector = stock.stockData?.sector || 'Uncategorized';
    sectorBreakdown[sector] = (sectorBreakdown[sector] || 0) + stock.value;
    totalSectorValue += stock.value;
  });
  
  // Convert to percentages
  const sectorAllocation = Object.entries(sectorBreakdown).map(([sector, value]) => ({
    sector,
    value,
    percentage: (value / totalSectorValue) * 100
  }));
  
  // Find best and worst performers
  const sortedByPerformance = [...stocks].sort((a, b) => b.gainLossPercent - a.gainLossPercent);
  const bestPerformer = sortedByPerformance[0];
  const worstPerformer = sortedByPerformance[sortedByPerformance.length - 1];
  
  return {
    totalValue,
    totalGainLoss,
    totalGainLossPercent,
    sectorAllocation,
    bestPerformer,
    worstPerformer,
    stockCount: stocks.length
  };
};
