
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'Chief Editor',
    bio: 'Former financial journalist with over 15 years of experience covering markets and economic policy.',
    avatar: 'SJ'
  },
  {
    name: 'Michael Chen',
    role: 'Market Analyst',
    bio: 'CFA with a background in quantitative analysis and investment banking at major financial institutions.',
    avatar: 'MC'
  },
  {
    name: 'Priya Patel',
    role: 'Economics Correspondent',
    bio: 'PhD in Economics with expertise in monetary policy and international trade relations.',
    avatar: 'PP'
  },
  {
    name: 'James Wilson',
    role: 'Tech Sector Specialist',
    bio: 'Former tech startup founder with deep industry connections and investment advisory experience.',
    avatar: 'JW'
  },
  {
    name: 'Olivia Martinez',
    role: 'Personal Finance Writer',
    bio: 'Certified Financial Planner focusing on retirement planning and wealth management strategies.',
    avatar: 'OM'
  },
  {
    name: 'David Thompson',
    role: 'Data Visualization Lead',
    bio: 'Expert in financial data analysis and creating insightful visualizations of complex market trends.',
    avatar: 'DT'
  }
];

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <motion.main 
        className="flex-1 pt-20 pb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">About FinNews</h1>
            <p className="text-lg text-gray-600">
              Making financial news and analysis accessible to everyone, 
              regardless of their background or experience level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                At FinNews, we believe that financial literacy and market awareness should be accessible to everyone. 
                Our mission is to demystify finance and empower our readers with clear, concise, and accurate information 
                that helps them make informed decisions about their financial futures.
              </p>
              <p className="text-gray-700 mb-4">
                We're committed to explaining complex financial concepts in simple terms, 
                without sacrificing the depth and accuracy that sophisticated readers expect. 
                Whether you're a seasoned investor or just beginning to explore the world of finance, 
                we strive to be your trusted source of news, analysis, and education.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
              <p className="text-gray-700 mb-4">
                We take a comprehensive approach to financial news coverage, focusing on:
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-2">
                <li>Timely reporting on market movements and economic developments</li>
                <li>In-depth analysis that goes beyond headlines to provide context</li>
                <li>Educational content that builds financial literacy step by step</li>
                <li>Data visualization that makes complex information easy to understand</li>
                <li>Diverse perspectives that represent various investment philosophies</li>
              </ul>
              <p className="text-gray-700">
                Our content is created by a team of experienced financial journalists, 
                industry experts, and certified professionals who are passionate about making 
                finance more accessible.
              </p>
            </motion.div>
          </div>

          <Separator className="mb-16" />

          <div className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-10">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`/placeholder.svg`} alt={member.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-700">{member.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator className="mb-16" />

          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-center mb-8">Our Editorial Standards</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Accuracy and Fact-Checking</h3>
                <p className="text-gray-700">
                  All articles undergo a rigorous fact-checking process before publication. 
                  We strive for accuracy in our reporting and promptly correct any errors.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Independence</h3>
                <p className="text-gray-700">
                  Our editorial decisions are independent and not influenced by advertisers or external parties. 
                  We clearly disclose any potential conflicts of interest.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Transparency</h3>
                <p className="text-gray-700">
                  We're transparent about our sources and methodologies. When we provide analysis, 
                  we explain the reasoning behind our conclusions.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Educational Focus</h3>
                <p className="text-gray-700">
                  We prioritize educational value in our content, always aiming to help readers 
                  understand the "why" behind financial developments, not just the "what."
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
            <p className="text-gray-700 mb-4">
              Have questions, feedback, or story ideas? We'd love to hear from you.
            </p>
            <p className="text-gray-700">
              Contact us at <span className="text-blue-600">hello@finnews.com</span>
            </p>
          </div>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default About;
