import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Smartphone, CreditCard, Globe, Users, CheckCircle } from 'lucide-react';

interface AccountSetupProps {
  onClose: () => void;
}

const AccountSetup: React.FC<AccountSetupProps> = ({ onClose }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const paymentOptions = [
    {
      id: 'stripe',
      name: 'Stripe Payment Processing',
      description: 'Accept credit cards, Apple Pay, Google Pay',
      features: ['2.9% + 30¢ per transaction', 'Instant payouts', 'Global coverage', 'Built-in fraud protection'],
      icon: <CreditCard className="h-6 w-6" />,
      recommended: true
    },
    {
      id: 'app-store',
      name: 'App Store In-App Purchase',
      description: 'Native iOS/Android app payments',
      features: ['30% Apple/Google fee', 'App Store approval required', 'Native user experience', 'Automatic receipts'],
      icon: <Smartphone className="h-6 w-6" />
    },
    {
      id: 'paypal',
      name: 'PayPal Integration',
      description: 'PayPal and credit card processing',
      features: ['2.9% + fixed fee', 'PayPal buyer protection', 'Global reach', 'Easy integration'],
      icon: <Globe className="h-6 w-6" />
    }
  ];

  const implementationSteps = {
    stripe: [
      'Create Stripe account at stripe.com',
      'Get API keys from Stripe dashboard',
      'Install Stripe SDK in your app',
      'Implement payment processing',
      'Set up webhooks for payment confirmation'
    ],
    'app-store': [
      'Convert web app to native iOS/Android',
      'Set up App Store Connect account',
      'Configure in-app purchases',
      'Submit app for review',
      'Handle App Store approval process'
    ],
    paypal: [
      'Create PayPal Business account',
      'Get PayPal API credentials',
      'Install PayPal SDK',
      'Implement PayPal checkout',
      'Set up payment notifications'
    ]
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Set Up Premium Payments</h1>
        <p className="text-gray-600">Choose how you want to charge users for premium features</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {paymentOptions.map((option) => (
          <Card 
            key={option.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedOption === option.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => setSelectedOption(option.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {option.icon}
                  <CardTitle className="text-lg">{option.name}</CardTitle>
                </div>
                {option.recommended && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Recommended
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600">{option.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {option.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedOption && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Implementation Steps for {paymentOptions.find(o => o.id === selectedOption)?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {implementationSteps[selectedOption as keyof typeof implementationSteps]?.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-sm">{step}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">Current Status</h4>
              <p className="text-sm text-yellow-700">
                Your app currently uses a demo payment system. To accept real payments, 
                you'll need to implement one of the options above.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        {selectedOption && (
          <Button className="bg-blue-600 hover:bg-blue-700">
            Get Started with {paymentOptions.find(o => o.id === selectedOption)?.name}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AccountSetup;