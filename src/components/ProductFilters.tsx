"use client";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";

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
  return (
    <div className="flex gap-4 items-center">
      <Select value={category} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Filtrar por categoria" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          <SelectItem value="tecnologia">Tecnologia</SelectItem>
          <SelectItem value="moda">Moda</SelectItem>
          <SelectItem value="alimentos">Alimentos</SelectItem>
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
          <SelectItem value="asc">Menor preço</SelectItem>
          <SelectItem value="desc">Maior preço</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
