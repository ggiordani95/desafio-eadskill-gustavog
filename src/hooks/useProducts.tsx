"use client";

import usePagination from "./usePagination";
import useProductsData from "./useProductsData";
import useProductsFilters from "./useProductsFilters";

export default function useProducts() {
  const {
    products,
    loading,
    addProduct,
    deleteProduct,
    updateProduct,
    getProductById,
  } = useProductsData();

  const { filteredProducts, filterByCategory, sortByPrice } =
    useProductsFilters(products);

  const { page, nextPage, prevPage, paginatedItems } = usePagination(
    filteredProducts,
    6
  );

  return {
    products: paginatedItems,
    loading,
    addProduct,
    deleteProduct,
    updateProduct,
    filterByCategory,
    sortByPrice,
    page,
    nextPage,
    prevPage,
    getProductById,
  };
}
