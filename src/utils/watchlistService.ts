
export interface WatchlistItem {
  symbol: string;
  addedAt: string;
  notes?: string;
}

export interface Watchlist {
  items: WatchlistItem[];
  lastUpdated: string;
}

// Local storage key
const WATCHLIST_STORAGE_KEY = 'user_watchlist';

// Get watchlist from storage
export const getWatchlist = (): Watchlist => {
  const stored = localStorage.getItem(WATCHLIST_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    items: [],
    lastUpdated: new Date().toISOString()
  };
};

// Save watchlist to storage
export const saveWatchlist = (watchlist: Watchlist): void => {
  localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify({
    ...watchlist,
    lastUpdated: new Date().toISOString()
  }));
};

// Add a stock to watchlist
export const addToWatchlist = (symbol: string, notes?: string): WatchlistItem => {
  const watchlist = getWatchlist();
  
  // Check if stock is already in watchlist
  const existing = watchlist.items.find(item => item.symbol === symbol);
  
  if (existing) {
    // Update notes if provided
    if (notes !== undefined) {
      existing.notes = notes;
      saveWatchlist(watchlist);
    }
    return existing;
  }
  
  // Add new item
  const newItem: WatchlistItem = {
    symbol,
    addedAt: new Date().toISOString(),
    notes
  };
  
  watchlist.items.push(newItem);
  saveWatchlist(watchlist);
  
  return newItem;
};

// Remove a stock from watchlist
export const removeFromWatchlist = (symbol: string): void => {
  const watchlist = getWatchlist();
  watchlist.items = watchlist.items.filter(item => item.symbol !== symbol);
  saveWatchlist(watchlist);
};

// Check if a stock is in the watchlist
export const isInWatchlist = (symbol: string): boolean => {
  const watchlist = getWatchlist();
  return watchlist.items.some(item => item.symbol === symbol);
};

// Get watchlist symbols
export const getWatchlistSymbols = (): string[] => {
  const watchlist = getWatchlist();
  return watchlist.items.map(item => item.symbol);
};

// Update notes for a watchlist item
export const updateWatchlistNotes = (symbol: string, notes: string): void => {
  const watchlist = getWatchlist();
  const item = watchlist.items.find(item => item.symbol === symbol);
  
  if (item) {
    item.notes = notes;
    saveWatchlist(watchlist);
  }
};
