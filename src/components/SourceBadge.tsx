
import React from 'react';
import { 
  Newspaper, Globe, Tv, Radio, Rss, 
  BookOpen, Award, ThumbsUp, AlertTriangle, Heart 
} from 'lucide-react';

// Maps source names to their visual representation
const sourceColorMap: Record<string, string> = {
  // Major news sources
  'CNN': 'bg-red-100 text-red-700 border-red-200',
  'BBC': 'bg-red-100 text-red-700 border-red-200',
  'Reuters': 'bg-orange-100 text-orange-700 border-orange-200',
  'Associated Press': 'bg-blue-100 text-blue-700 border-blue-200',
  'CNBC': 'bg-blue-100 text-blue-700 border-blue-200',
  'Bloomberg': 'bg-indigo-100 text-indigo-700 border-indigo-200',
  'Financial Times': 'bg-pink-100 text-pink-700 border-pink-200',
  'The New York Times': 'bg-gray-100 text-gray-700 border-gray-200',
  'The Wall Street Journal': 'bg-amber-100 text-amber-700 border-amber-200',
  'The Guardian': 'bg-blue-100 text-blue-700 border-blue-200',
  'The Washington Post': 'bg-gray-100 text-gray-700 border-gray-200',
  // Default for other sources
  'default': 'bg-purple-100 text-purple-700 border-purple-200',
};

// Maps source names to appropriate icons
const sourceIconMap: Record<string, React.ReactNode> = {
  'CNN': <Tv className="h-3 w-3" />,
  'BBC': <Tv className="h-3 w-3" />,
  'Reuters': <Globe className="h-3 w-3" />,
  'Associated Press': <Newspaper className="h-3 w-3" />,
  'CNBC': <Tv className="h-3 w-3" />,
  'Bloomberg': <BookOpen className="h-3 w-3" />,
  'Financial Times': <Newspaper className="h-3 w-3" />,
  'The New York Times': <Newspaper className="h-3 w-3" />,
  'The Wall Street Journal': <Newspaper className="h-3 w-3" />,
  'The Guardian': <Newspaper className="h-3 w-3" />,
  'The Washington Post': <Newspaper className="h-3 w-3" />,
  // Default for other sources
  'default': <Rss className="h-3 w-3" />,
};

// Categorize sources by reliability
const getSourceReliabilityIcon = (source: string) => {
  const highReliabilitySources = ['Reuters', 'Associated Press', 'The New York Times', 'The Wall Street Journal', 'The Guardian', 'BBC'];
  
  if (highReliabilitySources.includes(source)) {
    return <Award className="h-3 w-3 ml-1" />;
  }
  
  return null;
};

interface SourceBadgeProps {
  source: string;
  showIcon?: boolean;
  showReliability?: boolean;
  size?: 'sm' | 'md';
}

const SourceBadge: React.FC<SourceBadgeProps> = ({ 
  source, 
  showIcon = true, 
  showReliability = false,
  size = 'sm'
}) => {
  const colorClass = sourceColorMap[source] || sourceColorMap.default;
  const icon = sourceIconMap[source] || sourceIconMap.default;
  const reliabilityIcon = showReliability ? getSourceReliabilityIcon(source) : null;
  
  const sizeClasses = {
    sm: 'text-xs py-0.5 px-2',
    md: 'text-sm py-1 px-2.5'
  };
  
  return (
    <span 
      className={`inline-flex items-center rounded-full border ${colorClass} ${sizeClasses[size]} font-medium`}
    >
      {showIcon && <span className="mr-1">{icon}</span>}
      {source}
      {reliabilityIcon}
    </span>
  );
};

export default SourceBadge;
