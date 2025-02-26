"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ProductFilters from "@/components/ProductFilters";
import ProductPagination from "@/components/ProductPagination";
import { useProductContext } from "@/stores/ProductProvider";
import { useProductModalContext } from "@/stores/ProductModalProvider";
import { LocalStorageService } from "@/services/LocalStorageService";

export default function ProductActions() {
  const {
    filterByCategory,
    sortByPrice,
    nextPage,
    prevPage,
    page,
    lastPage,
    resetPage,
  } = useProductContext();

  const { openModal } = useProductModalContext();

  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const categoryStorage = new LocalStorageService<string>("categoryFilter");
  const sortOrderStorage = new LocalStorageService<string>("sortOrder");

  useEffect(() => {
    const savedCategory = categoryStorage.getValue()[0];
    const savedSortOrder = sortOrderStorage.getValue()[0];

    if (savedCategory) {
      setCategory(savedCategory);
      filterByCategory(savedCategory);
    }

    if (savedSortOrder) {
      setSortOrder(savedSortOrder as "asc" | "desc");
      sortByPrice(savedSortOrder as "asc" | "desc");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex mb-4 gap-3 justify-between w-full items-center">
      <Button onClick={() => openModal()}>Adicionar Produto</Button>
      <ProductFilters
        category={category}
        sortOrder={sortOrder}
        onCategoryChange={(newCategory) => {
          setCategory(newCategory);
          resetPage();
          categoryStorage.saveItems([newCategory]);
          filterByCategory(newCategory);
        }}
        onSortChange={(newSortOrder) => {
          setSortOrder(newSortOrder);
          sortOrderStorage.saveItems([newSortOrder]);
          sortByPrice(newSortOrder);
        }}
      />
      <ProductPagination
        page={page}
        onNextPage={nextPage}
        onPrevPage={prevPage}
        lastPage={lastPage}
      />
    </div>
  );
}
