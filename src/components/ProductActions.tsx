"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ProductFilters from "@/components/ProductFilters";
import ProductPagination from "@/components/ProductPagination";
import { useProductContext } from "@/stores/ProductProvider";

export default function ProductActions() {
  const { filterByCategory, sortByPrice, nextPage, prevPage, page } =
    useProductContext();

  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const savedCategory = localStorage.getItem("categoryFilter");
    const savedSortOrder = localStorage.getItem("sortOrder");

    if (savedCategory) {
      setCategory(savedCategory);
      filterByCategory(savedCategory);
    }

    if (savedSortOrder) {
      setSortOrder(savedSortOrder as "asc" | "desc");
      sortByPrice(savedSortOrder as "asc" | "desc");
    }
  }, []);

  return (
    <div className="flex mb-4 justify-between w-full items-center">
      <Button onClick={() => setCategory("")}>Adicionar Produto</Button>
      <ProductFilters
        category={category}
        sortOrder={sortOrder}
        onCategoryChange={(newCategory) => {
          setCategory(newCategory);
          localStorage.setItem("categoryFilter", newCategory);
          filterByCategory(newCategory);
        }}
        onSortChange={(newSortOrder) => {
          setSortOrder(newSortOrder);
          localStorage.setItem("sortOrder", newSortOrder);
          sortByPrice(newSortOrder);
        }}
      />
      <ProductPagination
        page={page}
        onNextPage={nextPage}
        onPrevPage={prevPage}
      />
    </div>
  );
}
