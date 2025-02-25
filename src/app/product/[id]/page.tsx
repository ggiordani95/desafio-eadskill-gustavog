"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import useProducts from "@/hooks/useProducts";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Product } from "@/schemas/productSchema";
import { Stars } from "@/components/Stars";

export default function ProdutoDetalhes() {
  const { id } = useParams();
  const router = useRouter();
  const { getProductById } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const foundProduct = getProductById(Number(id));
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, getProductById]);

  if (!product)
    return (
      <div className="text-center mt-10 text-lg">Produto não encontrado...</div>
    );

  console.log(product);

  return (
    <div className="container mx-auto p-4 bg-gray-100 w-screen  mb-10">
      <Button onClick={() => router.push("/")} className="mb-6">
        ← Voltar
      </Button>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="flex">
          <Image
            src={product.image}
            alt={product.title}
            className="h-96 object-contain rounded-md bg-white p-4"
            width={400}
            height={400}
          />
        </div>
        <div className="flex flex-col">
          <p className="text-gray-500 text-lg mb-3">{product.category}</p>
          <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
          <div className=" flex flex-row gap-2">
            <p className="text-xl font-bold text-gray-700">
              {product.rating.rate}
            </p>
            <Stars rating={product.rating.rate} />
          </div>

          <p className="text-4xl my-2 font-semibold text-zinc-700 mt-4">
            R$ {product.price.toFixed(2)}
          </p>
          <p className="mt-4 text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            commodo cursus magna, vel scelerisque nisl consectetur et.
          </p>
        </div>
      </div>
    </div>
  );
}
