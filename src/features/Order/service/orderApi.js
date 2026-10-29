import { axiosClient } from "@/lib/axiosClient"

export const orderApi = {
  add: (data) => axiosClient.post("/orders", data),
  getDetail: (id) => axiosClient.get(`/orders/${id}`).then((res) => res.data),
  search: (filters) => axiosClient.post("/orders/search", filters).then((res) => res.data.data),
  update: (id, data) => axiosClient.put(`/orders/${id}`, data),
  updateStatus: (id, orderStatus) =>
    axiosClient.patch(`/orders/${id}/status`, {
      orderStatus,
    }),
  togglePaymentStatus: (id) => axiosClient.patch(`/orders/${id}/payment-status`),
  toggleItemStatus: (id) => axiosClient.patch(`/orders/${id}/item-status`),
  cakeBaseSumary: () => axiosClient.get(`/orders/cake-summary`).then((res) => res.data),
}
