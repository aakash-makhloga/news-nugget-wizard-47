import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Bell, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNotifications } from '@/hooks/useNotifications';
import NotificationPanel from '@/components/NotificationPanel';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const { 
    notifications, 
    unreadCount, 
    isNotificationPanelOpen, 
    toggleNotificationPanel,
    setIsNotificationPanelOpen,
    markAllAsRead,
    clearAllNotifications
  } = useNotifications();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsNotificationPanelOpen(false);
  }, [location, setIsNotificationPanelOpen]);

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
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink 
                      className={cn(
                        "px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100",
                        location.pathname === "/" && "bg-gray-100"
                      )}
                    >
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className={cn(
                      location.pathname === "/markets" && "bg-gray-100"
                    )}
                  >
                    Markets
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-50 to-blue-100 p-6 no-underline outline-none focus:shadow-md"
                            to="/markets"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Market Overview
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Track major indices, forex, and commodities to stay informed on global market trends.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/markets?tab=indices"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Major Indices</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              S&P 500, Dow Jones, NASDAQ, and global indices.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/markets?tab=forex"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Forex</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Currency exchange rates and trading information.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/markets?tab=commodities"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Commodities</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Gold, oil, and other commodities pricing and trends.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      location.pathname === "/stocks" && "bg-gray-100"
                    )}
                  >
                    Stocks
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-green-50 to-green-100 p-6 no-underline outline-none focus:shadow-md"
                            to="/stocks"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Stock Market
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Explore top companies, track performance and discover investment opportunities.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/stocks?sector=technology"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Technology Stocks</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Big tech, software, and emerging technology companies.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/stocks?sector=finance"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Financial Stocks</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Banks, insurance, and financial service providers.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={cn(
                      location.pathname === "/learn" && "bg-gray-100"
                    )}
                  >
                    Learn
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-purple-50 to-purple-100 p-6 no-underline outline-none focus:shadow-md"
                            to="/learn"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Financial Education
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Enhance your financial literacy with our comprehensive learning resources.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/learn?tab=courses"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Courses</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Structured learning paths from beginner to advanced.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/learn?tab=glossary"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Financial Glossary</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Comprehensive dictionary of financial terms.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/learn?tab=guides"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Guides & Articles</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              In-depth guides on investing, trading, and finance.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/about">
                    <NavigationMenuLink 
                      className={cn(
                        "px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100",
                        location.pathname === "/about" && "bg-gray-100"
                      )}
                    >
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/contact">
                    <NavigationMenuLink 
                      className={cn(
                        "px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100",
                        location.pathname === "/contact" && "bg-gray-100"
                      )}
                    >
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
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
            className="p-2 rounded-full hover:bg-gray-100 relative"
            onClick={toggleNotificationPanel}
          >
            <Bell className="h-5 w-5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
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
              <Link to="/" className={`px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 ${location.pathname === "/" ? "bg-gray-100" : ""}`}>Home</Link>
              <Link to="/markets" className={`px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 ${location.pathname === "/markets" ? "bg-gray-100" : ""}`}>Markets</Link>
              <Link to="/stocks" className={`px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 ${location.pathname === "/stocks" ? "bg-gray-100" : ""}`}>Stocks</Link>
              <Link to="/learn" className={`px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 ${location.pathname === "/learn" ? "bg-gray-100" : ""}`}>Learn</Link>
              <Link to="/about" className={`px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 ${location.pathname === "/about" ? "bg-gray-100" : ""}`}>About</Link>
              <Link to="/contact" className={`px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 ${location.pathname === "/contact" ? "bg-gray-100" : ""}`}>Contact</Link>
            </nav>
          </div>
        </motion.div>
      )}

      {/* Notification Panel */}
      <NotificationPanel
        isOpen={isNotificationPanelOpen}
        onClose={() => setIsNotificationPanelOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={markAllAsRead}
        onClearAll={clearAllNotifications}
      />
    </header>
  );
};

export default Header;
