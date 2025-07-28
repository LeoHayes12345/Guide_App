import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MessageCircle, Check, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

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
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: ''
  });
  const { toast } = useToast();

  const handlePayment = async () => {
    if (!formData.email || !formData.cardNumber || !formData.name) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Create payment intent
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke('create-payment-intent', {
        body: {
          amount: 299, // €2.99 in cents
          currency: 'eur',
          customer_email: formData.email,
          customer_name: formData.name
        }
      });

      if (paymentError) throw paymentError;

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Store WhatsApp access in database
      const { error: dbError } = await supabase
        .from('premium_users')
        .upsert({
          email: formData.email,
          name: formData.name,
          subscription_type: 'whatsapp_chat',
          payment_status: 'completed',
          stripe_customer_id: paymentData?.customer_id,
          created_at: new Date().toISOString()
        });

      if (dbError) throw dbError;

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
      toast({
        title: 'Payment Failed',
        description: 'There was an error processing your payment. Please try again.',
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
      cardNumber: '',
      expiryDate: '',
      cvv: '',
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
              
              <div className="text-center py-4">
                <div className="text-3xl font-bold text-green-600">€2.99</div>
                <div className="text-sm text-gray-600">One-time payment • 30 days access</div>
              </div>

              <Button 
                onClick={() => setPaymentStep('payment')} 
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Continue to Payment
              </Button>
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

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                  placeholder="4242 4242 4242 4242"
                  maxLength={19}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    value={formData.cvv}
                    onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                    placeholder="123"
                    maxLength={3}
                  />
                </div>
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
                  onClick={handlePayment} 
                  disabled={isProcessing}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {isProcessing ? 'Processing...' : 'Pay €2.99'}
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