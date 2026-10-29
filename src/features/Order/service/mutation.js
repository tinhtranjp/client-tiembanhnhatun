import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { orderApi } from "./orderApi"
import { orderKeys } from "./queries"
import { getToastError } from "@/helper/erorApi"

export function useOrdersAdd() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => orderApi.add(data),

    onSuccess: () => {
      toast.success("Thêm đơn hàng thành công")

      queryClient.invalidateQueries({
        queryKey: orderKeys.all,
      })
    },
  })
}

export function useOrdersUpdate() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }) => orderApi.update(id, data),

    onSuccess: () => {
      toast.success("Cập nhật đơn hàng thành công.")

      queryClient.invalidateQueries({
        queryKey: orderKeys.all,
      })
    },
  })
}
function updateOrderInCache(oldData, id, changes) {
  if (!oldData) return oldData

  const updateOrder = (order) => (String(order.id) === String(id) ? { ...order, ...changes } : order)

  // Dạng response: { items: [...], pagination: {...} }
  if (Array.isArray(oldData.items)) {
    return {
      ...oldData,
      items: oldData.items.map(updateOrder),
    }
  }

  // Dạng response: { data: { orders: [...] } }
  if (Array.isArray(oldData.data?.orders)) {
    return {
      ...oldData,
      data: {
        ...oldData.data,
        orders: oldData.data.orders.map(updateOrder),
      },
    }
  }

  // Dạng response: { orders: [...] }
  if (Array.isArray(oldData.orders)) {
    return {
      ...oldData,
      orders: oldData.orders.map(updateOrder),
    }
  }

  // Dạng response: [...]
  if (Array.isArray(oldData)) {
    return oldData.map(updateOrder)
  }

  return oldData
}

export function useOrdersUpdateStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, orderStatus }) => orderApi.updateStatus(id, orderStatus),

    onSuccess: (_, { id, orderStatus }) => {
      toast.success("Cập nhật trạng thái đơn hàng thành công.")

      const updateStatus = (order) => ({
        ...order,
        orderStatus,
      })

      // Cập nhật danh sách
      queryClient.setQueriesData({ queryKey: orderKeys.lists() }, (oldData) => {
        if (!oldData || !Array.isArray(oldData.items)) return oldData

        return {
          ...oldData,
          items: oldData.items.map((order) => (String(order.id) === String(id) ? updateStatus(order) : order)),
        }
      })

      // Cập nhật chi tiết đơn hàng
      queryClient.setQueryData(orderKeys.detail(id), (oldData) => {
        if (!oldData) return oldData

        // API detail trả về trực tiếp object đơn hàng
        if (String(oldData.id) === String(id)) {
          return updateStatus(oldData)
        }

        // API detail bọc object đơn hàng trong data
        if (String(oldData.data?.id) === String(id)) {
          return {
            ...oldData,
            data: updateStatus(oldData.data),
          }
        }

        return oldData
      })
    },

    onError: (error) => {
      getToastError(error)
    },
  })
}

export function useOrdersTogglePaymentStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id }) => orderApi.togglePaymentStatus(id),
    onSuccess: (_, { id }) => {
      toast.success("Cập nhật trạng thái thanh toán thành công.")

      const toggleStatus = (order) => ({
        ...order,
        paymentStatus: order.paymentStatus === "UNPAID" ? "PAID" : "UNPAID",
      })

      // Cập nhật danh sách
      queryClient.setQueriesData({ queryKey: orderKeys.lists() }, (oldData) => {
        if (!oldData || !Array.isArray(oldData.items)) return oldData

        return {
          ...oldData,
          items: oldData.items.map((order) => (String(order.id) === String(id) ? toggleStatus(order) : order)),
        }
      })

      // Cập nhật chi tiết đơn hàng
      queryClient.setQueryData(orderKeys.detail(id), (oldData) => {
        if (!oldData) return oldData

        // Nếu API detail trả về trực tiếp object đơn hàng
        if (String(oldData.id) === String(id)) {
          return toggleStatus(oldData)
        }

        // Nếu API detail bọc đơn hàng trong data
        if (String(oldData.data?.id) === String(id)) {
          return {
            ...oldData,
            data: toggleStatus(oldData.data),
          }
        }

        return oldData
      })
    },

    onError: (error) => {
      getToastError(error)
    },
  })
}
// export function useOrdersUpdateStatus() {
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: ({ id, orderStatus }) => orderApi.updateStatus(id, orderStatus),
//
//     onSuccess: () => {
//       toast.success("Cập nhật trạng thái đơn hàng thành công.")
//
//       queryClient.invalidateQueries({
//         queryKey: orderKeys.all,
//       })
//     },
//     onError: (error) => {
//       getToastError(error)
//     },
//   })
// }
//
export function useOrdersToggleItemStatus() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id }) => orderApi.toggleItemStatus(id),

    onSuccess: () => {
      toast.success("Cập nhật trạng thái Item Status thành công.")

      queryClient.invalidateQueries({
        queryKey: orderKeys.all,
      })
    },
    onError: (error) => {
      getToastError(error)
    },
  })
}
