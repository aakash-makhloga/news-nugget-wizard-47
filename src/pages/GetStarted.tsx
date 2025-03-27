
import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Lightbulb, BookOpen, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    title: "Simplified Financial News",
    description: "Complex financial news explained in simple, jargon-free language that anyone can understand.",
    icon: <BookOpen className="h-8 w-8 text-blue-500" />
  },
  {
    title: "AI-Powered Insights",
    description: "Get AI analysis that breaks down what each news story means for markets and your investments.",
    icon: <Lightbulb className="h-8 w-8 text-amber-500" />
  },
  {
    title: "Real-Time Market Data",
    description: "Stay up-to-date with live stock tickers and market indicators from around the world.",
    icon: <TrendingUp className="h-8 w-8 text-green-500" />
  }
];

const steps = [
  {
    title: "Create Your Account",
    description: "Sign up for free and set your news preferences based on what matters most to you.",
    number: 1
  },
  {
    title: "Choose Your Topics",
    description: "Select the financial topics, markets, and regions you want to follow closely.",
    number: 2
  },
  {
    title: "Get Personalized Updates",
    description: "Receive daily briefings and real-time alerts tailored to your interests.",
    number: 3
  }
];

const GetStarted = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <motion.main 
        className="flex-1 pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">Start Understanding Finance Today</h1>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of readers who get clear, simple financial news they can actually understand.
                No more confusing jargon, just actionable insights.
              </p>
              <Button size="lg" className="font-medium px-8">
                Create Free Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose FinNews</h2>
              <p className="text-lg text-gray-600">
                We break down complex financial news into simple insights that help you make better decisions.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-gray-600">
                Getting started with FinNews is simple and takes less than 5 minutes.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
                      {step.number}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}

              <div className="text-center mt-8">
                <Button size="lg" className="font-medium px-8">
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Readers Say</h2>
              <p className="text-lg text-gray-600">
                Join thousands of satisfied readers who've transformed how they consume financial news.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-gray-50">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    "FinNews has completely changed how I understand financial news. No more confusion or feeling lost when reading about markets."
                  </p>
                  <div className="font-medium">
                    Rebecca W.
                    <span className="text-gray-500 ml-1 font-normal">Small Business Owner</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-50">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    "The AI analysis is amazing. It helps me quickly understand the implications of complex financial news without spending hours researching."
                  </p>
                  <div className="font-medium">
                    Marcus T.
                    <span className="text-gray-500 ml-1 font-normal">Retail Investor</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gray-50">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    "I've tried many financial news sites, but FinNews is the only one that explains everything in plain language without talking down to me."
                  </p>
                  <div className="font-medium">
                    Jennifer K.
                    <span className="text-gray-500 ml-1 font-normal">Finance Student</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </motion.main>
      <Footer />
    </div>
  );
};

export default GetStarted;
