import { create } from "zustand";
import { persist } from "zustand/middleware";


interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  rating: number;
}

interface ProductStore {
  products: Product[];
  setProducts: (products: Product[]) => void;
  quantities: Record<number, number>; 
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
}

export const useProductStore = create(
  persist<ProductStore>(
    (set) => ({
      products: [],
      setProducts: (products) => set({ products }),
      quantities: {}, 
      increaseQuantity: (id) =>
        set((state) => ({
          quantities: {
            ...state.quantities,
            [id]: (state.quantities[id] || 0) + 1,
          },
        })),
      decreaseQuantity: (id) =>
        set((state) => ({
          quantities: {
            ...state.quantities,
            [id]: Math.max((state.quantities[id] || 1) - 1, 1),
          },
        })),
    }),
    { name: "product-store" } 
  )
);
