import { axiosClient } from "@/lib/axiosClient"

export const collectionApi = {
  // GET /collections
  getAll: () => axiosClient.get("/collections").then((res) => res?.data?.data),
  getAllWithProducts: () => axiosClient.get("/collections/with-products").then((res) => res?.data),
  // GET /collections/:slug
  getBySlug: (slug) => axiosClient.get(`/collections/${slug}`).then((res) => res?.data),

  // GET /collections/:slug/products
  getProducts: (slug) => axiosClient.get(`/collections/${slug}/products`).then((res) => res?.data),

  // POST /collections/:id/products
  addProduct: (id, data) => axiosClient.post(`/collections/${id}/products`, data).then((res) => res?.data),

  // DELETE /collections/:id/products/:productId
  removeProduct: (id, productId) =>
    axiosClient.delete(`/collections/${id}/products/${productId}`).then((res) => res?.data),

  // PUT /collections/:id/products/reorder
  reorderProducts: (id, productIds) =>
    axiosClient.put(`/collections/${id}/products/reorder`, { productIds }).then((res) => res?.data),

  // PUT /collections/:id/products
  replaceProducts: (id, products) =>
    axiosClient.put(`/collections/${id}/products`, { products }).then((res) => res?.data),

  // PATCH /collections/:id/products/:productId
  updateQuantity: (id, productId, data) =>
    axiosClient.patch(`/collections/${id}/products/${productId}`, data).then((res) => res?.data),
}
