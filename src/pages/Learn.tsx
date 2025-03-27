
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { BookOpen, TrendingUp, BarChart2, DollarSign, Book, Briefcase, GraduationCap, Clock } from 'lucide-react';

const courses = [
  {
    id: 'investing-basics',
    title: 'Investing Basics',
    description: 'Learn the fundamentals of investing in stocks, bonds, and mutual funds.',
    level: 'Beginner',
    icon: BookOpen,
    lessons: 12,
    duration: '4 hours',
    category: 'fundamentals'
  },
  {
    id: 'technical-analysis',
    title: 'Technical Analysis',
    description: 'Master chart patterns, indicators, and technical analysis methodologies.',
    level: 'Intermediate',
    icon: TrendingUp,
    lessons: 18,
    duration: '6 hours',
    category: 'analysis'
  },
  {
    id: 'fundamental-analysis',
    title: 'Fundamental Analysis',
    description: 'Understand how to analyze financial statements and company valuation.',
    level: 'Intermediate',
    icon: BarChart2,
    lessons: 15,
    duration: '5 hours',
    category: 'analysis'
  },
  {
    id: 'portfolio-management',
    title: 'Portfolio Management',
    description: 'Learn strategies for managing and optimizing your investment portfolio.',
    level: 'Advanced',
    icon: Briefcase,
    lessons: 10,
    duration: '3.5 hours',
    category: 'strategies'
  },
  {
    id: 'retirement-planning',
    title: 'Retirement Planning',
    description: 'Prepare for retirement with strategies for long-term financial security.',
    level: 'Intermediate',
    icon: DollarSign,
    lessons: 8,
    duration: '2.5 hours',
    category: 'planning'
  },
  {
    id: 'market-economics',
    title: 'Market Economics',
    description: 'Understand the economic forces that drive financial markets.',
    level: 'Intermediate',
    icon: Book,
    lessons: 14,
    duration: '4.5 hours',
    category: 'fundamentals'
  },
];

const financialTermsData = [
  { category: 'Investing', count: 45 },
  { category: 'Trading', count: 32 },
  { category: 'Economics', count: 28 },
  { category: 'Corporate', count: 38 },
  { category: 'Banking', count: 25 },
  { category: 'Retirement', count: 18 },
];

const Learn = () => {
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
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">Financial Education Center</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Enhance your financial literacy with our comprehensive learning resources, 
              from beginner guides to advanced investment strategies.
            </p>
          </div>

          <Tabs defaultValue="courses" className="mb-10">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="glossary">Glossary</TabsTrigger>
              <TabsTrigger value="guides">Guides</TabsTrigger>
            </TabsList>
            
            <TabsContent value="courses" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant={
                          course.level === 'Beginner' ? 'default' : 
                          course.level === 'Intermediate' ? 'secondary' : 'destructive'
                        }>
                          {course.level}
                        </Badge>
                        <course.icon className="h-6 w-6 text-blue-500" />
                      </div>
                      <CardTitle className="mt-2">{course.title}</CardTitle>
                      <CardDescription>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <GraduationCap className="mr-1 h-4 w-4" />
                          {course.lessons} lessons
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {course.duration}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full">
                        <Link to={`/learn/${course.id}`}>Start Learning</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="glossary" className="mt-6">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Financial Terms Dictionary</CardTitle>
                  <CardDescription>Browse our comprehensive collection of financial terms and definitions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] mb-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={financialTermsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Button variant="outline" className="justify-start" asChild>
                      <Link to="/learn/terms/investing">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Investing Terms
                      </Link>
                    </Button>
                    <Button variant="outline" className="justify-start" asChild>
                      <Link to="/learn/terms/trading">
                        <TrendingUp className="mr-2 h-4 w-4" />
                        Trading Terms
                      </Link>
                    </Button>
                    <Button variant="outline" className="justify-start" asChild>
                      <Link to="/learn/terms/economics">
                        <BarChart2 className="mr-2 h-4 w-4" />
                        Economics Terms
                      </Link>
                    </Button>
                    <Button variant="outline" className="justify-start" asChild>
                      <Link to="/learn/terms/corporate">
                        <Briefcase className="mr-2 h-4 w-4" />
                        Corporate Finance
                      </Link>
                    </Button>
                    <Button variant="outline" className="justify-start" asChild>
                      <Link to="/learn/terms/banking">
                        <DollarSign className="mr-2 h-4 w-4" />
                        Banking Terms
                      </Link>
                    </Button>
                    <Button variant="outline" className="justify-start" asChild>
                      <Link to="/learn/terms/retirement">
                        <Book className="mr-2 h-4 w-4" />
                        Retirement Planning
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Term of the Day</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h3 className="text-xl font-bold mb-2">Price-to-Earnings (P/E) Ratio</h3>
                    <p className="text-gray-700 mb-4">
                      A valuation ratio of a company's current share price compared to its earnings per share (EPS).
                      Calculated as: Market Value per Share / Earnings per Share.
                    </p>
                    <p className="text-sm text-gray-600">
                      Used by investors to determine the relative value of a company's shares in an apples-to-apples comparison.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recently Added Terms</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="border-b pb-2">
                        <div className="font-medium">ESG Investing</div>
                        <div className="text-sm text-gray-600">Investment approach that considers environmental, social and governance factors</div>
                      </li>
                      <li className="border-b pb-2">
                        <div className="font-medium">Yield Curve Control</div>
                        <div className="text-sm text-gray-600">Central bank policy that targets specific yields on government bonds</div>
                      </li>
                      <li className="border-b pb-2">
                        <div className="font-medium">SPAC</div>
                        <div className="text-sm text-gray-600">Special Purpose Acquisition Company used to take companies public</div>
                      </li>
                      <li>
                        <div className="font-medium">NFT</div>
                        <div className="text-sm text-gray-600">Non-Fungible Token, a digital asset representing real-world objects</div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="guides" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Beginner's Guide to Investing</CardTitle>
                    <CardDescription>Start your investment journey on the right foot</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <div className="bg-blue-100 text-blue-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5 mr-2">1</div>
                        <span>Understanding investment types</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-100 text-blue-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5 mr-2">2</div>
                        <span>Setting financial goals</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-100 text-blue-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5 mr-2">3</div>
                        <span>Risk assessment</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-100 text-blue-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5 mr-2">4</div>
                        <span>Building your first portfolio</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <Link to="/learn/guides/beginners">Read Guide</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Understanding Market Analysis</CardTitle>
                    <CardDescription>Learn to analyze market trends and make informed decisions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start">
                        <div className="bg-blue-100 text-blue-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5 mr-2">1</div>
                        <span>Technical vs fundamental analysis</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-100 text-blue-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5 mr-2">2</div>
                        <span>Reading financial statements</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-100 text-blue-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5 mr-2">3</div>
                        <span>Identifying market trends</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-100 text-blue-700 rounded-full h-5 w-5 flex items-center justify-center text-xs mt-0.5 mr-2">4</div>
                        <span>Economic indicators</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <Link to="/learn/guides/market-analysis">Read Guide</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Featured Articles</CardTitle>
                  <CardDescription>In-depth analysis and educational content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">How Inflation Affects Your Investments</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Understanding the impact of inflation on different asset classes and investment strategies.
                      </p>
                      <Link to="/learn/articles/inflation-impact" className="text-blue-600 hover:underline text-sm font-medium">
                        Read More →
                      </Link>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Diversification Strategies for 2023</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Modern approaches to portfolio diversification in the current economic environment.
                      </p>
                      <Link to="/learn/articles/diversification" className="text-blue-600 hover:underline text-sm font-medium">
                        Read More →
                      </Link>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">ESG Investing: Beyond the Basics</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Taking a deeper look at environmental, social, and governance criteria in investment decisions.
                      </p>
                      <Link to="/learn/articles/esg-investing" className="text-blue-600 hover:underline text-sm font-medium">
                        Read More →
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default Learn;
