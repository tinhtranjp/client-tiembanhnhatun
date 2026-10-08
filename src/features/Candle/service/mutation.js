import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { candleApi } from "./candleApi"
import { candleKeys } from "./queries"

export function useCandleAdd() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data) => candleApi.add(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: candleKeys.list(),
      })

      toast.success("Thêm nến thành công.")
    },
  })
}

export function useCandleUpdate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => candleApi.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: candleKeys.list(),
      })

      toast.success("Cập nhật nến thành công.")
    },
  })
}

export function useCandleToggleStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id) => candleApi.toggleStatus(id),

    onSuccess: (response, id) => {
      const newStatus = response.data.data.status

      queryClient.setQueriesData(
        {
          queryKey: candleKeys.lists(),
        },
        (oldData) => {
          if (!oldData) return oldData

          return {
            ...oldData,
            data: {
              ...oldData.data,
              candles: oldData.data.candles.map((candle) =>
                Number(candle.id) === Number(id)
                  ? {
                      ...candle,
                      status: newStatus,
                    }
                  : candle,
              ),
            },
          }
        },
      )

      toast.success("Cập nhật trạng thái nến thành công.")
    },
  })
}
