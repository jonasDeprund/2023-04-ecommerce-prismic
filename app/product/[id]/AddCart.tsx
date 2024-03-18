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
        className="my-4 btn btn-primary w-full"
      >
        Add to cart
      </button>
    </>
  );
}
