import { axiosClient } from "@/lib/axiosClient"

export const productApi = {
  getProducts: () => axiosClient.get("/products").then((res) => res.data),
  add: (data) => {
    return axiosClient.post("/products", data)
  },
  reorder: (data) => axiosClient.put("/products/reorder", data),
  uploadImages: (id, files) => {
    const formData = new FormData()

    files.forEach((item) => {
      formData.append("files", item.file)
    })

    return axiosClient.post(`/products/${id}/images`, formData)
  },
  getProductList: (filters) =>
    axiosClient
      .get("/products/product-list", {
        params: filters,
      })
      .then((res) => res.data),

  getDetail: (id) => axiosClient.get("/products/" + id).then((res) => res.data),
  update: (id, data) => axiosClient.put(`/products/${id}`, data),
}
