import { useQuery } from "@tanstack/react-query"
import { categoryApi } from "./categoryApi"

export const categoryKeys = {
  all: ["categories"],
  list: () => [...categoryKeys.all, "lists"],
}

export const useCategoryGetAll = () => {
  return useQuery({
    queryKey: categoryKeys.list(),
    queryFn: categoryApi.getCategories,
    refetchOnWindowFocus: false,
  })
}
