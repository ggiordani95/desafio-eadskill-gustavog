import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect } from "@jest/globals";
import usePagination from "@/hooks/usePagination";
import { Product } from "@/schemas/productSchema";

describe("Paginação", () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      title: "Produto 1",
      price: 10,
      category: "moda",
      image: "",
      rating: { rate: 4.5, count: 10 },
    },
    {
      id: 2,
      title: "Produto 2",
      price: 20,
      category: "tecnologia",
      image: "",
      rating: { rate: 5.0, count: 8 },
    },
    {
      id: 3,
      title: "Produto 3",
      price: 30,
      category: "moda",
      image: "",
      rating: { rate: 4.0, count: 5 },
    },
    {
      id: 4,
      title: "Produto 4",
      price: 40,
      category: "alimentos",
      image: "",
      rating: { rate: 3.5, count: 7 },
    },
    {
      id: 5,
      title: "Produto 5",
      price: 50,
      category: "moda",
      image: "",
      rating: { rate: 4.2, count: 6 },
    },
  ];

  it("deve mostrar os itens paginados corretamente", async () => {
    const { result } = renderHook(() => usePagination(mockProducts, 2));

    expect(result.current.paginatedItems).toEqual([
      {
        id: 1,
        title: "Produto 1",
        price: 10,
        category: "moda",
        image: "",
        rating: { rate: 4.5, count: 10 },
      },
      {
        id: 2,
        title: "Produto 2",
        price: 20,
        category: "tecnologia",
        image: "",
        rating: { rate: 5.0, count: 8 },
      },
    ]);

    act(() => result.current.nextPage());

    await waitFor(() => {
      expect(result.current.paginatedItems).toEqual([
        {
          id: 3,
          title: "Produto 3",
          price: 30,
          category: "moda",
          image: "",
          rating: { rate: 4.0, count: 5 },
        },
        {
          id: 4,
          title: "Produto 4",
          price: 40,
          category: "alimentos",
          image: "",
          rating: { rate: 3.5, count: 7 },
        },
      ]);
    });
  });

  it("deve ir para a página anterior", async () => {
    const { result } = renderHook(() => usePagination(mockProducts, 2));

    act(() => result.current.nextPage());

    act(() => result.current.prevPage());

    await waitFor(() => {
      expect(result.current.paginatedItems).toEqual([
        {
          id: 1,
          title: "Produto 1",
          price: 10,
          category: "moda",
          image: "",
          rating: { rate: 4.5, count: 10 },
        },
        {
          id: 2,
          title: "Produto 2",
          price: 20,
          category: "tecnologia",
          image: "",
          rating: { rate: 5.0, count: 8 },
        },
      ]);
    });
  });

  it("deve resetar a página após filtrar produtos", async () => {
    const { result } = renderHook(() => usePagination(mockProducts, 2));

    act(() => result.current.nextPage());

    act(() => result.current.resetPage());

    await waitFor(() => {
      expect(result.current.page).toBe(1);
    });
  });
});
