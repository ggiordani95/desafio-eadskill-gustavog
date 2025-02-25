"use client";
import { useState, useEffect } from "react";
import { Product } from "@/schemas/productSchema";

export default function useProductsFilters(products: Product[]) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [category, setCategory] = useState(
    localStorage.getItem("categoryFilter") || ""
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "default">(
    (localStorage.getItem("sortOrder") as "asc" | "desc" | "default") ||
      "default"
  );

  useEffect(() => {
    applyFilters(products, category, sortOrder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, category, sortOrder]);

  const applyFilters = (
    productList: Product[],
    selectedCategory = category,
    order = sortOrder
  ) => {
    let updatedProducts = [...productList];

    if (selectedCategory) {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (order === "asc") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (order === "desc") {
      updatedProducts.sort((a, b) => b.price - a.price);
    } else {
      updatedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    setFilteredProducts(updatedProducts);
  };

  const filterByCategory = (value: string) => {
    const newCategory = value === "all" ? "" : value;
    setCategory(newCategory);
    localStorage.setItem("categoryFilter", newCategory);
  };

  const sortByPrice = (value: "asc" | "desc" | "default") => {
    setSortOrder(value);
    localStorage.setItem("sortOrder", value);
  };

  return {
    filteredProducts,
    filterByCategory,
    sortByPrice,
  };
}
