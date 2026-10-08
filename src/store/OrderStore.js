import { create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

export const useOrderStore = create(
  persist(
    immer((set) => ({
      preOrderFlag: false,
      scheduledDate: null,
      deposit: 0,
      note: "",
      orderDetails: [], // danh sách sản phẩm

      // ====== ACTIONS ======

      setPreOrderFlag: (flag) =>
        set((state) => {
          state.preOrderFlag = flag
        }),

      setScheduledDate: (date) =>
        set((state) => {
          state.scheduledDate = date
        }),

      setDeposit: (amount) =>
        set((state) => {
          state.deposit = amount
        }),

      setNote: (note) =>
        set((state) => {
          state.note = note
        }),

      // 👉 Tăng số lượng
      increaseQuantity: (id) =>
        set((state) => {
          const existing = state.orderDetails.find((i) => i.id === id)
          if (existing) {
            existing.quantity = Number(existing.quantity) + 1
          }
        }),

      // 👉 Giảm số lượng (không giảm dưới 1)
      decreaseQuantity: (id) =>
        set((state) => {
          const existing = state.orderDetails.find((i) => i.id === id)
          if (existing && existing.quantity > 1) {
            existing.quantity = Number(existing.quantity) - 1
          }
        }),

      // 👉 Nhập số lượng trực tiếp
      onChangeQuantity: (id, qtt) =>
        set((state) => {
          const existing = state.orderDetails.find((i) => i.id === id)
          if (existing) {
            existing.quantity = Number(qtt) || 0
          }
        }),

      // 👉 Thêm sản phẩm (nếu trùng itemId thì cộng dồn số lượng)
      addOrderDetail: (item) =>
        set((state) => {
          state.orderDetails.push(item)
        }),

      // 👉 Cập nhật sản phẩm
      updateOrderDetail: (id, updatedData) =>
        set((state) => {
          const target = state.orderDetails.find((i) => i.id === id)
          if (target) Object.assign(target, updatedData)
        }),

      // 👉 Xoá sản phẩm
      removeOrderDetail: (id) =>
        set((state) => {
          state.orderDetails = state.orderDetails.filter((i) => i.id !== id)
        }),

      // 👉 Reset toàn bộ đơn
      resetOrder: () => {
        set(() => ({
          preOrderFlag: false,
          scheduledDate: null,
          deposit: 0,
          note: "",
          orderDetails: [],
        }))
      },
    })),
    {
      name: "order-store", // lưu trong localStorage
    },
  ),
)

// ✅ Hook selectors
export const getResultPrice = (order) => {
  let resultPrice

  if (order?.discountAmount > 0) {
    resultPrice = order?.price - order.discountAmount
  } else {
    resultPrice = order?.price * (1 - (order?.discountPercent || 0) / 100)
  }
  return resultPrice
}
export const useItems = () => useOrderStore((state) => state.orderDetails || [])
export const useOrderById = (id) => useOrderStore((state) => state.orderDetails.find((o) => o?.id === id))

export const useTotalAmount = () =>
  useOrderStore((state) => state.orderDetails.reduce((total, item) => total + getResultPrice(item) * item.quantity, 0))
export const useAddItemToOrder = () => useOrderStore((state) => state.addOrderDetail)
export const useResetAllOrder = () => useOrderStore((state) => state.resetOrder)
export const useDeleteItemById = () => useOrderStore((state) => state.removeOrderDetail)
export const useIncreaseItemQuantity = () => useOrderStore((state) => state.increaseQuantity)
export const useDecreaseItemQuantity = () => useOrderStore((state) => state.decreaseQuantity)
export const useOnChangeItemQuantity = () => useOrderStore((state) => state.onChangeQuantity)
export const useUpdateOrderDetails = () => useOrderStore((state) => state.updateOrderDetail)
