import { axiosClient } from "@/lib/axiosClient"

export const mediaApi = {
  uploadCkeditorImage: (file, { folder, relatedType, relatedId = null, imageType = null }) => {
    const formData = new FormData()

    formData.append("file", file)

    formData.append(
      "data",
      JSON.stringify({
        folder,
        relatedType,
        relatedId,
        imageType,
      }),
    )

    return axiosClient.post("/medias/ckeditor", formData).then((res) => res.data)
  },
}
