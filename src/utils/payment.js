import Stripe from 'stripe';

export async function createSubscription({
  stripe = new Stripe(process.env.STRIPE_KEY),
  customer_email,
  plan,
  subscription_metadata = {},
  cancel_url = process.env.CANCEL_URL || 'https://google.com/',
  success_url = process.env.SUCCESS_URL || 'https://youtube.com/'
}) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    customer_email,
    subscription_data: {
      items: [{ plan }],
      metadata: subscription_metadata,
    },
    success_url,
    cancel_url,
  });

  return session;
}
