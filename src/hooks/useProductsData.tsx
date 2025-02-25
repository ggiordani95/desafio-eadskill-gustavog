"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "@/schemas/productSchema";

export default function useProductsData() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
      setLoading(false);
      return;
    }

    async function fetchProducts() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        localStorage.setItem("products", JSON.stringify(response.data));
      } catch (error) {
        console.error("Erro ao buscar produtos", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const addProduct = async (product: Product) => {
    try {
      const response = await axios.post(
        "https://fakestoreapi.com/products",
        product
      );
      saveProducts([...products, response.data]);
    } catch (error) {
      console.error("Erro ao adicionar produto", error);
    }
  };

  const deleteProduct = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await axios.delete(`https://fakestoreapi.com/products/${id}`);
        saveProducts(products.filter((product) => product.id !== id));
      } catch (error) {
        console.error("Erro ao excluir produto", error);
      }
    }
  };

  const updateProduct = async (id: number, updatedProduct: Product) => {
    try {
      await axios.put(
        `https://fakestoreapi.com/products/${id}`,
        updatedProduct
      );
      saveProducts(
        products.map((product) =>
          product.id === id ? { ...product, ...updatedProduct } : product
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar produto", error);
    }
  };

  const getProductById = (id: number) => {
    return products.find((product) => product.id === id) || null;
  };

  return {
    products,
    loading,
    addProduct,
    deleteProduct,
    updateProduct,
    getProductById,
  };
}
