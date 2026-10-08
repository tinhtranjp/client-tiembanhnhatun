import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { productApi } from "./productApi"
import { productKeys } from "./queries"

export function useProductAdd() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => productApi.add(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.list(),
      })

      toast.success("Thêm sản phẩm thành công.")
    },
  })
}

export function useProductUpdate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => productApi.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(variables.id),
      })

      queryClient.invalidateQueries({
        queryKey: productKeys.list(),
      })

      toast.success("Cập nhật sản phẩm thành công.")
    },
  })
}
