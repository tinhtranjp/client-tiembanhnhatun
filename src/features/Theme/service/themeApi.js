import { axiosClient } from "@/service/axiosClient"

export const themeApi = {
  getThemes: async () => axiosClient.get("/themes").then((res) => res.data),
  add: (data) => axiosClient.post("/themes", data),
  update: (id, data) => axiosClient.put("/themes/" + id, data),
  reorder: (data) => axiosClient.put("/themes/reorder", data),
}
