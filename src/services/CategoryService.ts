import { CategoryTranslation } from "@/enums/categories";
import { Product } from "@/schemas/productSchema";

export class CategoryService {
  static getCategories(products: Product[]) {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category)),
    ];

    return uniqueCategories.map((category) => ({
      original: category,
      ptbr: CategoryTranslation[category] || category,
    }));
  }
}
