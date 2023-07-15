import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type cartItem = {
  name: string;
  id: string;
  images?: string[];
  descriptions?: string;
  unit_amount: number;
  quantity: number;
};

type CartState = {
  isOpen: boolean;
  cart: cartItem[];
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
    }),
    { name: 'cart-store' }
  )
);
