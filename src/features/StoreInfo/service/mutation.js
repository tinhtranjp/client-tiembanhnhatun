import { useMutation, useQueryClient } from "@tanstack/react-query"
import { storeApi } from "./sotreApi"
import { storeKeys } from "./queries"

export const useUpdateStoreInfo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await storeApi.update(payload)
      return data.data
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: storeKeys.all,
      })
    },
  })
}
