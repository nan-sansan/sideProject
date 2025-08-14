import { create } from "zustand/react";
import { persist } from "zustand/middleware";

type CartState = {
  items: { productId: string; quantity: number }[];
  add: (productId: string, quantity: number) => void;
  set: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  removeAll: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (setState, getState) => {
      return {
        items: [],
        add: (productId, quantity) => {
          if (quantity <= 0) {
            throw new Error("quantity must be greater than 0");
          }
          const { items } = getState();
          const item = items.find((item) => item.productId === productId);
          if (item) {
            item.quantity += quantity;
            setState({
              items: [...items],
            });
          } else {
            setState({
              items: [...items, { productId, quantity }],
            });
          }
        },
        set: (productId, quantity) => {
          const { items } = getState();
          if (quantity <= 0) {
            setState({
              items: items.filter((item) => item.productId !== productId),
            });
            return;
          }

          const item = items.find((item) => item.productId === productId);
          if (item) {
            item.quantity = quantity;
            setState({ items: [...items] });
          }
        },
        removeItem: (productId) => {
          const { items } = getState();
          setState({
            items: items.filter((item) => item.productId !== productId),
          });
        },
        removeAll: () => {
          setState({ items: [] });
        },
      };
    },
    {
      name: "cart-storage",
    },
  ),
);
