import z from "zod"

export const createProductSchema = z.object({
  name: z.string().min(1, "Tên sản phẩm không được để trống").max(255, "Tên sản phẩm tối đa 255 ký tự"),

  description: z.string().max(5000, "Mô tả tối đa 5000 ký tự").nullable().optional(),
  minPrice: z
    .number({
      error: "Giá thấp nhất không được để trống",
    })
    .nonnegative("Giá thấp nhất không được âm"),

  maxPrice: z
    .number({
      error: "Giá cao nhất không được để trống",
    })
    .nonnegative("Giá cao nhất không được âm"),

  currentPrice: z
    .number({
      error: "Giá hiện tại không được để trống",
    })
    .nonnegative("Giá hiện tại không được âm"),

  size: z.string().max(50, "Kích thước tối đa 50 ký tự").nullable().optional(),

  layers: z.string().max(50, "Kích thước tối đa 50 ký tự").nullable().optional(),

  embeddingText: z
    .string()
    .min(1, "Nội dung tìm kiếm AI không được để trống")
    .max(5000, "Nội dung tìm kiếm AI tối đa 5000 ký tự"),

  categoryIds: z.array(z.number().int().positive()).min(1, "Sản phẩm phải có ít nhất một thể loại"),

  themeIds: z.array(z.number().int().positive()).min(1, "Sản phẩm phải có ít nhất một chủ đề"),
})
