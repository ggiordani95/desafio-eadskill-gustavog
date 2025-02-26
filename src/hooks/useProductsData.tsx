import { useState, useEffect } from "react";
import { Product, ProductRequest } from "@/schemas/productSchema";
import { ProductService } from "@/services/ProductService";
import { NotificationService } from "@/services/NotificationService";
import { CategoryService } from "@/services/Category";
import { NotificationType } from "@/enums/notifications";

export default function useProductsData() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        const fetchedProducts = await ProductService.fetchProducts();
        setProducts(fetchedProducts);
        localStorage.setItem("products", JSON.stringify(fetchedProducts));
      } catch {
        NotificationService.showMessage(
          NotificationType.ERROR,
          "Erro ao buscar os produtos"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const addProduct = async (product: ProductRequest) => {
    try {
      const newProduct = await ProductService.addProduct(product);
      saveProducts([...products, { ...newProduct, id: products.length + 1 }]);
      NotificationService.showMessage(
        NotificationType.SUCCESS,
        "Produto adicionado com sucesso"
      );
    } catch {
      NotificationService.showMessage(
        NotificationType.ERROR,
        "Erro ao adicionar o produto"
      );
    }
  };

  const deleteProduct = async (id: number) => {
    if (NotificationService.confirmDelete()) {
      try {
        await ProductService.deleteProduct(id);
        saveProducts(products.filter((product) => product.id !== id));
        NotificationService.showMessage(
          NotificationType.INFO,
          "Produto removido com sucesso"
        );
      } catch {
        NotificationService.showMessage(
          NotificationType.ERROR,
          "Erro ao excluir o produto"
        );
      }
    }
  };

  const updateProduct = async (id: number, updatedProduct: Product) => {
    try {
      const updated = await ProductService.updateProduct(id, updatedProduct);
      const sanitizedUpdated = {
        ...updated,
        price: Number(updated.price) || 0,
      };
      saveProducts(
        products.map((product) =>
          product.id === id ? { ...product, ...sanitizedUpdated } : product
        )
      );
      NotificationService.showMessage(
        NotificationType.SUCCESS,
        "Produto alterado com sucesso"
      );
    } catch {
      NotificationService.showMessage(
        NotificationType.ERROR,
        "Erro ao editar produto"
      );
    }
  };

  return {
    products,
    loading,
    addProduct,
    deleteProduct,
    updateProduct,
    getProductById: (id: number) =>
      products.find((product) => product.id === id) || null,
    getCategories: () => CategoryService.getCategories(products),
  };
}
