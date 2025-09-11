import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SEOHead from '@/components/SEOHead';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead title="Contact Us - FinanceFlow" />
      <Header />
      <motion.main className="flex-grow pt-20 pb-10">
        <div className="container px-4 md:px-6 mx-auto">
          <h1 className="text-responsive-xl font-bold mb-6">Contact Us</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="card-premium">
              <CardHeader>
                <Mail className="h-8 w-8 text-primary mb-4" />
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p>support@financeflow.com</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default Contact;