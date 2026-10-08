import { create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

export const usePurchaseStore = create(
  immer(
    persist(
      (set) => ({
        purchases: [],

        addItemToType: (type, item) => {
          set((state) => {
            const purchase = state.purchases.find((p) => p.type === type)
            if (purchase) {
              let existingItem = purchase.items.find((i) => i.itemId === item.itemId)

              if (existingItem) {
                existingItem = { ...item }
              } else {
                purchase.items.push(item)
              }
            } else {
              state.purchases.push({ type, items: [item] })
            }
          })
        },

        updateItemInType: (type, itemId, updatedData) => {
          set((state) => {
            const purchase = state.purchases.find((p) => p.type === type)
            if (purchase) {
              const itemIndex = purchase.items.findIndex((i) => i.itemId === itemId)
              if (itemIndex !== -1) {
                purchase.items[itemIndex] = { ...purchase.items[itemIndex], ...updatedData }
              }
            }
          })
        },

        updateNoteInType: (type, note) => {
          set((state) => {
            let purchase = state.purchases.find((p) => p.type === type)
            if (!purchase) {
              purchase = { type, items: [], note: "" }
              state.purchases.push(purchase)
            }
            purchase.note = note
          })
        },

        deleteItemsInType: (type, itemIds) => {
          set((state) => {
            const purchase = state.purchases.find((p) => p.type === type)
            if (purchase) {
              purchase.items = purchase.items.filter((i) => !itemIds.includes(i.itemId))
            }
          })
        },
        resetType: (type) => {
          set((state) => {
            const purchase = state.purchases.find((p) => p.type === type)
            if (purchase) {
              purchase.items = []
            }
          })
        },

        resetAll: () => {
          set((state) => {
            state.purchases = []
          })
        },
      }),
      {
        name: "purchase-store",
      },
    ),
  ),
)

// ✅ Hook lấy items
export const useItemsByType = (type) => {
  return usePurchaseStore((state) => {
    const purchase = state.purchases.find((p) => p.type === type)
    return purchase?.items || []
  })
}

export const useGetItemByTypeAndId = (type, itemId) => {
  return usePurchaseStore((state) => {
    const purchase = state.purchases.find((p) => p.type === type)
    return purchase?.items.find((i) => i.itemId === itemId)
  })
}

export const useAddItemToType = () => usePurchaseStore((state) => state.addItemToType)
export const useUpdateItemInType = () => usePurchaseStore((state) => state.updateItemInType)
export const useUpdateNoteInType = () => usePurchaseStore((state) => state.updateNoteInType)
export const useDeleteItemsInType = () => usePurchaseStore((state) => state.deleteItemsInType)
export const useResetType = () => usePurchaseStore((state) => state.resetType)
export const useResetAll = () => usePurchaseStore((state) => state.resetAll)
