'use client';
import React from 'react';
import { useCartStore } from '@/store';

export default function AddCart({ name, id, image, price }) {
  return (
    <>
      <button className="my-12 text-white py-2 px-6 font-medium rounded-md bg-teal-700">
        Add to cart
      </button>
    </>
  );
}
