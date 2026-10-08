import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { hatApi } from "./hatApi"
import { hatKeys } from "./queries"

export function useHatAdd() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => hatApi.add(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: hatKeys.list(),
      })

      toast.success("Thêm mũ thành công.")
    },
  })
}

export function useHatUpdate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => hatApi.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: hatKeys.list(),
      })

      toast.success("Cập nhật mũ thành công.")
    },
  })
}

export function useHatToggleStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => hatApi.toggleStatus(id),

    onSuccess: (response, id) => {
      const newStatus = response.data.data.status

      queryClient.setQueriesData(
        {
          queryKey: hatKeys.lists(),
        },
        (oldData) => {
          if (!oldData) return oldData

          return {
            ...oldData,
            data: {
              ...oldData.data,
              hats: oldData.data.hats.map((hat) =>
                Number(hat.id) === Number(id)
                  ? {
                      ...hat,
                      status: newStatus,
                    }
                  : hat,
              ),
            },
          }
        },
      )

      toast.success("Cập nhật trạng thái mũ thành công.")
    },
  })
}
