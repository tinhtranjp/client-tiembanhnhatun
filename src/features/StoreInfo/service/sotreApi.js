import { axiosClient } from "@/lib/axiosClient"

export const storeApi = {
  get: () => axiosClient.get("/store-info"),
  update: (payload) => axiosClient.put("/store-info", payload),
}
