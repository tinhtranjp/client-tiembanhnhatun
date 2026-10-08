import { create } from "zustand"

export const useAudioStore = create((set, get) => ({
  audioRef: null,
  currentUrl: null,
  isPlaying: false,

  play: (url) => {
    const { audioRef, currentUrl, isPlaying } = get()

    // Click vào audio đang phát → pause
    if (currentUrl === url && isPlaying) {
      audioRef.pause()
      audioRef.currentTime = 0
      set({ isPlaying: false, currentUrl: null, audioRef: null })
      return
    }

    // Dừng audio cũ nếu có
    if (audioRef) {
      audioRef.pause()
      audioRef.currentTime = 0
    }

    const audio = new Audio(url)
    audio.play()
    set({ audioRef: audio, currentUrl: url, isPlaying: true })

    audio.addEventListener("ended", () => {
      set({ isPlaying: false, currentUrl: null, audioRef: null })
    })
  },

  pause: () => {
    const { audioRef } = get()
    if (audioRef) {
      audioRef.pause()
      audioRef.currentTime = 0
      set({ isPlaying: false, currentUrl: null, audioRef: null })
    }
  },
}))
