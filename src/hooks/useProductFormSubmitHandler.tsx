"use client";

import { productSchema } from "@/schemas/productSchema";
import { z } from "zod";

export type UseProductFormSubmitHandlerProps = {
  data: z.infer<typeof productSchema>;
  onSubmit: (data: z.infer<typeof productSchema>) => void;
  onClose: () => void;
  reset: () => void;
};

export const useProductFormSubmitHandler = (
  props: UseProductFormSubmitHandlerProps
) => {
  const submitHandler = async () => {
    try {
      props.onSubmit(props.data);
      props.reset();
      props.onClose();
    } catch (error) {
      console.error("Erro ao enviar formulário", error);
    }
  };

  return { submitHandler };
};
