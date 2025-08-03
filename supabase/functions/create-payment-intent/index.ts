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
    // Get Stripe secret key from environment with detailed logging
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
    console.log('Environment check - STRIPE_SECRET_KEY exists:', !!stripeSecretKey)
    console.log('Environment check - Key starts with sk_:', stripeSecretKey?.startsWith('sk_'))
    
    if (!stripeSecretKey) {
      console.error('STRIPE_SECRET_KEY environment variable is not set')
      return new Response(
        JSON.stringify({ 
          error: 'STRIPE_SECRET_KEY environment variable is not set',
          debug: 'Environment variable missing'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        },
      )
    }

    if (!stripeSecretKey.startsWith('sk_')) {
      console.error('Invalid Stripe secret key format')
      return new Response(
        JSON.stringify({ 
          error: 'Invalid Stripe secret key format',
          debug: 'Key should start with sk_'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        },
      )
    }

    // Initialize Stripe with better error handling
    let stripe
    try {
      stripe = new Stripe(stripeSecretKey, {
        apiVersion: '2023-10-16',
      })
      console.log('Stripe initialized successfully')
    } catch (stripeError) {
      console.error('Failed to initialize Stripe:', stripeError)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to initialize Stripe',
          debug: stripeError.message
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        },
      )
    }

    // Parse request body
    const { 
      amount, 
      currency, 
      customer_email, 
      customer_name, 
      payment_method_types = ['card'],
      mode = 'payment_intent'
    } = await req.json()

    // Validate required fields
    if (!amount || !currency || !customer_email || !customer_name) {
      const missingFields = []
      if (!amount) missingFields.push('amount')
      if (!currency) missingFields.push('currency')
      if (!customer_email) missingFields.push('customer_email')
      if (!customer_name) missingFields.push('customer_name')
      
      console.error('Missing required fields:', missingFields)
      return new Response(
        JSON.stringify({ 
          error: `Missing required fields: ${missingFields.join(', ')}`,
          debug: 'Validation failed'
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        },
      )
    }

    console.log('Processing payment request:', { 
      amount, 
      currency, 
      customer_email, 
      customer_name, 
      mode,
      payment_method_types 
    })

    if (mode === 'checkout') {
      // Create Stripe Checkout Session
      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
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

        console.log('Checkout session created successfully:', session.id)

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
      } catch (stripeError) {
        console.error('Stripe checkout session creation failed:', stripeError)
        return new Response(
          JSON.stringify({ 
            error: 'Failed to create checkout session',
            debug: stripeError.message,
            stripe_error: stripeError.type || 'unknown'
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          },
        )
      }

    } else {
      // Create Payment Intent for embedded payments
      try {
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

        console.log('Payment intent created successfully:', paymentIntent.id)

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
      } catch (stripeError) {
        console.error('Stripe payment intent creation failed:', stripeError)
        return new Response(
          JSON.stringify({ 
            error: 'Failed to create payment intent',
            debug: stripeError.message,
            stripe_error: stripeError.type || 'unknown'
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          },
        )
      }
    }

  } catch (error) {
    console.error('Unexpected error processing payment:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Unexpected error processing payment',
        debug: error.message || error.toString(),
        stack: error.stack
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})

