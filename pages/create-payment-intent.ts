import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { AddCartType } from '@/types/AddCartType';
import { PrismaClient } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

const prisma = new PrismaClient();

const calculateOrderAmount = (items: AddCartType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);
  return totalPrice;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get the user
  const userSession = await getServerSession(req, res, authOptions);
  if (!userSession?.user) {
    res.status(403).json({ message: 'Not logged in' });
    return;
  }

  // Extract data from the body
  const { items, payment_intent_id } = req.body;

  // Create the order data
  const orderData = {
    user: { connect: { id: userSession.user?.id } },
    amount: calculateOrderAmount(items),
    currency: 'usd',
    status: 'pending', // Add a comma here to separate the properties
    paymentIntentID: payment_intent_id,
    products: {
      create: items.map((item) => ({
        name: item.name,
        description: item.description,
        unit_amount: item.unit_amount,
        image: item.image,
        quantity: item.quantity,
      })),
    },
  };

  // Check if the payment intent exists
  if (payment_intent_id) {
    const current_intent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );
    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: calculateOrderAmount(items) }
      );

      // Fetch order and id
      const existing_order = await prisma.order.findFirst({
        where: { paymentIntentID: payment_intent_id },
        include: { products: true },
      });

      if (!existing_order) {
        res.status(404).json({ message: 'invalid payment intent' });
      }

      // Updating existing order
      const updated_order = await prisma.order.update({
        where: { id: existing_order?.id },
        data: {
          amount: calculateOrderAmount(items),
          products: {
            deleteMany: {},
            create: items.map((item) => ({
              name: item.name,
              description: item.description,
              unit_amount: item.unit_amount,
              image: item.image,
              quantity: item.quantity,
            })),
          },
        },
      });

      res.status(200).json({ paymentIntent: updated_intent });
      return;
    }
  } else {
    // Create new order with prisma
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    orderData.paymentIntentID = paymentIntent.id;
    const newOrder = await prisma.order.create({
      data: orderData,
    });
  }

  res.status(200).json({ payment_intent_id });
  return;
}
