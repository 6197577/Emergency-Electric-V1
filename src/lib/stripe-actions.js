import Stripe from 'stripe';
import { supabase } from '@/lib/db';
import { targetCities } from '@/lib/target-cities';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function generateCheckoutLink({ 
    serviceType, duration, complexity, customerDate, siteId, includeSurgeProtector, locationString, 
    joinGoldClub, commercialTier 
}) {
    const isEmergency = siteId === 'emergency';
    let base = isEmergency ? 100000 : 75000; 

    // Market Logic
    let market = targetCities['default'];
    if (locationString) {
        const cleanLoc = locationString.toLowerCase().trim().replace(/ /g, '-');
        if (targetCities[cleanLoc]) market = targetCities[cleanLoc];
    }

    const line_items = [];
    let mode = 'payment'; 

    // 1. COMMERCIAL SENTINEL ($699 - $5,999)
    if (serviceType === 'Commercial' && commercialTier) {
        mode = 'subscription';
        let price = 0, setupFee = 0, name = "";
        if (commercialTier === 'Retail') { price = 69900; setupFee = 250000; name = "Sentinel Retail"; }
        else if (commercialTier === 'Industrial') { price = 249900; setupFee = 750000; name = "Sentinel Industrial"; }
        else if (commercialTier === 'Enterprise') { price = 599900; setupFee = 1500000; name = "Sentinel Enterprise"; }

        line_items.push({ price_data: { currency: 'usd', product_data: { name }, unit_amount: price, recurring: { interval: 'month' } }, quantity: 1 });
        line_items.push({ price_data: { currency: 'usd', product_data: { name: "Hardware Setup Fee" }, unit_amount: setupFee }, quantity: 1 });

    } else if (joinGoldClub) {
        // 2. RESIDENTIAL GOLD CLUB ($49/mo)
        mode = 'subscription';
        line_items.push({
            price_data: { currency: 'usd', product_data: { name: "Gold Safety Club" }, unit_amount: 4900, recurring: { interval: 'month' } },
            quantity: 1
        });
    } else {
        // 3. STANDARD ONE-TIME
        let amount = base * market.priceMultiplier;
        if (market.travelFee > 0) amount += (market.travelFee * 100);
        if (complexity === 'Critical') amount *= 1.5;
        line_items.push({ price_data: { currency: 'usd', product_data: { name: "National Electric Dispatch" }, unit_amount: Math.round(amount) }, quantity: 1 });
    }

    // Inventory
    if (includeSurgeProtector) line_items.push({ price_data: { currency: 'usd', product_data: { name: 'Eaton Surge Protector' }, unit_amount: 29900 }, quantity: 1 });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'klarna', 'affirm'], 
      line_items,
      mode,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      metadata: { serviceDate: customerDate, siteId, locationString, isMember: joinGoldClub ? 'true' : 'false' },
      automatic_tax: { enabled: true }, // Tax Compliance
      shipping_address_collection: { allowed_countries: ['US'] },
      phone_number_collection: { enabled: true },
    });
    return session.url;
}
