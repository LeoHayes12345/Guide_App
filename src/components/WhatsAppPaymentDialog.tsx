import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface WhatsAppPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface BillingDetails {
  name: string;
  email: string;
  address: {
    line1: string;
    city: string;
    postal_code: string;
    country: string;
    state?: string;
  };
}

// Get Stripe key and create promise
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

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

const countries = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'IE', name: 'Ireland' },
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'SE', name: 'Sweden' },
  { code: 'NO', name: 'Norway' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FI', name: 'Finland' },
];

const PaymentForm: React.FC<{ onSuccess: () => void; formData: { name: string; email: string } }> = ({ onSuccess, formData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [billingAddress, setBillingAddress] = useState({
    line1: '',
    city: '',
    postal_code: '',
    country: '',
    state: ''
  });

  // Diagnostic logging
  useEffect(() => {
    console.log("Stripe key status:", stripeKey ? "✅ Loaded" : "❌ Missing");
    console.log("Stripe instance:", stripe ? "✅ Ready" : "⏳ Loading");
    console.log("Elements instance:", elements ? "✅ Ready" : "⏳ Loading");
  }, [stripe, elements]);

  const handleAddressChange = (field: string, value: string) => {
    setBillingAddress(prev => ({ ...prev, [field]: value }));
  };

  const validateBillingAddress = () => {
    const required = ['line1', 'city', 'postal_code', 'country'];
    const missing = required.filter(field => !billingAddress[field as keyof typeof billingAddress]);
    
    if (missing.length > 0) {
      toast({
        title: "Missing Billing Information",
        description: `Please fill in: ${missing.join(', ').replace(/_/g, ' ')}`,
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateBillingAddress()) {
      return;
    }

    setIsProcessing(true);

    if (!stripe || !elements) {
      toast({ 
        title: "Payment system loading", 
        description: "Please wait a moment and try again.", 
        variant: "destructive" 
      });
      setIsProcessing(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast({ 
        title: "Card element not found", 
        description: "Please refresh the page and try again.", 
        variant: "destructive" 
      });
      setIsProcessing(false);
      return;
    }

    try {
      // Create payment intent
      const { data: paymentData, error: functionError } = await supabase.functions.invoke('create-payment-intent', {
        body: { 
          amount: 299, 
          name: formData.name, 
          email: formData.email 
        },
      });

      if (functionError) {
        console.error("Edge function error:", functionError);
        throw new Error("Payment processing failed. Please try again.");
      }

      if (!paymentData?.client_secret) {
        console.error("No client secret received:", paymentData);
        throw new Error("Payment initialization failed. Please try again.");
      }

      console.log("Payment intent created successfully");

      // Prepare billing details
      const billingDetails: BillingDetails = {
        name: formData.name,
        email: formData.email,
        address: {
          line1: billingAddress.line1,
          city: billingAddress.city,
          postal_code: billingAddress.postal_code,
          country: billingAddress.country,
          ...(billingAddress.state && { state: billingAddress.state })
        }
      };

      // Confirm payment with complete billing details
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
        paymentData.client_secret,
        {
          payment_method: {
            card: cardElement,
            billing_details: billingDetails,
          },
        }
      );

      if (confirmError) {
        console.error("Payment confirmation error:", confirmError);
        throw new Error(confirmError.message || "Payment failed. Please try again.");
      }

      if (paymentIntent?.status === 'succeeded') {
        console.log("Payment succeeded:", paymentIntent.id);
        toast({ 
          title: "Payment Successful!", 
          description: "Thank you for your purchase. You will be redirected shortly." 
        });
        onSuccess();
      } else {
        throw new Error(`Payment failed with status: ${paymentIntent?.status}`);
      }
    } catch (error: any) {
      console.error("Payment processing error:", error);
      toast({
        title: "Payment Failed",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const requiresState = ['US', 'CA', 'AU'].includes(billingAddress.country);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardHeader>
        <CardTitle>Secure Payment</CardTitle>
        <CardDescription>Enter your card and billing details below. Price: €2.99</CardDescription>
        
        {/* Diagnostic indicator */}
        <div style={{ 
          padding: '8px', 
          marginTop: '8px', 
          borderRadius: '4px', 
          backgroundColor: stripeKey ? '#e6fffa' : '#ffebee', 
          color: stripeKey ? '#2c7a7b' : '#c53030', 
          border: `1px solid ${stripeKey ? '#b2f5ea' : '#f56565'}`,
          fontSize: '14px'
        }}>
          {stripeKey ? '✅ Stripe Payment System Ready' : '❌ Stripe Configuration Missing'}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Card Information */}
        <div className="p-4 border rounded-md bg-gray-50">
          <Label className="text-sm font-medium mb-2 block">Card Information</Label>
          <CardElement options={cardElementOptions} />
        </div>

        {/* Billing Address */}
        <div className="space-y-4">
          <Label className="text-sm font-medium">Billing Address</Label>
          
          <div>
            <Label htmlFor="country" className="text-sm">Country</Label>
            <Select value={billingAddress.country} onValueChange={(value) => handleAddressChange('country', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="line1" className="text-sm">Street Address</Label>
            <Input
              id="line1"
              type="text"
              placeholder="123 Main Street"
              value={billingAddress.line1}
              onChange={(e) => handleAddressChange('line1', e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city" className="text-sm">City</Label>
              <Input
                id="city"
                type="text"
                placeholder="New York"
                value={billingAddress.city}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="postal_code" className="text-sm">
                {billingAddress.country === 'US' ? 'ZIP Code' : 'Postal Code'}
              </Label>
              <Input
                id="postal_code"
                type="text"
                placeholder={billingAddress.country === 'US' ? '10001' : 'SW1A 1AA'}
                value={billingAddress.postal_code}
                onChange={(e) => handleAddressChange('postal_code', e.target.value)}
                required
              />
            </div>
          </div>

          {requiresState && (
            <div>
              <Label htmlFor="state" className="text-sm">
                {billingAddress.country === 'US' ? 'State' : 'Province/State'}
              </Label>
              <Input
                id="state"
                type="text"
                placeholder={billingAddress.country === 'US' ? 'NY' : 'Ontario'}
                value={billingAddress.state}
                onChange={(e) => handleAddressChange('state', e.target.value)}
              />
            </div>
          )}
        </div>
        
        <Button 
          type="submit" 
          disabled={!stripe || !elements || isProcessing} 
          className="w-full"
        >
          {isProcessing ? 'Processing Payment...' : 'Pay €2.99'}
        </Button>
      </CardContent>
    </form>
  );
};

const WhatsAppPaymentDialog: React.FC<WhatsAppPaymentDialogProps> = ({ isOpen, onClose, onSuccess }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [step, setStep] = useState('details');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setStep('payment');
    } else {
      toast({ 
        title: "Missing Information", 
        description: "Please enter your name and email.", 
        variant: "destructive" 
      });
    }
  };

  // Show configuration error if Stripe key is missing
  if (!stripeKey) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Payment System Configuration</DialogTitle>
          </DialogHeader>
          <div className="p-4 border border-red-200 rounded-md bg-red-50">
            <p className="text-red-800 font-medium">Payment system is not configured</p>
            <p className="text-red-600 text-sm mt-1">
              The Stripe publishable key is missing. Please contact support.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (step === 'details') {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Complete Your Purchase</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleContinue} className="space-y-4">
            <CardHeader>
              <CardTitle>Your Details</CardTitle>
              <CardDescription>Enter your name and email to proceed.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="John Doe" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                />
              </div>
              <Button type="submit" className="w-full">Continue to Payment</Button>
            </CardContent>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Payment</DialogTitle>
        </DialogHeader>
        {stripePromise ? (
          <Elements stripe={stripePromise}>
            <PaymentForm onSuccess={onSuccess} formData={formData} />
          </Elements>
        ) : (
          <div className="p-4 border border-red-200 rounded-md bg-red-50">
            <p className="text-red-800">Unable to load payment system</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppPaymentDialog;

