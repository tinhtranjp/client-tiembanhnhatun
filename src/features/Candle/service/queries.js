import { useQuery } from "@tanstack/react-query"
import { candleApi } from "./candleApi"

export const candleKeys = {
  all: ["candles"],

  lists: () => [...candleKeys.all, "lists"],

  list: (params) => [...candleKeys.lists(), params],

  details: (id) => [...candleKeys.all, "details", id],
}

export const useCandleGetAll = (params) => {
  return useQuery({
    queryKey: candleKeys.list(params),
    queryFn: () => candleApi.getCandles(params),
    refetchOnWindowFocus: false,
  })
}

export const useCandleGetDetails = (id) => {
  return useQuery({
    queryKey: candleKeys.details(id),
    queryFn: () => candleApi.getById(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
}
