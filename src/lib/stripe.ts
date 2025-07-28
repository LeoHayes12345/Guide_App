import { loadStripe } from '@stripe/stripe-js';

// Get Stripe publishable key - this should be your actual Stripe publishable key
const getStripePublishableKey = () => {
  // Replace this with your actual Stripe publishable key from your Stripe dashboard
  // This is a placeholder - you need to use your real publishable key
  const key = 'pk_live_51RpRplC3wMXCVNl8yB1S0HCWMrMDzUihmx2ckM52PInkFjmOpOF6dDl4mexzyVpNJLMzbmJIDQznjVbZc0neMud300gje7Cmn5';
  
  if (!key || key.includes('placeholder')) {
    console.error('⚠️  STRIPE CONFIGURATION ERROR: You need to set your actual Stripe publishable key in src/lib/stripe.ts');
    console.error('Get your key from: https://dashboard.stripe.com/apikeys');
  }
  
  return key;
};

// Initialize Stripe with publishable key
const stripePromise = loadStripe(getStripePublishableKey());

export { stripePromise };