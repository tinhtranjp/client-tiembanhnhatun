import { useQuery } from "@tanstack/react-query"
import { collectionApi } from "./collectionApi"

export const collectionKeys = {
  all: ["collections"],

  lists: () => [...collectionKeys.all, "lists"],

  details: () => [...collectionKeys.all, "details"],

  withProducts: () => [...collectionKeys.all, "with-products"],

  detail: (slug) => [...collectionKeys.details(), slug],

  products: () => [...collectionKeys.all, "products"],

  productList: (slug) => [...collectionKeys.products(), slug],
}

// GET /collections
export const useCollectionGetAll = () => {
  return useQuery({
    queryKey: collectionKeys.lists(),
    queryFn: () => collectionApi.getAll(),
    refetchOnWindowFocus: false,
  })
}

// GET /collections/:slug
export const useCollectionGetDetails = (slug) => {
  return useQuery({
    queryKey: collectionKeys.detail(slug),
    queryFn: () => collectionApi.getBySlug(slug),
    refetchOnWindowFocus: false,
    enabled: !!slug,
  })
}

// GET /collections/:slug/products
export const useCollectionGetProducts = (slug) => {
  return useQuery({
    queryKey: collectionKeys.productList(slug),
    queryFn: () => collectionApi.getProducts(slug),
    refetchOnWindowFocus: false,
    enabled: !!slug,
  })
}

export const useCollectionGetAllWithProducts = () => {
  return useQuery({
    queryKey: collectionKeys.withProducts(),
    queryFn: () => collectionApi.getAllWithProducts(),
    refetchOnWindowFocus: false,
  })
}
