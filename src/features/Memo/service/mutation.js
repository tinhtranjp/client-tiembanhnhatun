import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { memoApi } from "./memoApi"
import { memoKeys } from "./queries"

export function useMemoAdd() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => memoApi.add(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memoKeys.lists(),
      })

      toast.success("Thêm memo thành công.")
    },
  })
}

export function useMemoUpdate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => memoApi.update(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: memoKeys.lists(),
      })

      queryClient.invalidateQueries({
        queryKey: memoKeys.details(variables.id),
      })

      toast.success("Cập nhật memo thành công.")
    },
  })
}

export function useMemoDelete() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => memoApi.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: memoKeys.lists(),
      })

      toast.success("Xóa memo thành công.")
    },
  })
}
