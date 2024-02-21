import React from 'react';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

const fetchOrders = async () => {
  const prisma = new PrismaClient();
  const user = await getServerSession(authOptions);
  if (!user) {
    return null;
  }
  const orders = await prisma.order.findMany({
    where: { userId: user?.user?.id },
    include: { products: true },
  });
  return orders;
};

export default async function dashbaord() {
  const orders = await fetchOrders();
  if (orders === null)
    return <div>You need to be loggued to view your order</div>;
  if (orders.length === 0)
    return (
      <div>
        <h1>No orders placed</h1>
      </div>
    );
  return (
    <div>
      <div className="font-medium">
        {orders.map((order) => (
          <div key={order.id} className="rounded-lg">
            <h2>Order reference: {order.id}</h2>
            <p>Time: {new Date(order.createDate)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
