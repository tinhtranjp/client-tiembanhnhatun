import z from "zod"

const hatFields = {
  name: z.string().min(1, "Tên mũ không được để trống"),
  price: z
    .number({
      error: "Giá không được để trống",
    })
    .nonnegative("Giá tiền không được âm"),
  status: z.enum(["AVAILABLE", "UNAVAILABLE"]),
}

export const hatCreateSchema = z.object({
  ...hatFields,
  thumbnail: z.instanceof(File, {
    message: "Vui lòng chọn ảnh",
  }),
})

export const hatSchema = z.object({
  ...hatFields,
  thumbnail: z.instanceof(File).nullable(),
})
