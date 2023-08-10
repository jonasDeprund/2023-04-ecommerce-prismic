'use client';
import React from 'react';
import { useCartStore } from '@/store';
import { AddCartType } from '@/types/AddCartType';

export default function AddCart({ id, name, unit_amount, quantity, image }) {
  return (
    <>
      <button onClick={() => store} className="my-12 text-white py-2 px-6 font-medium rounded-md bg-teal-700">
        Add to cart
      </button>
    </>
  );
}
