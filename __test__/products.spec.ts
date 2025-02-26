import { renderHook, act, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, jest } from "@jest/globals";
import useProductsData from "@/hooks/useProductsData";
import axios from "axios";
import { NotificationService } from "@/services/NotificationService";

jest.mock("axios");

describe("Ações de Produtos", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve buscar produtos e armazenar no estado", async () => {
    const mockProducts = [
      {
        id: 1,
        title: "Produto 1",
        price: 10,
        category: "men's clothing",
        image: "",
        rating: { rate: 4.5, count: 10 },
      },
      {
        id: 2,
        title: "Produto 2",
        price: 20,
        category: "men's clothing",
        image: "",
        rating: { rate: 5.0, count: 8 },
      },
      {
        id: 3,
        title: "Produto 3",
        price: 30,
        category: "men's clothing",
        image: "",
        rating: { rate: 4.0, count: 5 },
      },
    ];

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: mockProducts,
    });

    const { result } = renderHook(() => useProductsData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.products.length).toBe(3);
  });

  it("deve adicionar um novo produto", async () => {
    (
      axios.post as jest.MockedFunction<typeof axios.post>
    ).mockResolvedValueOnce({
      data: {
        id: 4,
        title: "Produto 4",
        price: 40,
        category: "men's clothing",
        image: "",
        rating: { rate: 3.0, count: 2 },
      },
    });

    const { result } = renderHook(() => useProductsData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products.length).toBe(3);

    act(() => {
      result.current.addProduct({
        title: "Produto 4",
        price: 40,
        category: "men's clothing",
        image: "",
        description: "Sem descrição",
      });
    });
    await waitFor(() => {
      expect(result.current.products.length).toBe(4);
    });
    const createdProduct = result.current.products[3];
    expect(createdProduct).toEqual({
      id: 4,
      title: "Produto 4",
      price: 40,
      category: "men's clothing",
      image: "",
      rating: { rate: 3.0, count: 2 },
    });
  });

  it("deve deletar um produto", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      data: {
        id: 4,
        title: "Produto 4",
        price: 40,
        category: "men's clothing",
        image: "",
        rating: { rate: 3.0, count: 2 },
      },
    });

    (
      axios.delete as jest.MockedFunction<typeof axios.delete>
    ).mockResolvedValueOnce({});

    jest.spyOn(NotificationService, "confirmDelete").mockReturnValue(true);

    const { result } = renderHook(() => useProductsData());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products.length - 1).toBe(3);

    act(() => {
      result.current.deleteProduct(1);
    });

    await waitFor(() => {
      expect(result.current.products.length - 1).toBe(2);
      expect(result.current.products.find((p) => p.id === 1)).toBeUndefined();
    });
  });
});
