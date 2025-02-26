import axios from "axios";
import { Product, ProductRequest } from "@/schemas/productSchema";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export class ProductAPI {
  static async fetchProducts(): Promise<Product[]> {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  }

  static async addProduct(product: ProductRequest): Promise<Product> {
    const response = await axios.post(`${API_URL}/products`, product);
    return response.data;
  }

  static async updateProduct(
    id: number,
    updatedProduct: Product
  ): Promise<Product> {
    const response = await axios.put(
      `${API_URL}/products/${id}`,
      updatedProduct
    );
    return response.data;
  }

  static async deleteProduct(id: number): Promise<void> {
    await axios.delete(`${API_URL}/products/${id}`);
  }
}
