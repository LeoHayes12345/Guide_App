import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageCircle, Check, CreditCard, Link } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { loadStripe } from '@stripe/stripe-js';

interface WhatsAppPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const WhatsAppPaymentDialog: React.FC<WhatsAppPaymentDialogProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'details' | 'payment' | 'success'>('details');
  const [formData, setFormData] = useState({
    email: '',
    name: ''
  });
  const [stripe, setStripe] = useState<any>(null);
  const { toast } = useToast();

  // Initialize Stripe
  useEffect(() => {
    const initializeStripe = async () => {
      const stripeInstance = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      setStripe(stripeInstance);
    };

    if (isOpen) {
      initializeStripe();
    }
  }, [isOpen]);

  const handleStripeLinkPayment = async () => {
    if (!formData.email || !formData.name) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in your name and email.',
        variant: 'destructive'
      });
      return;
    }

    setIsProcessing(true);

    try {
      console.log('Creating Stripe Link checkout session...');
      
      // Create Stripe Checkout session with Link enabled
      const { data: sessionData, error: sessionError } = await supabase.functions.invoke('create-payment-intent', {
        body: {
          amount: 299,
          currency: 'eur',
          customer_email: formData.email,
          customer_name: formData.name,
          payment_method_types: ['card', 'link'],
          mode: 'checkout',
          enable_link: true
        }
      });

      if (sessionError) {
        console.error('Checkout session creation failed:', sessionError);
        throw sessionError;
      }

      console.log('Checkout session created:', sessionData);

      // Redirect to Stripe Checkout with Link enabled
      if (stripe && sessionData.checkout_url) {
        window.location.href = sessionData.checkout_url;
      } else {
        throw new Error('No checkout URL received');
      }

    } catch (error) {
      console.error('Stripe Link payment error:', error);
      toast({
        title: 'Payment Failed',
        description: 'There was an error starting the payment process. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const resetDialog = () => {
    setPaymentStep('details');
    setFormData({
      email: '',
      name: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        resetDialog();
      }
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-green-600" />
            WhatsApp Live Chat Access
          </DialogTitle>
        </DialogHeader>

        {paymentStep === 'details' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Unlock WhatsApp Live Chat</CardTitle>
              <CardDescription>
                Get instant access to live chat with our local Tropoja experts via WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">What you get:</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Direct WhatsApp access to local guides</li>
                  <li>• Real-time responses during business hours</li>
                  <li>• Personalized recommendations</li>
                  <li>• Photo sharing for location help</li>
                  <li>• 30-day access period</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border">
                <h4 className="font-semibold text-gray-800 mb-3 text-center">Secure Payment with Stripe Link</h4>
                
                {/* Stripe Link Payment Button */}
                <div className="bg-white p-4 rounded-lg border-2 border-blue-200 mb-4">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <Link className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-gray-800">Stripe Link</span>
                    </div>
                    <div className="bg-blue-100 px-2 py-1 rounded-full">
                      <span className="text-xs font-medium text-blue-800">Recommended</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 text-center mb-3">
                    One-click payments • Secure • Works everywhere
                  </p>
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <span>💳 Credit Cards</span>
                    <span>•</span>
                    <span>🍎 Apple Pay</span>
                    <span>•</span>
                    <span>📱 Google Pay</span>
                  </div>
                </div>

                <Button 
                  onClick={() => setPaymentStep('payment')} 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-lg"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Link className="w-5 h-5" />
                    <span className="font-semibold">Continue with Stripe Link</span>
                  </div>
                </Button>
              </div>
              
              <div className="text-center py-4">
                <div className="text-3xl font-bold text-green-600">€2.99</div>
                <div className="text-sm text-gray-600">One-time payment • 30 days access</div>
              </div>
            </CardContent>
          </Card>
        )}

        {paymentStep === 'payment' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="h-5 w-5 text-blue-600" />
                Payment Details
              </CardTitle>
              <CardDescription>
                Enter your details to continue with Stripe Link checkout
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="john@example.com"
                />
                <p className="text-xs text-gray-500">
                  We'll use this email for your Stripe Link account and payment receipts
                </p>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Link className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Stripe Link Benefits</span>
                </div>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Save payment methods for future purchases</li>
                  <li>• One-click checkout on any site that accepts Link</li>
                  <li>• Secure encryption and fraud protection</li>
                </ul>
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setPaymentStep('details')}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  onClick={handleStripeLinkPayment} 
                  disabled={isProcessing}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Link className="w-4 h-4" />
                      <span>Pay €2.99 with Link</span>
                    </div>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {paymentStep === 'success' && (
          <Card>
            <CardContent className="pt-6 text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold">Payment Successful!</h3>
              <p className="text-gray-600">
                You now have access to WhatsApp Live Chat. Check your chat widget for the WhatsApp button.
              </p>
              <div className="bg-green-50 p-3 rounded-lg text-sm text-green-700">
                WhatsApp Number: +355 123 456 789
              </div>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppPaymentDialog;

