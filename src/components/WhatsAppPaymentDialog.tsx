import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface WhatsAppPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

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
      toast({ title: "Missing Information", description: "Please enter your name and email.", variant: "destructive" });
    }
  };

  const handlePayment = () => {
    toast({ 
      title: "Payment System Under Maintenance", 
      description: "The payment system is currently being updated. Please try again later.",
      variant: "destructive" 
    });
  };

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
                <Input id="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleInputChange} required />
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Payment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <CardHeader>
            <CardTitle>Secure Payment</CardTitle>
            <CardDescription>Price: €2.99</CardDescription>
            <div style={{ 
              padding: '8px', 
              marginTop: '8px', 
              borderRadius: '4px', 
              backgroundColor: '#ffebee', 
              color: '#c53030', 
              border: '1px solid #f56565' 
            }}>
              ⚠️ Payment system is being updated. Please check back later.
            </div>
          </CardHeader>
          <CardContent>
            <Button onClick={handlePayment} className="w-full">
              Payment System Under Maintenance
            </Button>
          </CardContent>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsAppPaymentDialog;

