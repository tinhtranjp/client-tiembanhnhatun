import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { collectionApi } from "./collectionApi"
import { collectionKeys } from "./querries"
import { getToastError } from "@/helper/erorApi"
import AddIcon from "@mui/icons-material/Add"
export function useCollectionAddProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }) => collectionApi.addProduct(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: collectionKeys.productList?.(variables.id),
      })

      queryClient.invalidateQueries({
        queryKey: collectionKeys.products(),
      })

      toast.success("Thêm sản phẩm vào bộ sưu tập thành công.")
    },
    onError: (error) => {
      getToastError(error)
    },
  })
}

export function useCollectionUpdateQuantity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, productId, data }) => collectionApi.updateQuantity(id, productId, data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: collectionKeys.all,
      })

      toast.success("Cập nhật số lượng thành công.")
    },

    onError: (error) => {
      getToastError(error)
    },
  })
}
// DELETE - Xóa sản phẩm
export function useCollectionRemoveProduct() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, productId }) => collectionApi.removeProduct(id, productId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: collectionKeys.all,
      })

      toast.success("Xóa sản phẩm khỏi bộ sưu tập thành công.")
    },

    onError: (error) => {
      getToastError(error)
    },
  })
}

// PUT - Reorder sản phẩm
export function useCollectionReorderProducts() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, productIds }) => collectionApi.reorderProducts(id, productIds),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: collectionKeys.all,
      })

      toast.success("Sắp xếp sản phẩm thành công.")
    },

    onError: (error) => {
      getToastError(error)
    },
  })
}

// PUT - Thay thế toàn bộ sản phẩm
export function useCollectionReplaceProducts() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, products }) => collectionApi.replaceProducts(id, products),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: collectionKeys.products(),
      })

      toast.success("Cập nhật bộ sưu tập thành công.")
    },

    onError: (error) => {
      getToastError(error)
    },
  })
}
