import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageCircle, Check, CreditCard } from 'lucide-react';
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
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [canMakePayment, setCanMakePayment] = useState({
    applePay: false,
    googlePay: false
  });
  const { toast } = useToast();

  // Initialize Stripe and Payment Request API
  useEffect(() => {
    const initializeStripe = async () => {
      const stripeInstance = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      setStripe(stripeInstance);

      if (stripeInstance) {
        const pr = stripeInstance.paymentRequest({
          country: 'US',
          currency: 'eur',
          total: {
            label: 'WhatsApp Live Chat Access',
            amount: 299, // €2.99 in cents
          },
          requestPayerName: true,
          requestPayerEmail: true,
        });

        // Check if Apple Pay and Google Pay are available
        pr.canMakePayment().then((result: any) => {
          if (result) {
            setCanMakePayment({
              applePay: result.applePay || false,
              googlePay: result.googlePay || false
            });
            setPaymentRequest(pr);
          }
        });

        // Handle payment method
        pr.on('paymentmethod', async (ev: any) => {
          setIsProcessing(true);
          
          try {
            // Create payment intent via Supabase Edge Function
            const { data: paymentData, error: paymentError } = await supabase.functions.invoke('create-payment-intent', {
              body: {
                amount: 299,
                currency: 'eur',
                customer_email: ev.payerEmail || formData.email,
                customer_name: ev.payerName || formData.name,
                payment_method_types: ['card', 'apple_pay', 'google_pay']
              }
            });

            if (paymentError) throw paymentError;

            // Confirm payment with Stripe
            const { error: confirmError } = await stripeInstance.confirmCardPayment(
              paymentData.client_secret,
              { payment_method: ev.paymentMethod.id },
              { handleActions: false }
            );

            if (confirmError) {
              ev.complete('fail');
              throw confirmError;
            }

            // Store WhatsApp access in database
            const { error: dbError } = await supabase
              .from('premium_users')
              .upsert({
                email: ev.payerEmail || formData.email,
                name: ev.payerName || formData.name,
                subscription_type: 'whatsapp_chat',
                payment_status: 'completed',
                stripe_customer_id: paymentData?.customer_id,
                created_at: new Date().toISOString()
              });

            if (dbError) throw dbError;

            ev.complete('success');
            setPaymentStep('success');
            
            toast({
              title: 'Payment Successful!',
              description: 'You now have access to WhatsApp Live Chat.',
            });

            setTimeout(() => {
              onSuccess();
              onClose();
            }, 2000);

          } catch (error) {
            console.error('Payment error:', error);
            ev.complete('fail');
            toast({
              title: 'Payment Failed',
              description: 'There was an error processing your payment. Please try again.',
              variant: 'destructive'
            });
          } finally {
            setIsProcessing(false);
          }
        });
      }
    };

    if (isOpen) {
      initializeStripe();
    }
  }, [isOpen, formData.email, formData.name, onSuccess, onClose, toast]);

  const handleApplePayClick = () => {
    if (paymentRequest && canMakePayment.applePay) {
      paymentRequest.show();
    } else {
      toast({
        title: 'Apple Pay Not Available',
        description: 'Apple Pay is not available on this device or browser.',
        variant: 'destructive'
      });
    }
  };

  const handleGooglePayClick = () => {
    if (paymentRequest && canMakePayment.googlePay) {
      paymentRequest.show();
    } else {
      toast({
        title: 'Google Pay Not Available',
        description: 'Google Pay is not available on this device or browser.',
        variant: 'destructive'
      });
    }
  };

  const handleStripeCheckout = async () => {
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
      // Create Stripe Checkout session
      const { data: sessionData, error: sessionError } = await supabase.functions.invoke('create-payment-intent', {
        body: {
          amount: 299,
          currency: 'eur',
          customer_email: formData.email,
          customer_name: formData.name,
          payment_method_types: ['card', 'apple_pay', 'google_pay'],
          mode: 'checkout' // Use Stripe Checkout instead of Payment Intent
        }
      });

      if (sessionError) throw sessionError;

      // Redirect to Stripe Checkout
      if (stripe && sessionData.checkout_url) {
        window.location.href = sessionData.checkout_url;
      }

    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: 'Checkout Failed',
        description: 'There was an error starting the checkout process. Please try again.',
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
                <h4 className="font-semibold text-gray-800 mb-3 text-center">Choose Your Payment Method</h4>
                
                {/* Apple Pay Button */}
                <Button
                  onClick={handleApplePayClick}
                  disabled={!canMakePayment.applePay || isProcessing}
                  className={`w-full mb-3 h-12 ${
                    canMakePayment.applePay 
                      ? 'bg-black hover:bg-gray-800 text-white' 
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg">🍎</span>
                    <span className="font-semibold">Pay with Apple Pay</span>
                  </div>
                </Button>

                {/* Google Pay Button */}
                <Button
                  onClick={handleGooglePayClick}
                  disabled={!canMakePayment.googlePay || isProcessing}
                  className={`w-full mb-3 h-12 ${
                    canMakePayment.googlePay 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">G</span>
                    </div>
                    <span className="font-semibold">Pay with Google Pay</span>
                  </div>
                </Button>

                <div className="flex items-center gap-3 my-3">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="text-sm text-gray-500">or</span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* Credit Card Button */}
                <Button
                  onClick={() => setPaymentStep('payment')}
                  className="w-full h-12 bg-green-600 hover:bg-green-700 text-white"
                >
                  <div className="flex items-center justify-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    <span className="font-semibold">Pay with Credit Card</span>
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
                <CreditCard className="h-5 w-5" />
                Payment Details
              </CardTitle>
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
                  onClick={handleStripeCheckout} 
                  disabled={isProcessing}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {isProcessing ? 'Processing...' : 'Continue to Stripe Checkout'}
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

