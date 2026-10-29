import { useQuery } from "@tanstack/react-query"
import { orderApi } from "./orderApi"

export const orderKeys = {
  all: ["orders"],
  lists: () => [...orderKeys.all, "lists"],
  list: (filters) => [...orderKeys.lists(), filters],
  detail: (id) => [...orderKeys.all, "detail", id],
  cakeBaseSummary: () => [...orderKeys.all, "cake_base_summary"],
  countToday: () => [...orderKeys.all, "count_today"],
}
export const useGetOrderDetail = (id) => {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => orderApi.getDetail(id),
    refetchOnWindowFocus: false,
    enabled: !!id,
  })
}

export const useGetCakeBaseSummary = () => {
  return useQuery({
    queryKey: orderKeys.cakeBaseSummary(),
    queryFn: () => orderApi.cakeBaseSumary(),
    refetchOnWindowFocus: false,
  })
}

export const useGetCountToday = () => {
  return useQuery({
    queryKey: orderKeys.countToday(),
    queryFn: () => orderApi.countToday(),
    refetchOnWindowFocus: false,
  })
}
