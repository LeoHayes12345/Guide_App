import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageCircle, Check, CreditCard, Smartphone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';

interface WhatsAppPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// Stripe Elements styling
const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
      padding: '12px',
    },
    invalid: {
      color: '#9e2146',
    },
  },
  hidePostalCode: false,
};

// Payment Form Component
const PaymentForm: React.FC<{
  formData: { email: string; name: string };
  onSuccess: () => void;
  onClose: () => void;
}> = ({ formData, onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [canMakePayment, setCanMakePayment] = useState(false);
  const { toast } = useToast();

  // Initialize Payment Request API for Apple Pay/Google Pay
  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'eur',
        total: {
          label: 'WhatsApp Live Chat Access',
          amount: 299, // €2.99 in cents
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      // Check if Apple Pay or Google Pay is available
      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
          setCanMakePayment(true);
        }
      });

      // Handle payment method from Apple Pay/Google Pay
      pr.on('paymentmethod', async (ev) => {
        setIsProcessing(true);
        
        try {
          // Create payment intent
          const { data: paymentData, error: paymentError } = await supabase.functions.invoke('create-payment-intent', {
            body: {
              amount: 299,
              currency: 'eur',
              customer_email: ev.payerEmail || formData.email,
              customer_name: ev.payerName || formData.name,
              payment_method_types: ['card'],
              mode: 'payment_intent'
            }
          });

          if (paymentError) throw paymentError;

          // Confirm payment
          const { error: confirmError } = await stripe.confirmCardPayment(
            paymentData.client_secret,
            { payment_method: ev.paymentMethod.id },
            { handleActions: false }
          );

          if (confirmError) {
            ev.complete('fail');
            throw confirmError;
          }

          ev.complete('success');
          
          // Store in database
          await supabase.from('premium_users').upsert({
            email: ev.payerEmail || formData.email,
            name: ev.payerName || formData.name,
            subscription_type: 'whatsapp_chat',
            payment_status: 'completed',
            stripe_payment_intent_id: paymentData.payment_intent_id,
            created_at: new Date().toISOString()
          });

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
  }, [stripe, formData, onSuccess, onClose, toast]);

  const handleCardPayment = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error('Card element not found');

      // Create payment intent
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke('create-payment-intent', {
        body: {
          amount: 299,
          currency: 'eur',
          customer_email: formData.email,
          customer_name: formData.name,
          payment_method_types: ['card'],
          mode: 'payment_intent'
        }
      });

      if (paymentError) throw paymentError;

      // Confirm payment with card
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
        paymentData.client_secret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: formData.name,
              email: formData.email,
            },
          },
        }
      );

      if (confirmError) {
        throw confirmError;
      }

      if (paymentIntent.status === 'succeeded') {
        // Store in database
        await supabase.from('premium_users').upsert({
          email: formData.email,
          name: formData.name,
          subscription_type: 'whatsapp_chat',
          payment_status: 'completed',
          stripe_payment_intent_id: paymentIntent.id,
          created_at: new Date().toISOString()
        });

        toast({
          title: 'Payment Successful!',
          description: 'You now have access to WhatsApp Live Chat.',
        });

        setTimeout(() => {
          onSuccess();
          onClose();
        }, 2000);
      }

    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment Failed',
        description: error.message || 'There was an error processing your payment. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Payment Details
        </CardTitle>
        <CardDescription>
          Complete your payment to unlock WhatsApp Live Chat access
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Apple Pay / Google Pay Button */}
        {paymentRequest && canMakePayment && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Smartphone className="w-4 h-4" />
              <span>Quick Payment</span>
            </div>
            <PaymentRequestButtonElement 
              options={{ paymentRequest }}
              className="PaymentRequestButton"
            />
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-sm text-gray-500">or pay with card</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>
          </div>
        )}

        {/* Card Payment Form */}
        <form onSubmit={handleCardPayment} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card-element">Card Information</Label>
            <div className="p-3 border rounded-md bg-white">
              <CardElement 
                id="card-element"
                options={cardElementOptions}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Cardholder Name</Label>
              <Input 
                value={formData.name} 
                disabled 
                className="bg-gray-50"
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input 
                value={formData.email} 
                disabled 
                className="bg-gray-50"
              />
            </div>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg text-sm">
            <div className="flex items-center gap-2 text-blue-800 font-medium mb-1">
              <CreditCard className="w-4 h-4" />
              Secure Payment
            </div>
            <p className="text-blue-700">
              Your payment is secured by Stripe with 256-bit SSL encryption
            </p>
          </div>

          <Button 
            type="submit" 
            disabled={!stripe || isProcessing}
            className="w-full bg-green-600 hover:bg-green-700 text-white h-12"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing Payment...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                <span>Pay €2.99</span>
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const WhatsAppPaymentDialog: React.FC<WhatsAppPaymentDialogProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [paymentStep, setPaymentStep] = useState<'details' | 'payment' | 'success'>('details');
  const [formData, setFormData] = useState({
    email: '',
    name: ''
  });
  const [stripePromise] = useState(() => loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY));

  const resetDialog = () => {
    setPaymentStep('details');
    setFormData({
      email: '',
      name: ''
    });
  };

  const handleContinueToPayment = () => {
    if (!formData.email || !formData.name) {
      return;
    }
    setPaymentStep('payment');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        resetDialog();
      }
    }}>
      <DialogContent className="sm:max-w-lg">
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

              <div className="space-y-4">
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
              </div>

              <div className="text-center py-4">
                <div className="text-3xl font-bold text-green-600">€2.99</div>
                <div className="text-sm text-gray-600">One-time payment • 30 days access</div>
              </div>

              <Button 
                onClick={handleContinueToPayment}
                disabled={!formData.email || !formData.name}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12"
              >
                Continue to Payment
              </Button>
            </CardContent>
          </Card>
        )}

        {paymentStep === 'payment' && (
          <Elements stripe={stripePromise}>
            <PaymentForm 
              formData={formData}
              onSuccess={onSuccess}
              onClose={onClose}
            />
          </Elements>
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

