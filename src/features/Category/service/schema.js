import { z } from "zod"

export const categorySchema = z.object({
  name: z.string().min(1, "Tên thể loại không được để trống").max(100, "Tên thể loại tối đa 100 ký tự"),
})
