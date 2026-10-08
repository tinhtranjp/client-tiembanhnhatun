import { axiosClient } from "@/service/axiosClient"

export const cloudinaryApi = {
  uploadProductImages: ({ relatedType, relatedId, files }) => {
    const formData = new FormData()

    formData.append("relatedType", relatedType)
    formData.append("relatedId", String(relatedId))

    files.forEach((file) => {
      formData.append("files", file)
    })

    return axiosClient.post("/medias/multiple", formData)
  },
}
