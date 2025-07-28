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
    const { 
      amount, 
      currency, 
      customer_email, 
      customer_name, 
      payment_method_types = ['card', 'apple_pay', 'google_pay'],
      mode = 'payment_intent' // 'payment_intent' for Apple/Google Pay, 'checkout' for Stripe Checkout
    } = await req.json()

    // Validate required fields
    if (!amount || !currency || !customer_email || !customer_name) {
      throw new Error('Missing required fields: amount, currency, customer_email, customer_name')
    }

    console.log('Processing payment request:', { amount, currency, customer_email, customer_name, mode })

    if (mode === 'checkout') {
      // Create Stripe Checkout Session for credit card payments
      const session = await stripe.checkout.sessions.create({
        payment_method_types: payment_method_types,
        line_items: [
          {
            price_data: {
              currency: currency,
              product_data: {
                name: 'Tropoja Tourism Guide - WhatsApp Live Chat Access',
                description: 'Get instant access to live chat with local Tropoja experts via WhatsApp',
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
          service_type: 'whatsapp_chat'
        },
        success_url: `${req.headers.get('origin') || 'https://guide-app-k372.vercel.app'}/?payment=success`,
        cancel_url: `${req.headers.get('origin') || 'https://guide-app-k372.vercel.app'}/?payment=cancelled`,
        automatic_tax: {
          enabled: false,
        },
        billing_address_collection: 'auto',
      })

      console.log('Checkout session created:', session.id)

      return new Response(
        JSON.stringify({ 
          sessionId: session.id,
          checkout_url: session.url 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )

    } else {
      // Create Payment Intent for Apple Pay/Google Pay
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: currency,
        payment_method_types: payment_method_types,
        metadata: {
          customer_email: customer_email,
          customer_name: customer_name,
          service_type: 'whatsapp_chat'
        },
        receipt_email: customer_email,
        description: 'Tropoja Tourism Guide - WhatsApp Live Chat Access',
      })

      console.log('Payment intent created:', paymentIntent.id)

      return new Response(
        JSON.stringify({ 
          client_secret: paymentIntent.client_secret,
          payment_intent_id: paymentIntent.id
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )
    }

  } catch (error) {
    console.error('Error processing payment:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to process payment',
        details: error.toString()
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})

