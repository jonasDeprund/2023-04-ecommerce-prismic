import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient();

interface User {
  id: string;
  name: string;
  email: string;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  events: {
    createUser: async ({ user }: { user: User }) => {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2022-11-15',
      });
      // Stripe customer
      if (user.name && user.email) {
        const customer = await stripe.customers.create({
          email: user.email,
          name: user.name,
        });
        // Update user prisma with the stripe id
        await prisma.user.update({
          where: { id: user.id },
          data: { StripeCustomerId: costomer.id },
        });
      }
    },
  },
};

export default NextAuth(authOptions);
