import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead title="About Us - FinanceFlow" />
      <Header />
      <motion.main className="flex-grow pt-20 pb-10">
        <div className="container px-4 md:px-6 mx-auto">
          <h1 className="text-responsive-xl font-bold mb-6">About FinanceFlow</h1>
          <p className="text-lg text-muted-foreground">
            We make financial news accessible to everyone through AI-powered insights.
          </p>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default About;