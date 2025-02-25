"use client";
import { useState, useEffect, useCallback } from "react";
import { UseFormSetError, UseFormClearErrors } from "react-hook-form";

export type UseImageValidationProps = {
  imageUrl: string;
  setError: UseFormSetError<{ image: string }>;
  clearErrors: UseFormClearErrors<{ image: string }>;
};

export const useImageValidation = ({
  imageUrl,
  setError,
  clearErrors,
}: UseImageValidationProps) => {
  const [imageError, setImageError] = useState<string | null>(null);
  const [isValidImage, setIsValidImage] = useState(false);

  const validateImageUrl = useCallback(
    async (url: string) => {
      if (!url || url.length < 5) {
        setIsValidImage(false);
        setImageError("URL inválida");
        setError("image", { type: "manual", message: "URL inválida" });
        return;
      }
      try {
        const parsedUrl = new URL(url);
        if (!parsedUrl.protocol.startsWith("http")) {
          throw new Error("A URL deve começar com http:// ou https://");
        }
      } catch {
        setImageError("URL inválida");
        setIsValidImage(false);
        return;
      }
      try {
        const response = await fetch(url, { method: "HEAD" });
        if (!response.ok) throw new Error("Imagem não acessível");
        setImageError(null);
        setIsValidImage(true);
        clearErrors("image");
      } catch {
        setIsValidImage(false);
      }
    },
    [setError, clearErrors]
  );

  useEffect(() => {
    if (imageUrl) {
      validateImageUrl(imageUrl);
    } else {
      setIsValidImage(false);
    }
  }, [imageUrl, validateImageUrl]);

  return { imageError, isValidImage };
};
