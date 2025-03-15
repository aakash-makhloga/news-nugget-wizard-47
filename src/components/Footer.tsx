
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-8">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-blue-500 rounded-md flex items-center justify-center">
                <span className="text-white font-bold">F</span>
              </div>
              <span className="font-display text-lg font-semibold tracking-tight">FinNews</span>
            </div>
            <p className="text-sm text-gray-600 max-w-xs">
              Simple financial news and analysis that anyone can understand. Making finance accessible for everyone.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-sm text-gray-900 uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/category/stocks" className="text-gray-600 hover:text-blue-600 text-sm">Stocks</Link></li>
              <li><Link to="/category/crypto" className="text-gray-600 hover:text-blue-600 text-sm">Cryptocurrency</Link></li>
              <li><Link to="/category/economy" className="text-gray-600 hover:text-blue-600 text-sm">Economy</Link></li>
              <li><Link to="/category/business" className="text-gray-600 hover:text-blue-600 text-sm">Business</Link></li>
              <li><Link to="/category/markets" className="text-gray-600 hover:text-blue-600 text-sm">Markets</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm text-gray-900 uppercase tracking-wider mb-4">Learn</h3>
            <ul className="space-y-2">
              <li><Link to="/learn/basics" className="text-gray-600 hover:text-blue-600 text-sm">Finance Basics</Link></li>
              <li><Link to="/learn/investing" className="text-gray-600 hover:text-blue-600 text-sm">Investing 101</Link></li>
              <li><Link to="/learn/terms" className="text-gray-600 hover:text-blue-600 text-sm">Financial Terms</Link></li>
              <li><Link to="/learn/analysis" className="text-gray-600 hover:text-blue-600 text-sm">Market Analysis</Link></li>
              <li><Link to="/learn/strategies" className="text-gray-600 hover:text-blue-600 text-sm">Trading Strategies</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm text-gray-900 uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-blue-600 text-sm">About Us</Link></li>
              <li><Link to="/team" className="text-gray-600 hover:text-blue-600 text-sm">Our Team</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-blue-600 text-sm">Careers</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-blue-600 text-sm">Contact Us</Link></li>
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <Mail className="h-4 w-4" />
                <span>hello@finnews.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            © {new Date().getFullYear()} FinNews. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-sm text-gray-600 hover:text-blue-600">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-gray-600 hover:text-blue-600">Terms of Service</Link>
            <Link to="/cookies" className="text-sm text-gray-600 hover:text-blue-600">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
