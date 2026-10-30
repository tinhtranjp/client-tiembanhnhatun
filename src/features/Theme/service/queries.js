import { useQuery } from "@tanstack/react-query"

import { themeApi } from "./themeApi"
export const themeKeys = {
  all: ["themes"],
  list: () => [...themeKeys.all, "lists"],
  byIds: (ids) => [...themeKeys.all, "by-ids", ids],
}

export const useThemeGetAll = () => {
  return useQuery({
    queryKey: themeKeys.list(),
    queryFn: themeApi.getThemes,
    refetchOnWindowFocus: false,
  })
}

export const useThemeGetByIds = (ids = []) => {
  return useQuery({
    queryKey: themeKeys.byIds(ids),
    queryFn: () => themeApi.getByIds(ids),
    refetchOnWindowFocus: false,
    enabled: ids.length > 0,
  })
}
