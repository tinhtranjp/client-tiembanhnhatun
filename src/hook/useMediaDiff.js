import { useCallback } from "react"

export function useMediaDiff() {
  const getMediaDiff = useCallback((html, uploadMedia) => {
    if (!html || uploadMedia.length === 0) {
      return {
        activeImageIds: [],
        deleteImageIds: [],
      }
    }

    const parser = new DOMParser()
    const doc = parser.parseFromString(html, "text/html")

    const usedUrls = new Set([...doc.querySelectorAll("img")].map((img) => img.getAttribute("src")).filter(Boolean))

    const activeImageIds = uploadMedia.filter((media) => usedUrls.has(media.url)).map((media) => Number(media.id))

    const deleteImageIds = uploadMedia.filter((media) => !usedUrls.has(media.url)).map((media) => Number(media.id))

    return {
      activeImageIds,
      deleteImageIds,
    }
  }, [])

  return {
    getMediaDiff,
  }
}
