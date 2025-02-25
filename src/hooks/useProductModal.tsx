"use client";
import { useState } from "react";
import { Product } from "@/schemas/productSchema";

export default function useProductModal() {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const openModal = (product?: Product) => {
    setEditingProduct(product || null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return { showModal, editingProduct, openModal, closeModal };
}
