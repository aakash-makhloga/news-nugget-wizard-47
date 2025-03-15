
import React, { useState } from 'react';
import { Search, X, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import SourceBadge from './SourceBadge';

interface SourceFilterProps {
  sources: string[];
  selectedSource: string | null;
  onSourceSelect: (source: string) => void;
}

const SourceFilter: React.FC<SourceFilterProps> = ({ 
  sources, 
  selectedSource, 
  onSourceSelect 
}) => {
  const [showSourceSearch, setShowSourceSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const filteredSources = sources.filter(source => 
    source.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="relative source-filter-container">
      {selectedSource ? (
        <SourceBadge 
          source={selectedSource} 
          showReliability={true}
        />
      ) : (
        <Button 
          variant="outline" 
          size="sm" 
          className="source-filter-btn flex items-center"
          onClick={() => setShowSourceSearch(!showSourceSearch)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filter by Source
        </Button>
      )}
      
      {selectedSource && (
        <button 
          className="ml-2 text-gray-500 hover:text-gray-700"
          onClick={() => onSourceSelect('All')}
        >
          <X className="h-4 w-4" />
        </button>
      )}
      
      {showSourceSearch && (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-md bg-white shadow-lg border border-gray-200 z-10 overflow-hidden">
          <div className="p-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search source..."
                className="pl-8 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <button 
                  className="absolute right-2 top-2.5"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </div>
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            <div 
              className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSourceSelect('All');
                setShowSourceSearch(false);
                setSearchQuery('');
              }}
            >
              All Sources
            </div>
            
            {filteredSources.length > 0 ? (
              filteredSources.map(source => (
                <div
                  key={source}
                  className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    onSourceSelect(source);
                    setShowSourceSearch(false);
                    setSearchQuery('');
                  }}
                >
                  <SourceBadge source={source} size="sm" />
                </div>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500">
                No sources found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SourceFilter;
