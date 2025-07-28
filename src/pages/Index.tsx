import React, { useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import { AppProvider } from '@/contexts/AppContext';

const Index: React.FC = () => {
  useEffect(() => {
    // Handle payment success/cancel from URL params
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment');
    
    if (paymentStatus === 'success') {
      // Store premium status
      localStorage.setItem('premiumUser', 'true');
      alert('Payment successful! You now have premium access.');
      // Clean URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (paymentStatus === 'cancelled') {
      alert('Payment was cancelled.');
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
};

export default Index;