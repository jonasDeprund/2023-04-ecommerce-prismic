'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import dance from '@/public/dance.gif';
import Link from 'next/link';

export default function OrderConfirmed() {
  return (
    <motion.div
      className="flex items-center justify-center my-12"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div className="py-12 rounded-md text-center">
        <h1 className="text-xl font-medium">Your order as been placed</h1>
        <h2 className="font-sm my-4">Check your email for the receipt</h2>
        <Image src={dance} className="py-8" alt="dancing man" />
      </div>
      <div>
        <Link href={'/dashbaord'}>
          <button className="font-medium">Check your order</button>
        </Link>
        <button></button>
      </div>
    </motion.div>
  );
}
