import { z } from "zod"

export const themeSchema = z.object({
  name: z.string().min(1, "Tên chủ đề không được để trống").max(100, "Tên chủ đề tối đa 100 ký tự"),
})
