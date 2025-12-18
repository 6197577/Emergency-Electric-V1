import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { google } from 'googleapis';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// HELPER: Google Sheets Connection
async function writeToSheet(range, values) {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GCP_CLIENT_EMAIL,
      private_key: process.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: range,
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [values] },
  });
}

export async function POST(req) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // AUTOMATION CONTROLS
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // CASE 1: $995 DISPATCH PAID
    if (session.mode === 'payment') {
       await writeToSheet('Jobs_Log!A:J', [
         session.id, // Job ID
         new Date().toISOString(),
         session.customer_details.email,
         session.metadata.customer_address || 'Address Not Provided',
         'PAID',
         '995.00', // Amount
         'PENDING_DISPATCH', // Status
         'AppSheet_Link_Generated' // Placeholder for AppSheet link
       ]);
       // TODO: Trigger SMS Dispatch to Technician here via Twilio
    }
    
    // CASE 2: $129 SUBSCRIPTION ACTIVE
    if (session.mode === 'subscription') {
      const license = session.custom_fields.find(f => f.key === 'license_info')?.text.value;
      await writeToSheet('Subscribers!A:F', [
        session.customer_details.email,
        license || 'UNKNOWN',
        'ACTIVE',
        new Date().toISOString(),
        session.customer,
        0 // Usage Count starts at 0
      ]);
    }
  }

  return NextResponse.json({ received: true });
}
