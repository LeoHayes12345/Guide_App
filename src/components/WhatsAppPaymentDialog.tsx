import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Correctly load the Stripe key
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "";
const stripePromise = loadStripe(stripeKey);

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

const CheckoutForm = ({ onSuccess }: { onSuccess: () => void; }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [step, setStep] = useState('details');

  // --- DIAGNOSTIC CODE ---
  // This now runs inside the component, which is valid.
  useEffect(() => {
    if (step === 'payment') {
      console.log("Attempting to load Stripe key...");
      if (stripeKey) {
        console.log("VITE_STRIPE_PUBLISHABLE_KEY loaded successfully:", stripeKey.substring(0, 10) + "...");
      } else {
        console.error("CRITICAL ERROR: VITE_STRIPE_PUBLISHABLE_KEY is not defined!");
      }
    }
  }, [step]);
  // --- END DIAGNOSTIC CODE ---

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setStep('payment');
    } else {
      toast({ title: "Missing Information", description: "Please enter your name and email.", variant: "destructive" });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements || !elements.getElement(CardElement)) {
      toast({ title: "Payment form not ready", description: "Please wait a moment and try again.", variant: "destructive" });
      setIsProcessing(false);
      return;
    }

    try {
      const { data: paymentData, error: functionError } = await supabase.functions.invoke('create-payment-intent', {
        body: { amount: 299, name: formData.name, email: formData.email },
      });

      if (functionError) throw new Error(`Payment processing error. Please try again.`);
      if (!paymentData.client_secret) throw new Error("Failed to initialize payment.");

      const { error: confirmError } = await stripe.confirmCardPayment(
        paymentData.client_secret,
        { payment_method: { card: elements.getElement(CardElement)!, billing_details: { name: formData.name, email: formData.email } } }
      );

      if (confirmError) throw new Error(confirmError.message);

      toast({ title: "Payment Successful!", description: "You will be redirected shortly." });
      onSuccess();
    } catch (error: any) {
      toast({ title: "Payment Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  if (step === 'details') {
    return (
      <form onSubmit={handleContinue} className="space-y-4">
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
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardHeader>
        <CardTitle>Secure Payment</CardTitle>
        <CardDescription>Enter your card details below. Price: €2.99</CardDescription>
        <div style={{ padding: '4px', marginTop: '8px', borderRadius: '4px', backgroundColor: stripeKey ? '#e6fffa' : '#ffebee', color: stripeKey ? '#2c7a7b' : '#c53030', border: `1px solid ${stripeKey ? '#b2f5ea' : '#f56565'}` }}>
          {stripeKey ? '✅ Stripe Key Loaded' : '❌ Stripe Key NOT Loaded'}
        </div>
      </CardHeader>
      <CardContent>
        <div className="p-4 border rounded-md bg-gray-50">
          <CardElement options={cardElementOptions} />
        </div>
        <Button type="submit" disabled={!stripe || isProcessing} className="w-full mt-4">
          {isProcessing ? 'Processing...' : 'Pay €2.99'}
        </Button>
      </CardContent>
    </form>
  );
};

export const WhatsAppPaymentDialog: React.FC<WhatsAppPaymentDialogProps> = ({ isOpen, onClose, onSuccess }) => {
  if (!stripeKey) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader><DialogTitle>Configuration Error</DialogTitle></DialogHeader>
          <p className="text-red-600 p-4">The payment system is not configured correctly. The Stripe publishable key is missing. Please contact support.</p>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <Elements stripe={stripePromise}>
          <CheckoutForm onSuccess={onSuccess} />
        </Elements>
      </DialogContent>
    </Dialog>
  );
};
