
interface AIAnalysisResult {
  title: string;
  content: string;
  impact: 'positive' | 'negative' | 'neutral';
  confidence: number;
  categories: string[];
}

// This would be replaced with real API calls in production
export const generateNewsAnalysis = async (newsId: string): Promise<AIAnalysisResult> => {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Predefined analyses for sample news articles
  const analyses: Record<string, AIAnalysisResult> = {
    '1': {
      title: 'Battery Technology Breakthrough',
      content: 'Tesla has created a new type of battery that can make electric cars go much further on a single charge. This means electric cars could become cheaper and more practical for everyday use. This technology might make more people want to buy electric cars instead of gas cars.',
      impact: 'positive',
      confidence: 85,
      categories: ['Electric Vehicles', 'Clean Energy', 'Technology']
    },
    '2': {
      title: 'Interest Rate Changes',
      content: 'The Federal Reserve (the main bank that controls money in the USA) is thinking about making it cheaper for people and businesses to borrow money. When interest rates are lower, it\'s easier to get loans for houses, cars, or starting businesses. This usually helps the economy grow, but sometimes can make prices of things go up over time.',
      impact: 'positive',
      confidence: 72,
      categories: ['Economy', 'Federal Reserve', 'Interest Rates']
    },
    '3': {
      title: 'Amazon\'s Record Profits',
      content: 'Amazon made more money than expected in the last three months. This shows that many people are still shopping online and using Amazon\'s cloud services. It\'s good news for people who own Amazon stock, and it might mean Amazon will keep growing and hiring more workers.',
      impact: 'positive',
      confidence: 88,
      categories: ['E-commerce', 'Tech Companies', 'Retail']
    },
    '4': {
      title: 'Cryptocurrency Price Drop',
      content: 'The value of Bitcoin and other digital currencies has fallen a lot in just one day. This happens often with cryptocurrencies because their prices can change quickly. People who bought cryptocurrency recently might lose money if they sell now, but those who want to buy might see this as a good opportunity to get cryptocurrency at a lower price.',
      impact: 'negative',
      confidence: 65,
      categories: ['Cryptocurrency', 'Bitcoin', 'Digital Assets']
    },
    '5': {
      title: 'Tech Partnership on AI',
      content: 'Apple and Microsoft are working together to create better artificial intelligence (AI). This is interesting because these companies usually compete against each other. Their partnership could lead to new technologies that make phones, computers, and other devices smarter and more helpful in our daily lives.',
      impact: 'positive',
      confidence: 78,
      categories: ['Artificial Intelligence', 'Tech Collaboration', 'Innovation']
    },
    '6': {
      title: 'Oil Price Decrease',
      content: 'The price of oil is going down because there are problems getting it from where it\'s produced to where it\'s needed. Lower oil prices usually mean cheaper gasoline for cars, which is good for drivers. But it can be bad for companies that produce oil and for countries that rely on selling oil to support their economies.',
      impact: 'neutral',
      confidence: 60,
      categories: ['Oil & Gas', 'Global Trade', 'Energy Prices']
    }
  };
  
  // Return predefined analysis or generate a generic one if not found
  return analyses[newsId] || {
    title: 'News Analysis',
    content: 'This news might have some impact on financial markets or specific industries. The actual effects will depend on how companies and investors respond to this information over time.',
    impact: 'neutral',
    confidence: 50,
    categories: ['General', 'Markets']
  };
};
