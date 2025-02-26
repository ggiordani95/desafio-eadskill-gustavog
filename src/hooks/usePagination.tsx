"use client";
import { useState, useMemo } from "react";

export default function usePagination<T>(items: T[], perPage: number) {
  const [page, setPage] = useState(1);

  const lastPage = useMemo(
    () => Math.ceil(items.length / perPage),
    [items, perPage]
  );

  const paginatedItems = useMemo(
    () => items.slice((page - 1) * perPage, page * perPage),
    [items, page, perPage]
  );

  const nextPage = () => {
    if (page < lastPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const resetPage = () => {
    setPage(1);
  };

  return { page, lastPage, nextPage, prevPage, paginatedItems, resetPage };
}
