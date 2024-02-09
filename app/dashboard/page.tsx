import React from 'react';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

const fetchOrders = async () => {
  const prisma = new PrismaClient();
  const user = await getServerSession(authOptions);
  if (!user) {
    return { message: 'Not logged in' };
  }
  const orders = await prisma.order.findMany({
    where: { userId: user?.user?.id },
    include: { products: true },
  });
  return orders;
};

export default async function dashbaord() {
  const orders = await fetchOrders();
  console.log(orders);

  return (
    <div>
      <h1>Your orders</h1>
    </div>
  );
}
