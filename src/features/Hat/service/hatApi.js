import { axiosClient } from "@/lib/axiosClient"

export const hatApi = {
  getHats: (params) => axiosClient.get("/hats", { params }).then((res) => res.data),
  getById: (id) => axiosClient.get("/hats/" + id).then((res) => res.data),
  add: (data) => axiosClient.post("/hats", data),
  update: (id, data) => axiosClient.put("/hats/" + id, data),
  toggleStatus: (id) => axiosClient.patch(`/hats/${id}/status`),
}
