import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// --- DIAGNOSTIC CODE START ---
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
console.log("Attempting to load Stripe key...");
if (stripeKey) {
  console.log("VITE_STRIPE_PUBLISHABLE_KEY loaded successfully:", stripeKey.substring(0, 10) + "...");
} else {
  console.error("CRITICAL ERROR: VITE_STRIPE_PUBLISHABLE_KEY is not defined!");
}
// --- DIAGNOSTIC CODE END ---

const stripePromise = loadStripe(stripeKey || "");

interface WhatsAppPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const cardElementOptions = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const CheckoutForm = ({ onSuccess, onClose }: { onSuccess: () => void; onClose: () => void; }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [step, setStep] = useState('details'); // 'details' or 'payment'

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setStep('payment');
    } else {
      toast({
        title: "Missing Information",
        description: "Please enter your name and email.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      toast({ title: "Stripe not loaded", variant: "destructive" });
      setIsProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast({ title: "Card element not found", variant: "destructive" });
      setIsProcessing(false);
      return;
    }

    try {
      const { data: paymentData, error: functionError } = await supabase.functions.invoke('create-payment-intent', {
        body: { amount: 299, name: formData.name, email: formData.email },
      });

      if (functionError) throw new Error(`Edge function error: ${functionError.message}`);
      if (!paymentData.client_secret) throw new Error("Failed to get client secret from server.");

      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
        paymentData.client_secret,
        {
          payment_method: {
            card: cardElement,
            billing_details: { name: formData.name, email: formData.email },
          },
        }
      );

      if (confirmError) {
        throw new Error(confirmError.message || "An unknown payment error occurred.");
      }

      if (paymentIntent?.status === 'succeeded') {
        toast({ title: "Payment Successful!", description: "You will be redirected shortly." });
        onSuccess();
      } else {
        throw new Error(`Payment failed with status: ${paymentIntent?.status}`);
      }
    } catch (error: any) {
      console.error("Payment processing error:", error);
      toast({
        title: "Payment Failed",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={step === 'payment' ? handleSubmit : handleContinue}>
      {step === 'details' ? (
        <div className="space-y-4">
          <CardHeader>
            <CardTitle>Your Details</CardTitle>
            <CardDescription>Enter your name and email to proceed.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleInputChange} required />
            </div>
            <Button type="submit" className="w-full">Continue to Payment</Button>
          </CardContent>
        </div>
      ) : (
        <div className="space-y-4">
          <CardHeader>
            <CardTitle>Secure Payment</CardTitle>
            <CardDescription>Enter your card details below. Price: €2.99</CardDescription>
            {/* --- DIAGNOSTIC UI START --- */}
            <div style={{
              padding: '4px',
              marginTop: '8px',
              borderRadius: '4px',
              backgroundColor: stripeKey ? '#e6fffa' : '#ffebee',
              color: stripeKey ? '#2c7a7b' : '#c53030',
              border: `1px solid ${stripeKey ? '#b2f5ea' : '#f56565'}`
            }}>
              {stripeKey ? '✅ Stripe Key Loaded' : '❌ Stripe Key NOT Loaded'}
            </div>
            {/* --- DIAGNOSTIC UI END --- */}
          </CardHeader>
          <CardContent>
            <div className="p-4 border rounded-md bg-gray-50">
              <CardElement options={cardElementOptions} />
            </div>
            <Button type="submit" disabled={!stripe || isProcessing} className="w-full mt-4">
              {isProcessing ? 'Processing...' : 'Pay €2.99'}
            </Button>
          </CardContent>
        </div>
      )}
    </form>
  );
};

export const WhatsAppPaymentDialog: React.FC<WhatsAppPaymentDialogProps> = ({ isOpen, onClose, onSuccess }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Complete Your Purchase</DialogTitle>
        </DialogHeader>
        <Elements stripe={stripePromise}>
          <CheckoutForm onSuccess={onSuccess} onClose={onClose} />
        </Elements>
      </DialogContent>
    </Dialog>
  );
};
