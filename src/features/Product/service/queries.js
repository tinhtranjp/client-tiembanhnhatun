import { useQuery } from "@tanstack/react-query"
import { productApi } from "./productApi"
export const productKeys = {
  all: ["products"],
  list: (filters) => [...productKeys.all, "lists", filters],
  detail: (id) => [...productKeys.all, "detail", id],
}

export const useGetProductList = (filters) => {
  return useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => productApi.getProductList(filters),
    refetchOnWindowFocus: false,
  })
}

export const useGetProductDetail = (id) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productApi.getDetail(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
}
