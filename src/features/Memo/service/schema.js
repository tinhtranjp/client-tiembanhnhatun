import { z } from "zod"

export const memoSchema = z.object({
  title: z.string().min(1, "Tiêu đề không được để trống").max(255, "Tiêu đề không được vượt quá 255 ký tự"),
  description: z.string().min(1, "Nội dung không được để trống"),
})
