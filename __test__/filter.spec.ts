import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, jest } from "@jest/globals";
import useProductsFilters from "@/hooks/useProductsFilters";
import { Product } from "@/schemas/productSchema";

jest.mock("axios");

describe("Parametrização de filtros", () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      title: "Produto 1",
      price: 50,
      category: "men's clothing",
      image: "",
      rating: { rate: 4.5, count: 10 },
    },
    {
      id: 2,
      title: "Produto 2",
      price: 40,
      category: "electronics",
      image: "",
      rating: { rate: 5.0, count: 8 },
    },
    {
      id: 3,
      title: "Produto 3",
      price: 299,
      category: "men's clothing",
      image: "",
      rating: { rate: 4.0, count: 5 },
    },
    {
      id: 4,
      title: "Produto 4",
      price: 100,
      category: "electronics",
      image: "",
      rating: { rate: 3.5, count: 7 },
    },
  ];

  it("deve filtrar produtos pela categoria", async () => {
    const { result } = renderHook(() => useProductsFilters(mockProducts));

    act(() => {
      result.current.filterByCategory("men's clothing");
    });

    await waitFor(() => {
      expect(result.current.filteredProducts).toEqual([
        {
          id: 1,
          title: "Produto 1",
          price: 50,
          category: "men's clothing",
          image: "",
          rating: { rate: 4.5, count: 10 },
        },
        {
          id: 3,
          title: "Produto 3",
          price: 299,
          category: "men's clothing",
          image: "",
          rating: { rate: 4.0, count: 5 },
        },
      ]);
    });
  });

  it("deve ordenar os produtos por preço (ascendente)", async () => {
    const { result } = renderHook(() => useProductsFilters(mockProducts));

    act(() => {
      result.current.sortByPrice("asc");
    });

    await waitFor(() => {
      expect(result.current.filteredProducts[0].price).toEqual(50);
      expect(result.current.filteredProducts[0].id).toEqual(1);
    });
  });

  it("deve ordenar os produtos por preço (descendente)", async () => {
    const { result } = renderHook(() => useProductsFilters(mockProducts));

    act(() => {
      result.current.sortByPrice("desc");
    });

    await waitFor(() => {
      expect(result.current.filteredProducts[0].price).toEqual(299);
      expect(result.current.filteredProducts[0].id).toEqual(3);
    });
  });
});
