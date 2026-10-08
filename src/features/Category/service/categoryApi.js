import { axiosClient } from "@/service/axiosClient"

export const categoryApi = {
  getCategories: () => axiosClient.get("/categories").then((res) => res.data),
  add: (data) => axiosClient.post("/categories", data),
  update: (id, data) => axiosClient.put("/categories/" + id, data),
  reorder: (data) => axiosClient.put("/categories/reorder", data),
}
