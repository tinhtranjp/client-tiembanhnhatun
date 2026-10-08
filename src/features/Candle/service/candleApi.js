import { axiosClient } from "@/lib/axiosClient"

export const candleApi = {
  getCandles: (params) => axiosClient.get("/candles", { params }).then((res) => res.data),
  getById: (id) => axiosClient.get("/candles/" + id).then((res) => res.data),
  add: (data) => axiosClient.post("/candles", data),
  update: (id, data) => axiosClient.put("/candles/" + id, data),
  toggleStatus: (id) => axiosClient.patch(`/candles/${id}/status`),
}
