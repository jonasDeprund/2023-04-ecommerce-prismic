import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
import { buffer } from 'micro';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const buf = await buffer(req);
  const sig = req.headers('stripe-signature');

  if (!sig) {
    return res.status(404).send('Missing stripe signature');
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return res.status(400).send('webhook error' + err);
  }
  // Handle differents types of event

  switch (event.type) {
    case 'payment_intent.created':
      const paymentIntent = event.data.object;
      console.log('payment intent was created');
      break;
    case 'charge.succeeded':
      const charge = event.data.object as Stripe.Charge;
      if (typeof charge.payment_intent === 'string') {
        const order = await prisma.order.update({
          where: { payment_intentID: charge.payment_intent },
          data: { status: 'complete' },
        });
      }
      break;
    default: {
      console.log('Unhandled event type' + event.type);
    }
  }
  res.json({ received: true });
}
