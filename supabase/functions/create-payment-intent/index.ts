import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'https://esm.sh/stripe@14.21.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get Stripe secret key from environment
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY environment variable is not set')
    }

    // Initialize Stripe
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    })

    // Parse request body
    const { amount, currency, customer_email, customer_name } = await req.json()

    // Validate required fields
    if (!amount || !currency || !customer_email || !customer_name) {
      throw new Error('Missing required fields: amount, currency, customer_email, customer_name')
    }

    console.log('Creating checkout session for:', { amount, currency, customer_email, customer_name })

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'apple_pay', 'google_pay'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: 'Tropoja Tourism Guide - Premium Features',
              description: 'Live WhatsApp chat support, priority customer service, and exclusive travel tips',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer_email: customer_email,
      metadata: {
        customer_name: customer_name,
      },
      success_url: `${req.headers.get('origin') || 'https://guide-app-k372.vercel.app'}/?payment=success`,
      cancel_url: `${req.headers.get('origin') || 'https://guide-app-k372.vercel.app'}/?payment=cancelled`,
      automatic_tax: {
        enabled: false,
      },
      billing_address_collection: 'auto',
      shipping_address_collection: {
        allowed_countries: ['AL', 'US', 'CA', 'GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE', 'AT', 'CH'],
      },
    })

    console.log('Checkout session created:', session.id)

    return new Response(
      JSON.stringify({ 
        sessionId: session.id,
        url: session.url 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error creating payment session:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to create payment session',
        details: error.toString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})

