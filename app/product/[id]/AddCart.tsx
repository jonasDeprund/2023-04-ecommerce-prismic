'use client';
import React from 'react';
import { useCartStore } from '@/store';
import { AddCartType } from '@/types/AddCartType';
import { createStore } from 'zustand';

export default function AddCart({
  id,
  name,
  unit_amount,
  quantity,
  image,
}: AddCartType) {
  const cartStore = useCartStore();
  return (
    <>
      <button
        onClick={() =>
          cartStore.addProduct({ id, name, image, unit_amount, quantity })
        }
        className="my-12 text-white py-2 px-6 font-medium rounded-md bg-teal-700"
      >
        Add to cart
      </button>
    </>
  );
}
