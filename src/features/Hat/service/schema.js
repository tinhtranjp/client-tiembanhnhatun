import z from "zod"

export const hatSchema = z.object({
  name: z.string().min(1, "Tên mũ không được để trống"),
  price: z
    .number({
      error: "Giá không được để trống",
    })
    .nonnegative("Giá thấp nhất không được âm"),
  status: z.enum(["AVAILABLE", "UNAVAILABLE"]),
  thumbnail: z.instanceof(File, {
    message: "Vui lòng chọn ảnh",
  }),
})
