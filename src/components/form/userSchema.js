import { z } from "zod"

export const userSchema = z.object({
  email: z.string().trim().min(1, "Email không được để trống").email("Email không hợp lệ"),
  label: z.enum(["admin", "user", "other"], "Vui lòng chọn quyền hạn"),
  gender: z.enum(["MALE", "FEMALE"], "Vui lòng chọn giới tính"),
  //   password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự").max(50),

  //   age: z.coerce.number().min(18, "Phải từ 18 tuổi").max(100),

  //   gender: z.string().min(1, "Vui lòng chọn giới tính"),

  rememberMe: z.literal(true, {
    message: "Bạn phải đồng ý",
  }),
  published: z.literal(true, {
    message: "Bạn phải đồng ý",
  }),
  permissions: z.array(z.string()).min(1, "Chọn ít nhất một quyền"),
  roleIds: z.array(z.number()).min(1, "Chọn ít nhất một vai trò"),
  //   active: z.boolean(),

  //   description: z.string().max(500, "Tối đa 500 ký tự").optional(),
})
