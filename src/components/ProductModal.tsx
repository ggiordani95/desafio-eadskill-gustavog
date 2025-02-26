"use client";

import { ProductForm } from "@/components/ProductForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProductModalContext } from "@/stores/ProductModalProvider";
import { useProductContext } from "@/stores/ProductProvider";

export default function ProductModal() {
  const { showModal, editingProduct, closeModal } = useProductModalContext();
  const { addProduct, updateProduct } = useProductContext();

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
          onSubmit={async (data) => {
            if (editingProduct && editingProduct.id) {
              await updateProduct(editingProduct.id, data);
            } else {
              await addProduct(data);
            }
            closeModal();
          }}
          onClose={closeModal}
        />
      </DialogContent>
    </Dialog>
  );
}
