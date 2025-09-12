import { useState, useEffect } from 'react';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    const savedBookmarks = localStorage.getItem('newsBookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  const toggleBookmark = (newsId: string) => {
    setBookmarks(prev => {
      const isBookmarked = prev.includes(newsId);
      const newBookmarks = isBookmarked
        ? prev.filter(id => id !== newsId)
        : [...prev, newsId];
      
      localStorage.setItem('newsBookmarks', JSON.stringify(newBookmarks));
      return newBookmarks;
    });
  };

  const isBookmarked = (newsId: string) => bookmarks.includes(newsId);

  const getBookmarkedCount = () => bookmarks.length;

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked,
    getBookmarkedCount
  };
};

export default useBookmarks;