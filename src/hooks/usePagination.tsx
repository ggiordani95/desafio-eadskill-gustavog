"use client";
import { useState } from "react";

export default function usePagination<T>(items: T[], perPage: number) {
  const [page, setPage] = useState(1);

  const paginatedItems = items.slice((page - 1) * perPage, page * perPage);

  const nextPage = () => {
    if (page < Math.ceil(items.length / perPage)) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return { page, nextPage, prevPage, paginatedItems };
}
