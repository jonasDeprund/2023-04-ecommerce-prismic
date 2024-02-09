import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from './auth/[...nextauth]';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      // Get the user
      const user = await getServerSession(req, res, authOptions);
      if (!user) {
        res.status(403).json({ message: 'Not logged in' });
      }

      // Find all orders for all users
      const orders = await prisma.order.findMany({
        where: {
          userId: user?.user?.id,
        },
        include: {
          products: true,
        },
      });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch orders' });
    }
  } else {
    res.setHeader('Allow', 'GET');
    res.status(405).end('Methods are not allowed');
  }
}
