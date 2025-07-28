import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Smartphone, Globe, QrCode, Share2, Download, Store } from 'lucide-react';

const AppDistribution: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-100 mb-4">How Users Find Your App</h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Your Tropoja Guide app can reach users through multiple distribution channels, 
          not just app stores.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Web App Distribution */}
        <Card className="bg-slate-700 border-slate-600">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-400" />
              <CardTitle className="text-slate-100">Web App (Current)</CardTitle>
              <Badge variant="secondary" className="bg-green-600 text-white">Active</Badge>
            </div>
            <CardDescription className="text-slate-300">
              Accessible through web browsers on any device
            </CardDescription>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-200">Distribution Methods:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Direct website link (tropoja-guide.com)</li>
                <li>• QR codes on tourist materials</li>
                <li>• Social media sharing</li>
                <li>• Google search results</li>
                <li>• Tourism office recommendations</li>
              </ul>
            </div>
            <div className="pt-2">
              <Badge className="bg-blue-600 text-white">No App Store Fees</Badge>
              <Badge className="bg-green-600 text-white ml-2">Instant Updates</Badge>
            </div>
          </CardContent>
        </Card>

        {/* App Store Distribution */}
        <Card className="bg-slate-700 border-slate-600">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Store className="h-5 w-5 text-purple-400" />
              <CardTitle className="text-slate-100">App Stores</CardTitle>
              <Badge variant="outline" className="border-slate-500 text-slate-300">Optional</Badge>
            </div>
            <CardDescription className="text-slate-300">
              Native mobile app distribution
            </CardDescription>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-200">Platforms:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Apple App Store (iOS)</li>
                <li>• Google Play Store (Android)</li>
                <li>• Requires app conversion</li>
                <li>• Store approval process</li>
                <li>• 30% store commission</li>
              </ul>
            </div>
            <div className="pt-2">
              <Badge className="bg-yellow-600 text-white">Higher Visibility</Badge>
              <Badge className="bg-red-600 text-white ml-2">30% Fees</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Marketing Strategies */}
      <Card className="bg-slate-700 border-slate-600">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <Share2 className="h-5 w-5 text-green-400" />
            Marketing & Discovery Strategies
          </CardTitle>
        </CardHeader>
        <CardContent className="text-slate-300">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <h4 className="font-semibold text-slate-200 mb-2">Local Tourism</h4>
              <ul className="text-sm space-y-1">
                <li>• Hotel partnerships</li>
                <li>• Tourist information centers</li>
                <li>• Restaurant recommendations</li>
                <li>• Travel agency listings</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 mb-2">Digital Marketing</h4>
              <ul className="text-sm space-y-1">
                <li>• SEO optimization</li>
                <li>• Social media campaigns</li>
                <li>• Travel blog features</li>
                <li>• Google Ads</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 mb-2">Physical Presence</h4>
              <ul className="text-sm space-y-1">
                <li>• QR codes on signs</li>
                <li>• Brochures & flyers</li>
                <li>• Airport displays</li>
                <li>• Border crossing info</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Advantages */}
      <Card className="bg-green-900 border-green-700">
        <CardHeader>
          <CardTitle className="text-green-100">Your Current Web App Advantages</CardTitle>
        </CardHeader>
        <CardContent className="text-green-200">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span className="text-sm">No download required - instant access</span>
            </div>
            <div className="flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              <span className="text-sm">Easy sharing via QR codes</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="text-sm">Works on all devices</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              <span className="text-sm">Mobile-optimized interface</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppDistribution;