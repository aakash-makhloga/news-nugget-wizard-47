
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, DollarSign, Calendar, Briefcase, ListOrdered } from 'lucide-react';

const PortfolioGuide = () => {
  return (
    <Card className="mb-8 border-2 border-dashed border-blue-300 bg-blue-50">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center text-blue-700">
          <Briefcase className="mr-2 h-5 w-5" />
          कैसे पोर्टफोलियो में स्टॉक जोड़ें
        </CardTitle>
        <CardDescription className="text-blue-600">
          अपना निवेश पोर्टफोलियो बनाने के लिए इन सरल चरणों का पालन करें
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
              <ListOrdered className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <h3 className="font-medium text-blue-700">पोर्टफोलियो पेज पर जाएँ</h3>
              <p className="text-blue-600 text-sm">
                ऊपर दिए गए नेविगेशन मेनू से "Portfolio" पर क्लिक करें
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
              <Plus className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <h3 className="font-medium text-blue-700">"Add Stock" बटन पर क्लिक करें</h3>
              <p className="text-blue-600 text-sm">
                पोर्टफोलियो पेज के ऊपरी दाईं ओर "Add Stock" बटन पर क्लिक करें
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
              <DollarSign className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <h3 className="font-medium text-blue-700">स्टॉक विवरण दर्ज करें</h3>
              <p className="text-blue-600 text-sm">
                स्टॉक सिंबल (जैसे AAPL, MSFT), शेयरों की संख्या, और खरीद मूल्य दर्ज करें
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
              <Calendar className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <h3 className="font-medium text-blue-700">खरीद तिथि चुनें</h3>
              <p className="text-blue-600 text-sm">
                कैलेंडर से स्टॉक खरीदने की तिथि चुनें (डिफॉल्ट: आज की तारीख)
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-3">
              <Briefcase className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <h3 className="font-medium text-blue-700">"Add to Portfolio" पर क्लिक करें</h3>
              <p className="text-blue-600 text-sm">
                फॉर्म जमा करने के लिए "Add to Portfolio" बटन पर क्लिक करें और अपने पोर्टफोलियो में स्टॉक जोड़ें
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioGuide;
