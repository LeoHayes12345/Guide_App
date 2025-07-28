import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { stripePromise } from '@/lib/stripe';
import { CreditCard, AlertCircle, Smartphone } from 'lucide-react';

interface StripePaymentProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const StripePayment: React.FC<StripePaymentProps> = ({ onSuccess, onCancel }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      console.log('Creating payment intent with data:', {
        amount: 299,
        currency: 'eur',
        customer_email: email,
        customer_name: name
      });
      
      // Create payment intent via Supabase edge function
      const { data, error: functionError } = await supabase.functions.invoke('create-payment-intent', {
        body: {
          amount: 299, // €2.99 in cents
          currency: 'eur',
          customer_email: email,
          customer_name: name
        }
      });

      console.log('Payment intent response:', { data, functionError });

      if (functionError) {
        console.error('Supabase function error:', functionError);
        throw new Error(`Payment setup failed: ${functionError.message}`);
      }

      if (data?.error) {
        console.error('Stripe API error:', data.error);
        throw new Error(`Stripe error: ${data.error}`);
      }

      if (!data || !data.sessionId) {
        console.error('Invalid response data:', data);
        throw new Error('Payment session could not be created. Please check your payment configuration.');
      }

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Payment system failed to load. Please refresh and try again.');
      }

      console.log('Redirecting to Stripe checkout with session:', data.sessionId);

      // Redirect to Stripe Checkout
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId
      });

      if (stripeError) {
        console.error('Stripe redirect error:', stripeError);
        throw new Error(`Payment redirect failed: ${stripeError.message}`);
      }

    } catch (err: any) {
      console.error('Payment processing error:', err);
      setError(err.message || 'Payment failed. Please try again or contact support.');
    } finally {
      setIsProcessing(false);
    }
  };

  const isFormValid = email && name && email.includes('@');

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-blue-50">
        <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Premium Features
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Live WhatsApp chat support</li>
          <li>• Priority customer service</li>
          <li>• Exclusive travel tips</li>
        </ul>
        <div className="mt-3 text-lg font-bold text-blue-800">€2.99</div>
      </Card>

      <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-green-600" />
          Secure Payment Options
        </h4>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center p-2 bg-white rounded-lg border">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mb-1">
              <span className="text-white text-xs font-bold">🍎</span>
            </div>
            <span className="text-xs text-gray-600">Apple Pay</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-white rounded-lg border">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mb-1">
              <span className="text-white text-xs font-bold">G</span>
            </div>
            <span className="text-xs text-gray-600">Google Pay</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-white rounded-lg border">
            <CreditCard className="w-8 h-8 text-gray-600 mb-1" />
            <span className="text-xs text-gray-600">Credit Card</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Choose your preferred payment method at checkout
        </p>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Smith"
            required
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            required
          />
        </div>

        {error && (
          <div className="flex items-start gap-2 text-red-600 text-sm p-3 bg-red-50 rounded-md">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <div>{error}</div>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isFormValid || isProcessing}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
             {isProcessing ? 'Processing...' : 'Continue to Payment - €2.99'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StripePayment;