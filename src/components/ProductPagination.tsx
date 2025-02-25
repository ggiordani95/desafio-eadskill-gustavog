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
  onNextPage: () => void;
  onPrevPage: () => void;
};

export default function ProductPagination({
  page,
  onNextPage,
  onPrevPage,
}: ProductPaginationProps) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink className="bg-zinc-100 mr-2" onClick={onPrevPage}>
            <ChevronLeft />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <span className="self-center">Página {page}</span>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="bg-zinc-100 ml-2" onClick={onNextPage}>
            <ChevronRight />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
