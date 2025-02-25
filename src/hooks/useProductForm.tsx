"use client";
import {
  useImageValidation,
  UseImageValidationProps,
} from "./useProductFormImageValidation";
import {
  useProductFormSubmitHandler,
  UseProductFormSubmitHandlerProps,
} from "./useProductFormSubmitHandler";

export type useFormProductsType = UseImageValidationProps &
  UseProductFormSubmitHandlerProps;

export const useFormProducts = ({ ...props }: useFormProductsType) => {
  const { imageError, isValidImage } = useImageValidation({
    imageUrl: props.imageUrl,
    setError: props.setError,
    clearErrors: props.clearErrors,
  });

  const { submitHandler } = useProductFormSubmitHandler({
    onSubmit: props.onSubmit,
    onClose: props.onClose,
    reset: props.reset,
    data: props.data,
  });

  return { imageError, isValidImage, submitHandler };
};
