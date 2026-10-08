import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { categoryKeys } from "./queries"
import { categoryApi } from "./categoryApi"

export function useCategoryAdd() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => categoryApi.add(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.list(),
      })

      toast.success("Thêm thể loại thành công.")
    },
  })
}
export function useCategoryUpdate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => categoryApi.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.list(),
      })

      toast.success("Cập nhật thể loại thành công.")
    },
  })
}

export function useCategoryReorder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => categoryApi.reorder(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.list(),
      })

      toast.success("Sắp xếp thể loại thành công.")
    },
  })
}
