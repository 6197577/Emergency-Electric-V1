import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { type, metadata } = await req.json(); // type = 'DISPATCH' or 'SUBSCRIPTION'
    let lineItems = [];
    let mode = 'payment';

    // CONTROL: PRICE GATING
    if (type === 'DISPATCH') {
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: { 
            name: 'Emergency Dispatch & Master Diagnostic',
            description: '24/7 Priority Arrival + NEC 2023 Forensic Inspection',
            images: ['https://your-domain.com/images/van.jpg'],
          },
          unit_amount: 99500, // $995.00
        },
        quantity: 1,
      });
      mode = 'payment';
    } else if (type === 'SUBSCRIPTION') {
      // Use the Price ID from your Stripe Dashboard for the $129 product
      lineItems.push({ price: 'price_YOUR_SUBSCRIPTION_ID', quantity: 1 });
      mode = 'subscription';
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: mode,
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/`,
      metadata: metadata, // Passes { customer_address, technician_id }
      
      // CONTROL: MANDATORY LICENSE FIELD FOR SUBSCRIPTIONS
      custom_fields: type === 'SUBSCRIPTION' ? [
        {
          key: 'license_info',
          label: { type: 'custom', custom: 'Professional License & Insurance #' },
          type: 'text',
          optional: false,
        }
      ] : [],
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
