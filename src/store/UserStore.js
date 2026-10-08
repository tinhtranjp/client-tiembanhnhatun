import { create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"
export const useUserStore = create(
  persist(
    immer((set) => ({
      user: null,

      setUser: (newUser) =>
        set((state) => {
          state.user = newUser
        }),

      clearUser: () =>
        set((state) => {
          state.user = null
        }),
    })),
    {
      name: "user-storage",
    },
  ),
)

export const getUser = () => useUserStore.getState().user
export const setUser = (user) => useUserStore.getState().setUser(user)
export const clearUser = () => useUserStore.getState().clearUser()
