import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Hero from './Hero';
import Navigation from './Navigation';
import Attractions from './Attractions';
import Maps from './Maps';
import Accommodation from './Accommodation';
import Restaurants from './Restaurants';
import Religion from './Religion';
import Recreation from './Recreation';
import Transport from './Transport';
import Bjeshket from './Bjeshket';
import Guide from './Guide';
import Events from './Events';
import WeatherWidget from './WeatherWidget';
import ChatWidget from './ChatWidget';
import PaymentDialog from './PaymentDialog';
import WhatsAppPaymentDialog from './WhatsAppPaymentDialog';
import { usePremiumStatus } from '@/hooks/usePremiumStatus';

type Section = 'home' | 'attractions' | 'maps' | 'accommodation' | 'restaurants' | 'religion' | 'recreation' | 'transport' | 'bjeshket' | 'guide' | 'events';

const AppLayout: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showWhatsAppPayment, setShowWhatsAppPayment] = useState(false);
  const { isPremium, hasWhatsAppAccess, activatePremium, activateWhatsAppOnly } = usePremiumStatus();

  const handleUpgrade = () => {
    setShowPaymentDialog(true);
  };

  const handlePaymentSuccess = () => {
    activatePremium();
    setShowPaymentDialog(false);
  };

  const handleWhatsAppPaymentSuccess = () => {
    activateWhatsAppOnly();
    setShowWhatsAppPayment(false);
  };

  const handleWhatsAppClick = () => {
    if (isPremium || hasWhatsAppAccess) {
      window.open('https://wa.me/355123456789?text=Hello, I need help with Tropoja tourism information', '_blank');
    } else {
      setShowWhatsAppPayment(true);
    }
  };

  const renderContent = () => {
    switch (currentSection) {
      case 'attractions':
        return <Attractions />;
      case 'maps':
        return <Maps />;
      case 'accommodation':
        return <Accommodation />;
      case 'restaurants':
        return <Restaurants />;
      case 'religion':
        return <Religion />;
      case 'recreation':
        return <Recreation />;
      case 'transport':
        return <Transport />;
      case 'bjeshket':
        return <Bjeshket />;
      case 'guide':
        return <Guide />;
      case 'events':
        return <Events />;
      default:
        return (
          <div className="space-y-8">
            <Hero />
            <div className="px-4 max-w-4xl mx-auto">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
                  <Navigation onNavigate={setCurrentSection} onWhatsAppClick={handleWhatsAppClick} />
                </div>
                <div>
                  <WeatherWidget />
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-800">
      {currentSection !== 'home' && (
        <div className="bg-slate-700 border-b border-slate-600 sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <Button
              variant="ghost"
              onClick={() => setCurrentSection('home')}
              className="flex items-center gap-2 text-slate-100 hover:bg-slate-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>
      )}
      
      <main className={currentSection !== 'home' ? 'px-4 py-6 max-w-4xl mx-auto' : ''}>
        {renderContent()}
      </main>
      
      {currentSection !== 'home' && (
        <footer className="bg-slate-700 border-t border-slate-600 mt-12">
          <div className="max-w-4xl mx-auto px-4 py-6 text-center text-slate-200">
            <p>&copy; 2024 Tropoja Guide. Discover the beauty of Northern Albania.</p>
          </div>
        </footer>
      )}

      <ChatWidget 
        isPremium={isPremium} 
        onUpgrade={handleUpgrade}
        hasWhatsAppAccess={hasWhatsAppAccess}
        onWhatsAppPaymentSuccess={handleWhatsAppPaymentSuccess}
      />

      <PaymentDialog
        isOpen={showPaymentDialog}
        onClose={() => setShowPaymentDialog(false)}
        onSuccess={handlePaymentSuccess}
      />

      <WhatsAppPaymentDialog
        isOpen={showWhatsAppPayment}
        onClose={() => setShowWhatsAppPayment(false)}
        onSuccess={handleWhatsAppPaymentSuccess}
      />
    </div>
  );
};

export default AppLayout;