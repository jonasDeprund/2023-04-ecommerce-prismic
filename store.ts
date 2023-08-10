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
  toggleCart: () => void;
  addProduct: (item: CartItem) => void
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addProduct: (item) => set((state) =>{
        const existingItem = state.cart.find(cartItem => cartItem === item.id)
        if(existingItem){
          const updatedCart = state.cart.map((cartItem) => {
            if(cartItem.id === item.id){
              return {...cartItem, quantity: cartItem.quantity +1}
            }
          })
        }
      
      }),
    }),
    { name: 'cart-store' }
  )
);
