import { useQuery } from "@tanstack/react-query"
import { hatApi } from "./hatApi"

export const hatKeys = {
  all: ["hats"],

  lists: () => [...hatKeys.all, "lists"],

  list: (params) => [...hatKeys.lists(), params],

  details: (id) => [...hatKeys.all, "details", id],
}

export const useHatGetAll = (params) => {
  return useQuery({
    queryKey: hatKeys.list(params),
    queryFn: () => hatApi.getHats(params),
    refetchOnWindowFocus: false,
  })
}

export const useHatGetDetails = (id) => {
  return useQuery({
    queryKey: hatKeys.details(id),
    queryFn: () => hatApi.getById(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
}
