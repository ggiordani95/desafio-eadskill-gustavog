"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ProductPaginationProps = {
  page: number;
  lastPage: number;
  onNextPage: () => void;
  onPrevPage: () => void;
};

export default function ProductPagination({
  page,
  lastPage,
  onNextPage,
  onPrevPage,
}: ProductPaginationProps) {
  return (
    <Pagination className="flex justify-end">
      <PaginationContent className="grid grid-cols-3 items-center">
        <PaginationItem className="justify-self-start">
          {page > 1 && (
            <PaginationLink className="bg-zinc-100 p-2" onClick={onPrevPage}>
              <ChevronLeft />
            </PaginationLink>
          )}
        </PaginationItem>
        <PaginationItem className="justify-self-center">
          <span className="text-center text-md font-medium text-zinc-700">
            Página {page} de {lastPage}
          </span>
        </PaginationItem>

        <PaginationItem className="justify-self-end">
          {page < lastPage && (
            <PaginationLink className="bg-zinc-100 p-2" onClick={onNextPage}>
              <ChevronRight />
            </PaginationLink>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
