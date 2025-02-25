"use client";

import useProductModal from "@/hooks/useProductModal";
import { ProductForm } from "@/components/ProductForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useProducts from "@/hooks/useProducts";

export default function ProductModal() {
  const { showModal, editingProduct, closeModal } = useProductModal();
  const { addProduct, updateProduct } = useProducts();

  return (
    <Dialog open={showModal} onOpenChange={closeModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingProduct ? "Editar Produto" : "Adicionar Produto"}
          </DialogTitle>
        </DialogHeader>
        <ProductForm
          isEditing={!!editingProduct}
          defaultValues={editingProduct || undefined}
          onSubmit={(data) => {
            if (editingProduct) {
              updateProduct(editingProduct.id, data);
            } else {
              addProduct(data);
            }
            closeModal();
          }}
          onClose={closeModal}
        />
      </DialogContent>
    </Dialog>
  );
}
