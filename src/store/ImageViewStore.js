import { create } from "zustand"

export const useImageViewerStore = create((set) => ({
  open: false,
  imageUrl: "",

  showImage: (url) =>
    set({
      open: true,
      imageUrl: url,
    }),

  closeImage: () =>
    set({
      open: false,
      imageUrl: "",
    }),
}))

export const showImage = (url) => useImageViewerStore.getState().showImage(url)

export const closeImage = () => useImageViewerStore.getState().closeImage()
