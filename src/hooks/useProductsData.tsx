import { useState, useEffect } from "react";
import { Product, ProductRequest } from "@/schemas/productSchema";
import { ProductAPI } from "@/services/ProductAPI";
import { LocalStorageService } from "@/services/LocalStorageService";
import NotificationService from "@/services/NotificationService";
import { CategoryService } from "@/services/Category";
import { NotificationType } from "@/enums/notifications";

export default function useProductsData() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const productsService = new LocalStorageService<Product>("products");

  useEffect(() => {
    const savedProducts = productsService.getValue();
    if (savedProducts.length > 0) {
      setProducts(savedProducts);
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        const fetchedProducts = await ProductAPI.fetchProducts();
        setProducts(fetchedProducts);
        productsService.saveItems(fetchedProducts);
      } catch {
        NotificationService.showMessage(
          NotificationType.ERROR,
          "Erro ao buscar produtos"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    productsService.saveItems(updatedProducts);
  };

  const addProduct = async (product: ProductRequest) => {
    try {
      const newProduct = await ProductAPI.addProduct(product);
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
        await ProductAPI.deleteProduct(id);
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
      const updated = await ProductAPI.updateProduct(id, updatedProduct);
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
