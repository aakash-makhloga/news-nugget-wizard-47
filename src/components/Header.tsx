
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Bell, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container px-4 md:px-6 mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <motion.div 
            className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white font-bold">F</span>
          </motion.div>
          <span className="font-display text-xl font-semibold tracking-tight">FinNews</span>
        </Link>

        {!isMobile && (
          <div className="hidden md:flex items-center space-x-1">
            <motion.nav 
              className="flex items-center space-x-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Button variant="ghost" asChild>
                <Link to="/" className="px-4 py-2 rounded-md text-sm font-medium">Home</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/markets" className="px-4 py-2 rounded-md text-sm font-medium">Markets</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/stocks" className="px-4 py-2 rounded-md text-sm font-medium">Stocks</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/learn" className="px-4 py-2 rounded-md text-sm font-medium">Learn</Link>
              </Button>
            </motion.nav>
          </div>
        )}

        <div className="flex items-center gap-2">
          <div className="relative hidden md:block">
            <Input
              type="search"
              placeholder="Search news..."
              className="w-[200px] pl-9 h-9 rounded-full bg-gray-100 border-0 focus-visible:ring-blue-500"
            />
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Bell className="h-5 w-5 text-gray-600" />
          </motion.button>
          
          {isMobile && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMenu}
              className="p-2 rounded-full hover:bg-gray-100 md:hidden"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobile && (
        <motion.div 
          className={`absolute top-full left-0 right-0 bg-white shadow-lg ${isMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isMenuOpen ? 1 : 0, height: isMenuOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container px-4 py-4">
            <div className="flex mb-4">
              <Input
                type="search"
                placeholder="Search news..."
                className="w-full pl-9 h-10 rounded-full bg-gray-100 border-0"
              />
              <Search className="absolute left-6 top-[4.5rem] h-4 w-4 text-gray-500" />
            </div>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100">Home</Link>
              <Link to="/markets" className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100">Markets</Link>
              <Link to="/stocks" className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100">Stocks</Link>
              <Link to="/learn" className="px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100">Learn</Link>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
