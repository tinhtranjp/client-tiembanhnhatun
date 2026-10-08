import { useQuery } from "@tanstack/react-query"
import { memoApi } from "./memoApi"

export const memoKeys = {
  all: ["memos"],

  lists: () => [...memoKeys.all, "lists"],

  list: (params) => [...memoKeys.lists(), params],

  details: (id) => [...memoKeys.all, "details", id],
}

export const useMemoGetAll = (params) => {
  return useQuery({
    queryKey: memoKeys.list(params),
    queryFn: () => memoApi.getMemos(params),
    refetchOnWindowFocus: false,
  })
}

export const useMemoGetDetails = (id) => {
  return useQuery({
    queryKey: memoKeys.details(id),
    queryFn: () => memoApi.getById(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
}
