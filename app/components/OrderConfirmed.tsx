'use client';

import { motion } from 'framer-motion';

export default function OrderConfirmed() {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    ></motion.div>
  );
}
