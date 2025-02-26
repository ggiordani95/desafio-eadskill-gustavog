"use client";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { useProductContext } from "@/stores/ProductProvider";

type ProductFiltersProps = {
  category: string;
  sortOrder: "asc" | "desc";
  onCategoryChange: (category: string) => void;
  onSortChange: (order: "asc" | "desc") => void;
};

export default function ProductFilters({
  category,
  sortOrder,
  onCategoryChange,
  onSortChange,
}: ProductFiltersProps) {
  const { getCategories } = useProductContext();
  const categories = getCategories();
  return (
    <div className="flex gap-3 items-center">
      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Filtrar por categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.original} value={category.original}>
              {category.ptbr}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={sortOrder}
        onValueChange={(value) => onSortChange(value as "asc" | "desc")}
      >
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Ordenar por preço" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Melhor avaliação</SelectItem>
          <SelectItem value="asc">Menor preço</SelectItem>
          <SelectItem value="desc">Maior preço</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
