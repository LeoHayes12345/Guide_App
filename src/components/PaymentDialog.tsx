import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Check } from 'lucide-react';
import StripePayment from './StripePayment';

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PaymentDialog: React.FC<PaymentDialogProps> = ({ isOpen, onClose, onSuccess }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
    
    setTimeout(() => {
      onSuccess();
      onClose();
      setPaymentSuccess(false);
    }, 2000);
  };

  const handleClose = () => {
    if (!paymentSuccess) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Upgrade to Premium
          </DialogTitle>
        </DialogHeader>

        {paymentSuccess ? (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-600 mb-2">Payment Successful!</h3>
            <p className="text-gray-600">You now have access to WhatsApp live chat support.</p>
          </div>
        ) : (
          <StripePayment
            onSuccess={handlePaymentSuccess}
            onCancel={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;