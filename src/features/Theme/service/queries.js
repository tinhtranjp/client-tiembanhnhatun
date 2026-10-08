import { useQuery } from "@tanstack/react-query"

import { themeApi } from "./themeApi"
export const themeKeys = {
  all: ["themes"],
  list: () => [...themeKeys.all, "lists"],
}

export const useThemeGetAll = () => {
  return useQuery({
    queryKey: themeKeys.list(),
    queryFn: themeApi.getThemes,
    refetchOnWindowFocus: false,
  })
}
