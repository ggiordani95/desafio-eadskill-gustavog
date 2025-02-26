import { z } from "zod";

export const productSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres"),
  price: z.coerce.number().positive("O preço deve ser positivo"),
  category: z.string().nonempty("A categoria é obrigatória"),
  image: z.string().url("A imagem deve ser uma URL válida"),
  description: z.string().optional(),
  rating: z
    .object({
      rate: z.number().min(0).max(5),
      count: z.number().min(0),
    })
    .optional(),
});

export type Product = z.infer<typeof productSchema>;
export type ProductRequest = Omit<Product, "rating" | "id">;
