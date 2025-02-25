"use client";

import ProductList from "@/components/ProductList";
import ProductModal from "@/components/ProductModal";
import LoadingPage from "@/components/Loading";
import { ProductProvider, useProductContext } from "@/stores/ProductProvider";
import ProductActions from "@/components/ProductActions";

export default function Home() {
  return (
    <ProductProvider>
      <HomeContent />
    </ProductProvider>
  );
}

function HomeContent() {
  const { products, loading, deleteProduct } = useProductContext();

  if (loading) return <LoadingPage />;

  return (
    <div className="container mx-auto p-4 bg-gray-100 w-screen mb-10">
      <h1 className="text-4xl font-bold mt-3 mb-6">Gustavo Giordani Store</h1>
      <ProductActions />
      <ProductList
        products={products}
        onEdit={() => {}}
        onDelete={deleteProduct}
      />
      <ProductModal />
    </div>
  );
}
