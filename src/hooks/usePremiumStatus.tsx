import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export const usePremiumStatus = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [hasWhatsAppAccess, setHasWhatsAppAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for premium status
    const premiumStatus = localStorage.getItem('tropoja_premium');
    const whatsappStatus = localStorage.getItem('tropoja_whatsapp');
    
    if (premiumStatus === 'true') {
      setIsPremium(true);
    }
    if (whatsappStatus === 'true') {
      setHasWhatsAppAccess(true);
    }
    setLoading(false);
  }, []);

  const setPremiumStatus = async (email: string) => {
    try {
      // Verify premium status from database
      const { data, error } = await supabase
        .from('premium_users')
        .select('*')
        .eq('email', email)
        .eq('is_active', true)
        .single();

      if (data && !error) {
        localStorage.setItem('tropoja_premium', 'true');
        localStorage.setItem('tropoja_premium_email', email);
        setIsPremium(true);
        return true;
      }
    } catch (error) {
      console.error('Error verifying premium status:', error);
    }
    return false;
  };

  const setWhatsAppAccess = async (email: string) => {
    try {
      // Verify WhatsApp access from database
      const { data, error } = await supabase
        .from('premium_users')
        .select('*')
        .eq('email', email)
        .or('subscription_type.eq.whatsapp_chat,subscription_type.eq.premium')
        .eq('payment_status', 'completed')
        .single();

      if (data && !error) {
        localStorage.setItem('tropoja_whatsapp', 'true');
        localStorage.setItem('tropoja_whatsapp_email', email);
        setHasWhatsAppAccess(true);
        
        // If it's a full premium account, also set premium status
        if (data.subscription_type === 'premium') {
          localStorage.setItem('tropoja_premium', 'true');
          setIsPremium(true);
        }
        
        return true;
      }
    } catch (error) {
      console.error('Error verifying WhatsApp access:', error);
    }
    return false;
  };

  const activatePremium = () => {
    localStorage.setItem('tropoja_premium', 'true');
    localStorage.setItem('tropoja_whatsapp', 'true'); // Premium includes WhatsApp
    setIsPremium(true);
    setHasWhatsAppAccess(true);
  };

  const activateWhatsAppOnly = () => {
    localStorage.setItem('tropoja_whatsapp', 'true');
    setHasWhatsAppAccess(true);
  };

  const checkPremiumByEmail = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('premium_users')
        .select('*')
        .eq('email', email)
        .eq('is_active', true);

      return data && data.length > 0;
    } catch (error) {
      console.error('Error checking premium status:', error);
      return false;
    }
  };

  const checkWhatsAppAccess = async (email: string) => {
    try {
      const { data, error } = await supabase
        .from('premium_users')
        .select('*')
        .eq('email', email)
        .or('subscription_type.eq.whatsapp_chat,subscription_type.eq.premium')
        .eq('payment_status', 'completed');

      return data && data.length > 0;
    } catch (error) {
      console.error('Error checking WhatsApp access:', error);
      return false;
    }
  };

  return {
    isPremium,
    hasWhatsAppAccess,
    loading,
    setPremiumStatus,
    setWhatsAppAccess,
    activatePremium,
    activateWhatsAppOnly,
    checkPremiumByEmail,
    checkWhatsAppAccess
  };
};