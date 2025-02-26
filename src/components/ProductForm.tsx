"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { productSchema } from "@/schemas/productSchema";
import Image from "next/image";
import { useProductForm } from "@/hooks/useProductForm";
import useProductsData from "@/hooks/useProductsData";
import { Category } from "@/enums/categories";

export type ProductFormProps = {
  onSubmit: (data: z.infer<typeof productSchema>) => void;
  onClose: () => void;
  isEditing?: boolean;
  defaultValues?: z.infer<typeof productSchema>;
};

export const ProductForm = ({
  onSubmit,
  onClose,
  isEditing = false,
  defaultValues,
}: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      id: isEditing ? defaultValues?.id : undefined,
      title: defaultValues?.title || "",
      price: defaultValues?.price || 0.99,
      category: defaultValues?.category || Category.MENS_CLOTHING,
      image:
        defaultValues?.image ||
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStnPtdCrmYySpCRIGCzmncnU7cugyZF4T-Vg&s",
      rating: defaultValues?.rating || undefined,
      description: defaultValues?.description || "Sem descrição",
    },
  });

  const { getCategories } = useProductsData();
  const categories = getCategories();

  const imageUrl = watch("image", defaultValues?.image || "").trim();

  const { imageError, isValidImage, submitHandler } = useProductForm({
    imageUrl,
    clearErrors,
    onSubmit,
    onClose,
    reset,
    data: watch(),
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        price: Number(defaultValues.price),
      });
    }
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Nome do Produto
        </label>
        <Input
          {...register("title")}
          placeholder="Digite o nome do produto"
          className="border p-2 w-full"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Preço (R$)
        </label>
        <Input
          {...register("price")}
          placeholder="Digite o preço"
          min={0}
          value={watch("price") ?? 0.99}
          type="number"
          className="border p-2 w-full"
          step="0.01"
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Categoria
        </label>
        <select
          {...register("category")}
          className="border p-2 w-full rounded"
          onChange={(e) => setValue("category", e.target.value)}
          disabled={isEditing}
        >
          {categories.map((category) => (
            <option key={category.original} value={category.original}>
              {category.ptbr}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          URL da Imagem
        </label>
        <Input
          {...register("image")}
          placeholder="Cole a URL da imagem do produto"
          className="border p-2 w-full"
        />
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}
      </div>
      {isValidImage && imageUrl.startsWith("http") && (
        <div className="flex flex-col items-center mt-2">
          <p className="text-sm text-gray-600">
            Pré-visualização da imagem (insira a url acima):
          </p>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            <Image
              src={imageUrl}
              alt="Pré-visualização"
              width={200}
              height={200}
              className="mt-2 border rounded-lg shadow-md object-contain cursor-not-allowed"
            />
          </a>
        </div>
      )}
      {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
      <div className="flex gap-4 mt-4">
        <Button
          type="submit"
          className="bg-black  text-white px-4 py-2 rounded w-full"
        >
          {isEditing ? "Atualizar Produto" : "Salvar Produto"}
        </Button>
        <Button
          type="button"
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-full"
          onClick={onClose}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
};
