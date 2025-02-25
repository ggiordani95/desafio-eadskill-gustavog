import { z } from "zod";

export const productSchema = z.object({
  id: z.number().positive("O ID deve ser um número positivo"),
  title: z
    .string()
    .max(30, "O nome do produto deve ter no máximo 30 caracteres"),
  price: z.coerce.number().positive("O preço deve ser um valor positivo"),
  category: z.string().nonempty("A categoria é obrigatória"),
  image: z.string().url("A imagem deve ser uma URL válida"),
  rating: z.object({
    rate: z.number().min(0).max(5, "A avaliação deve estar entre 0 e 5"),
    count: z.number().min(0, "O número de avaliações não pode ser negativo"),
  }),
});

export type Product = z.infer<typeof productSchema>;
export type ProductRequest = Omit<Product, "rating" | "id">;
