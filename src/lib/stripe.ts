import { loadStripe } from '@stripe/stripe-js';

// Get Stripe publishable key from environment variables
const getStripePublishableKey = () => {
  const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  
  if (!key) {
    console.error('⚠️  STRIPE CONFIGURATION ERROR: VITE_STRIPE_PUBLISHABLE_KEY environment variable is not set');
    console.error('Please set this in your Vercel environment variables');
    console.error('Get your key from: https://dashboard.stripe.com/apikeys');
  }
  
  return key;
};

// Initialize Stripe with publishable key
const stripePromise = loadStripe(getStripePublishableKey());

export { stripePromise };