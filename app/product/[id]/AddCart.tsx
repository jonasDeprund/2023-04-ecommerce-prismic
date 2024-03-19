'use client';
import React, { useState } from 'react';
import { useCartStore } from '@/store';
import { AddCartType } from '@/types/AddCartType';
import { createStore } from 'zustand';
import { spawn } from 'child_process';

export default function AddCart({
  id,
  name,
  unit_amount,
  quantity,
  image,
}: AddCartType) {
  const cartStore = useCartStore();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    cartStore.addProduct({ id, name, image, unit_amount, quantity });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 500);
  };
  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={added}
        className="my-4 btn btn-primary w-full"
      >
        {!added && <span>Add to cart</span>}
        {added && <span>Adding to cart</span>}
      </button>
    </>
  );
}
