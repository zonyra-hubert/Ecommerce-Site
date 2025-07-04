import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AddCartTypes } from "./types/AddCartTypes";

export type CartItem = {
  id: string;
  name: string;
  unit_amount: number;
  quantity: number;
  images?: string[];
  description?: string;
};

type CartState = {
  isOpen: boolean;
  cart: AddCartTypes[];
  toggleCart: () => void;
  addProduct: (item: AddCartTypes) => void;
  removePbroduct?: (id: string) => void;
};
interface UseCartStoreActions {
  toggleCart: () => void;
  addProduct: (item: AddCartTypes) => void;
  removeProduct: (item: AddCartTypes) => void;
}

export const useCartStore = create<CartState & UseCartStoreActions>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      toggleCart: (): void => set((state) => ({ isOpen: !state.isOpen })),
      addProduct: (item: AddCartTypes): void =>
        set((state) => {
          // console.log("Adding to cart:", item);

          const existingItem = state.cart.find(
            (cartItem: AddCartTypes) => cartItem.id === item.id
          );

          if (existingItem) {
            const updatedCart = state.cart.map((cartItem: AddCartTypes) => {
              if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity! + 1 };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
          }
        }),
      removeProduct: (item: AddCartTypes): void =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem: AddCartTypes) => cartItem.id === item.id
          );
          if (existingItem && existingItem.quantity! > 1) {
            const updatedCart = state.cart.map((cartItem: AddCartTypes) => {
              if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity! - 1 };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            const filteredCart = state.cart.filter(
              (cartItem: AddCartTypes) => cartItem.id !== item.id
            );
            return { cart: filteredCart };
          }
        }),
    }),
    { name: "cart-store" }
  )
);
