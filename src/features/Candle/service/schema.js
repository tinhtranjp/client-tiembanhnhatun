import { z } from "zod"

const candleFields = {
  name: z.string().min(1, "Tên nến không được để trống"),
  price: z
    .number({
      error: "Giá không được để trống",
    })
    .nonnegative("Giá tiền không được âm"),
  status: z.enum(["AVAILABLE", "UNAVAILABLE"]),
}

export const candleCreateSchema = z.object({
  ...candleFields,
  thumbnail: z.instanceof(File, {
    message: "Vui lòng chọn ảnh",
  }),
})

export const candleSchema = z.object({
  ...candleFields,
  thumbnail: z.instanceof(File).nullable(),
})
