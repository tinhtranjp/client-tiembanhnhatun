import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { themeKeys } from "./queries"
import { themeApi } from "./themeApi"

export function useThemeAdd() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => themeApi.add(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: themeKeys.list(),
      })

      toast.success("Thêm chủ đề thành công.")
    },
  })
}
export function useThemeUpdate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => themeApi.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: themeKeys.list(),
      })

      toast.success("Cập nhật chủ đề thành công.")
    },
  })
}

export function useThemeReorder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => themeApi.reorder(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: themeKeys.list(),
      })

      toast.success("Sắp xếp chủ đề thành công.")
    },
  })
}
