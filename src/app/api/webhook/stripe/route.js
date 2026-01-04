import { supabase } from '@/lib/db';
import Stripe from 'stripe';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature');
  let event;
  try { event = stripe.webhooks.constructEvent(payload, signature, webhookSecret); } catch (err) { return new Response(`Webhook Error`, { status: 400 }); }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { email, name } = session.customer_details;
    const amountTotal = session.amount_total / 100;
    const locationString = session.metadata.locationString || "";
    const isMember = session.metadata.isMember === 'true';

    // 1. Update Customer
    const { data: customer } = await supabase.from('customers').select('*').eq('email', email).single();
    let customerId;
    if (customer) {
        customerId = customer.customer_id;
        await supabase.from('customers').update({ total_revenue: customer.total_revenue + amountTotal, is_gold_member: isMember || customer.is_gold_member }).eq('customer_id', customerId);
    } else {
        const { data: newCust } = await supabase.from('customers').insert({ email, full_name: name, total_revenue: amountTotal, is_gold_member: isMember }).select().single();
        customerId = newCust.customer_id;
    }

    // 2. Dispatch Partner (if zip match)
    const zipMatch = locationString.match(/\b\d{5}\b/);
    if (zipMatch) {
        const { data: partner } = await supabase.from('partners').select('*').contains('coverage_zips', [zipMatch[0]]).single();
        if (partner) {
            const payout = amountTotal * 0.60;
            await supabase.from('work_orders').insert({ partner_id: partner.partner_id, customer_id: customerId, service_address: locationString, payout_amount: payout, status: 'Dispatched' });

            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            const prompt = `Write dispatch email to ${partner.company_name}. Job: ${locationString}. Payout: $${payout}. Condition: Proof required on Portal.`;
            const result = await model.generateContent(prompt);
            
            // ACTUAL EMAIL SEND
            await resend.emails.send({
                from: 'dispatch@electricdrs.com',
                to: partner.email,
                subject: `NEW JOB: ${locationString} ($${payout})`,
                text: result.response.text()
            });
        }
    }
  }
  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
