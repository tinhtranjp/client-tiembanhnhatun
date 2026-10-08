import { create } from "zustand"

const defaultState = {
  open: false,
  title: "",
  content: null,
  actions: [],
  showCloseButton: true,
  maxWidth: "sm",
  fullWidth: true,
  data: null,
}

export const useFormModalStore = create((set) => ({
  formModal: { ...defaultState },

  openFormModal: (newData) =>
    set(() => ({
      formModal: { ...defaultState, open: true, ...newData },
    })),

  closeFormModal: () =>
    set((state) => ({
      formModal: {
        ...state.formModal,
        open: false,
      },
    })),
  resetFormModal: () =>
    set({
      formModal: defaultState,
    }),
}))

export const getFormModal = () => useFormModalStore.getState().formModal
export const openFormModal = (newData) => useFormModalStore.getState().openFormModal(newData)
export const closeFormModal = () => useFormModalStore.getState().closeFormModal()
