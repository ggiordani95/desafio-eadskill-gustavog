"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { productSchema } from "@/schemas/productSchema";
import Image from "next/image";
import { useFormProducts } from "@/hooks/useProductForm";

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
  // Form
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  // Imagem
  const imageUrl = watch("image", defaultValues?.image || "").trim();

  const { imageError, isValidImage, submitHandler } = useFormProducts({
    imageUrl,
    setError,
    clearErrors,
    onSubmit,
    onClose,
    reset,
    data: watch(),
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
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
          {...register("price", { valueAsNumber: true })}
          placeholder="Digite o preço"
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
        <Input
          {...register("category")}
          placeholder="Digite a categoria"
          className="border p-2 w-full"
          disabled={isEditing}
        />
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
          <p className="text-sm text-gray-600">Pré-visualização da imagem:</p>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            <Image
              src={imageUrl}
              alt="Pré-visualização"
              width={200}
              height={200}
              className="mt-2 border rounded-lg shadow-md object-contain"
            />
          </a>
        </div>
      )}
      {imageError && <p className="text-red-500 text-sm">{imageError}</p>}
      <div className="flex gap-4 mt-4">
        <Button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
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
