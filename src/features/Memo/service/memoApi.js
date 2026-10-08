import { axiosClient } from "@/lib/axiosClient"

export const memoApi = {
  getMemos: (params) =>
    axiosClient.get("/memos", {
      params,
    }),

  getById: (id) => axiosClient.get(`/memos/${id}`),

  add: (data) => axiosClient.post("/memos", data),

  update: (id, data) => axiosClient.put(`/memos/${id}`, data),

  delete: (id) => axiosClient.delete(`/memos/${id}`),
}
