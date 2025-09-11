import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Page Not Found - FinanceFlow"
        description="The page you're looking for doesn't exist."
      />
      <Header />
      
      <motion.main 
        className="flex-grow pt-20 flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container px-4 md:px-6 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-lg mx-auto"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center mx-auto mb-8">
              <Search className="h-12 w-12 text-white" />
            </div>
            
            <h1 className="text-6xl font-bold text-gradient mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Sorry, we couldn't find the page you're looking for. It might have been moved, 
              deleted, or the URL might be incorrect.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-glow" asChild>
                <Link to="/">
                  <Home className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="glass" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-4">
                Looking for something specific? Try these popular pages:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <Link to="/markets" className="text-primary hover:underline text-sm">Markets</Link>
                <span className="text-muted-foreground">•</span>
                <Link to="/stocks" className="text-primary hover:underline text-sm">Stocks</Link>
                <span className="text-muted-foreground">•</span>
                <Link to="/learn" className="text-primary hover:underline text-sm">Learning Center</Link>
                <span className="text-muted-foreground">•</span>
                <Link to="/portfolio" className="text-primary hover:underline text-sm">Portfolio</Link>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
