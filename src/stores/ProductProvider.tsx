"use client";

import { createContext, useContext } from "react";
import useProducts from "@/hooks/useProducts";

const ProductContext = createContext<
  ReturnType<typeof useProducts> | undefined
>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const productState = useProducts();

  return (
    <ProductContext.Provider value={productState}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      "useProductContext deve ser usado dentro de ProductProvider"
    );
  }
  return context;
}
