import { useQuery } from "@tanstack/react-query"
import { storeApi } from "./sotreApi"

export const storeKeys = {
  all: ["store-info"],
}

export const useStoreInfo = () => {
  return useQuery({
    queryKey: storeKeys.all,
    queryFn: async () => {
      const { data } = await storeApi.get()
      console.log(data)
      return data
    },
  })
}
