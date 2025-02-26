"use client";

import { createContext, useContext, useState } from "react";
import { Product } from "@/schemas/productSchema";

type ProductModalContextType = {
  showModal: boolean;
  editingProduct: Product | null;
  openModal: (product?: Product) => void;
  closeModal: () => void;
};

const ProductModalContext = createContext<ProductModalContextType | null>(null);

export function ProductModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const openModal = (product?: Product) => {
    setEditingProduct(product || null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  return (
    <ProductModalContext.Provider
      value={{ showModal, editingProduct, openModal, closeModal }}
    >
      {children}
    </ProductModalContext.Provider>
  );
}

export function useProductModalContext() {
  const context = useContext(ProductModalContext);
  if (!context) {
    throw new Error(
      "useProductModalContext deve ser usado dentro de um ProductModalProvider"
    );
  }
  return context;
}
