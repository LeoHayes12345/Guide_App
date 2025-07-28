import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Smartphone, CreditCard, Globe, AlertCircle, ExternalLink } from 'lucide-react';
import AccountSetup from './AccountSetup';

interface PremiumAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const PremiumAccountDialog: React.FC<PremiumAccountDialogProps> = ({ isOpen, onClose }) => {
  const [showAccountSetup, setShowAccountSetup] = useState(false);

  if (showAccountSetup) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <AccountSetup onClose={() => setShowAccountSetup(false)} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Premium Account Setup
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-blue-800 mb-1">Current Status: Demo Mode</h3>
                  <p className="text-sm text-blue-700">
                    Your app currently uses a demo payment system. To charge real users, 
                    you need to set up a payment processor.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Payment Options:</h3>
            
            <div className="space-y-3">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                      <div>
                        <h4 className="font-medium">Web App Payment (Recommended)</h4>
                        <p className="text-sm text-gray-600">Stripe, PayPal, or similar - 2.9% fees</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Easiest
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Smartphone className="h-5 w-5 text-purple-600" />
                      <div>
                        <h4 className="font-medium">App Store In-App Purchases</h4>
                        <p className="text-sm text-gray-600">Native iOS/Android - 30% Apple/Google fee</p>
                      </div>
                    </div>
                    <Badge variant="outline">Complex</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">App Store vs Web App</h4>
              <div className="text-sm text-yellow-700 space-y-2">
                <p><strong>Web App (Current):</strong> Users access via browser, easier payment setup, lower fees</p>
                <p><strong>App Store:</strong> Requires converting to native app, App Store approval, higher fees but better user experience</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={() => setShowAccountSetup(true)}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Set Up Payment Processing
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PremiumAccountDialog;