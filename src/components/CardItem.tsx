"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Stars } from "@/components/Stars";
import { Product } from "@/schemas/productSchema";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { useProductModalContext } from "@/stores/ProductModalProvider";

type CardItemProps = {
  product: Product;
  onDelete: (id: number) => void;
};

export const CardItem = ({ product, onDelete }: CardItemProps) => {
  const router = useRouter();
  const { openModal } = useProductModalContext();
  return (
    <Card className="rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg bg-white relative">
      <div
        className="relative cursor-pointer"
        onClick={() => router.push(`/product/${product.id}`)}
      >
        <Image
          src={product.image}
          alt={product.title}
          className="h-64 object-contain w-full bg-white p-4 rounded-t-lg"
          width={300}
          height={300}
          unoptimized
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            variant="outline"
            className="bg-black text-white hover:bg-black/80 hover:text-white p-4 rounded-full shadow-md transition-all"
            onClick={(e) => {
              e.stopPropagation();
              openModal(product);
            }}
          >
            Editar
          </Button>
          <Button
            variant="destructive"
            className="bg-red-500/80 hover:bg-red-600 p-4 rounded-full shadow-md transition-all"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(product.id ?? 0);
            }}
          >
            <Trash size={18} />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <CardTitle
          className="truncate text-lg font-semibold"
          title={product.title}
        >
          {product.title.length > 30
            ? product.title.slice(0, 30) + "..."
            : product.title}
        </CardTitle>
        <div className="flex justify-between items-center mt-2">
          <p className="text-zinc-700 font-bold text-lg">
            R$ {Number(product?.price ?? 0).toFixed(2)}
          </p>
          {product?.rating?.rate && (
            <div className="flex items-center">
              <p className="text-gray-800 font-bold mr-2">
                {product.rating.rate} / 5
              </p>
              <Stars rating={product.rating.rate} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
