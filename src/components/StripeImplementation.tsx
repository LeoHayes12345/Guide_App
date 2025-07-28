import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Code, Terminal, Webhook, Key, CheckCircle, ExternalLink } from 'lucide-react';

const StripeImplementation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Create Stripe Account",
      icon: <Key className="h-5 w-5" />,
      description: "Sign up for a Stripe account to get started",
      details: [
        "Visit stripe.com and click 'Start now'",
        "Complete business verification",
        "Add bank account for payouts",
        "Enable your account for live payments"
      ],
      code: null,
      link: "https://dashboard.stripe.com/register"
    },
    {
      title: "Get API Keys",
      icon: <Terminal className="h-5 w-5" />,
      description: "Retrieve your publishable and secret keys",
      details: [
        "Go to Stripe Dashboard > Developers > API keys",
        "Copy your Publishable key (starts with pk_)",
        "Copy your Secret key (starts with sk_)",
        "Use test keys for development, live keys for production"
      ],
      code: `// Add to your .env file
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...`,
      link: "https://dashboard.stripe.com/apikeys"
    },
    {
      title: "Install Stripe SDK",
      icon: <Code className="h-5 w-5" />,
      description: "Add Stripe libraries to your project",
      details: [
        "Install @stripe/stripe-js for frontend",
        "Install stripe for backend/edge functions",
        "Set up Stripe configuration"
      ],
      code: `npm install @stripe/stripe-js stripe

// Frontend setup (src/lib/stripe.ts)
import { loadStripe } from '@stripe/stripe-js';
export const stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);`,
      link: null
    },
    {
      title: "Create Payment Intent",
      icon: <Code className="h-5 w-5" />,
      description: "Set up server-side payment processing",
      details: [
        "Create Supabase edge function for payments",
        "Generate payment intent with amount",
        "Return client secret to frontend",
        "Handle payment confirmation"
      ],
      code: `// Supabase Edge Function
import Stripe from 'stripe';
const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!);

const paymentIntent = await stripe.paymentIntents.create({
  amount: 999, // $9.99 in cents
  currency: 'usd',
  metadata: { userId: 'user_123' }
});`,
      link: null
    },
    {
      title: "Set Up Webhooks",
      icon: <Webhook className="h-5 w-5" />,
      description: "Handle payment confirmations securely",
      details: [
        "Create webhook endpoint in Stripe Dashboard",
        "Listen for payment_intent.succeeded events",
        "Update user premium status in database",
        "Send confirmation email to user"
      ],
      code: `// Webhook handler
const sig = req.headers.get('stripe-signature');
const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

if (event.type === 'payment_intent.succeeded') {
  // Update user to premium status
}`,
      link: "https://dashboard.stripe.com/webhooks"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Stripe Payment Integration</h1>
        <p className="text-gray-600">Complete guide to implementing Stripe payments</p>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-2">
          {steps.map((_, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                index <= currentStep ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {index < currentStep ? <CheckCircle className="h-4 w-4" /> : index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 ${index < currentStep ? 'bg-green-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current step */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {steps[currentStep].icon}
              <div>
                <CardTitle className="text-xl">{steps[currentStep].title}</CardTitle>
                <p className="text-gray-600 mt-1">{steps[currentStep].description}</p>
              </div>
            </div>
            <Badge variant="outline">Step {currentStep + 1} of {steps.length}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-3">Implementation Details:</h4>
            <ul className="space-y-2">
              {steps[currentStep].details.map((detail, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          {steps[currentStep].code && (
            <div>
              <h4 className="font-semibold mb-2">Code Example:</h4>
              <pre className="bg-gray-100 p-3 rounded-lg text-sm overflow-x-auto">
                <code>{steps[currentStep].code}</code>
              </pre>
            </div>
          )}

          {steps[currentStep].link && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href={steps[currentStep].link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in Stripe Dashboard
                </a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Previous Step
        </Button>
        <Button 
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1}
        >
          Next Step
        </Button>
      </div>

      {/* Cost breakdown */}
      <Card className="bg-blue-50">
        <CardHeader>
          <CardTitle className="text-lg">Stripe Pricing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold">Standard Pricing</h4>
              <p className="text-sm text-gray-600">2.9% + 30¢ per successful charge</p>
            </div>
            <div>
              <h4 className="font-semibold">Example: $9.99 Premium</h4>
              <p className="text-sm text-gray-600">Fee: $0.59 | You receive: $9.40</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StripeImplementation;