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
          country: 'AL', // Albania for Tropoja
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
          console.log('Payment methods available:', result);
          if (result) {
            setCanMakePayment({
              applePay: result.applePay || false,
              googlePay: result.googlePay || false
            });
            setPaymentRequest(pr);
          }
        }).catch((error: any) => {
          console.log('Payment request not supported:', error);
          setCanMakePayment({
            applePay: false,
            googlePay: false
          });
        });

        // Handle payment method
        pr.on('paymentmethod', async (ev: any) => {
          setIsProcessing(true);
          
          try {
            console.log('Payment method selected:', ev.paymentMethod);
            
            // Create payment intent via Supabase Edge Function
            const { data: paymentData, error: paymentError } = await supabase.functions.invoke('create-payment-intent', {
              body: {
                amount: 299,
                currency: 'eur',
                customer_email: ev.payerEmail || formData.email || 'customer@example.com',
                customer_name: ev.payerName || formData.name || 'Customer',
                payment_method_types: ['card', 'apple_pay', 'google_pay'],
                mode: 'payment_intent'
              }
            });

            if (paymentError) {
              console.error('Payment intent creation failed:', paymentError);
              throw paymentError;
            }

            console.log('Payment intent created:', paymentData);

            // Confirm payment with Stripe (use confirmPayment for Apple Pay/Google Pay)
            const { error: confirmError } = await stripeInstance.confirmPayment({
              elements: null,
              clientSecret: paymentData.client_secret,
              confirmParams: {
                payment_method: ev.paymentMethod.id,
                return_url: window.location.origin + '/?payment=success'
              },
              redirect: 'if_required'
            });

            if (confirmError) {
              console.error('Payment confirmation failed:', confirmError);
              ev.complete('fail');
              throw confirmError;
            }

            // Store WhatsApp access in database
            const { error: dbError } = await supabase
              .from('premium_users')
              .upsert({
                email: ev.payerEmail || formData.email || 'customer@example.com',
                name: ev.payerName || formData.name || 'Customer',
                subscription_type: 'whatsapp_chat',
                payment_status: 'completed',
                stripe_payment_intent_id: paymentData?.payment_intent_id,
                created_at: new Date().toISOString()
              });

            if (dbError) {
              console.error('Database error:', dbError);
              // Don't fail the payment for database errors
            }

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
  }, [isOpen, onSuccess, onClose, toast]);

  const handleApplePayClick = () => {
    console.log('Apple Pay clicked', { paymentRequest, canMakePayment });
    if (paymentRequest && canMakePayment.applePay) {
      paymentRequest.show();
    } else {
      toast({
        title: 'Apple Pay Not Available',
        description: 'Apple Pay is not available on this device or browser. Please use Safari on an Apple device.',
        variant: 'destructive'
      });
    }
  };

  const handleGooglePayClick = () => {
    console.log('Google Pay clicked', { paymentRequest, canMakePayment });
    if (paymentRequest && canMakePayment.googlePay) {
      paymentRequest.show();
    } else {
      toast({
        title: 'Google Pay Not Available',
        description: 'Google Pay is not available on this device or browser. Please use Chrome on an Android device.',
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
                  className={`w-full mb-3 h-12 rounded-lg border-2 transition-all ${
                    canMakePayment.applePay 
                      ? 'bg-black hover:bg-gray-800 text-white border-black' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <span className="font-medium">Apple Pay</span>
                  </div>
                </Button>

                {/* Google Pay Button */}
                <Button
                  onClick={handleGooglePayClick}
                  disabled={!canMakePayment.googlePay || isProcessing}
                  className={`w-full mb-3 h-12 rounded-lg border-2 transition-all ${
                    canMakePayment.googlePay 
                      ? 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300 shadow-sm' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="font-medium">Google Pay</span>
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
                  className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-lg"
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

