import React from 'react';
import { PrismaClient } from '@prisma/client';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import formatPrice from '@/util/PriceFormat';
import Image from 'next/image';

export const revalidate = 0;

const fetchOrders = async () => {
  const prisma = new PrismaClient();
  const user = await getServerSession(authOptions);
  if (!user) {
    return null;
  }
  const orders = await prisma.order.findMany({
    where: { userId: user?.user?.id, status: 'complete' },
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
          <div key={order.id} className="rounded-lg p-8 my-12">
            <h2>Order reference: {order.id}</h2>
            <p className="text-xs">
              Time: {new Date(order.createdDate).toString()}
            </p>
            <p className="text-md py-2">
              Status :{' '}
              <span
                className={`${
                  order.status === 'complete' ? 'bg-teal-500' : 'bg-orange-500'
                } text-white py-1 rounded-md px-2 mx-2 text-sm`}
              >
                {order.status}
              </span>
            </p>
            <p className="text-xs">
              Time: {new Date(order.createdDate).toString()}
            </p>
            <div className="text-sm lg:flex items-center justify-items-center gap-2"></div>
            {order.products.map((product) => (
              <div className="py-2" key={product.id}>
                <h2 className="py-2">{product.name}</h2>
                <div className="flex items-baseline gap-4">
                  <Image
                    src={product.image!}
                    width={36}
                    height={36}
                    alt={product.name}
                  />
                  <p>{formatPrice(product.unit_amount)}</p>
                  <p>Quantity : {product.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
