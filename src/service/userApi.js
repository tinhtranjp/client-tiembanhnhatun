import { axiosClient } from "./axiosClient"

export const userApi = {
  getTest: () => axiosClient.get("/users/test"),

  getUsersByName: (keyword) => axiosClient.get("/users/user-list", { params: { keyword } }),

  findById: (id) => axiosClient.get("/users/find-by-id/" + id).then((res) => res.data),

  updateFiled: (data) => axiosClient.put("/admin/users/field", data).then((res) => res.data),

  updatePassword: (data) => axiosClient.put("/admin/users/change-password", data).then((res) => res.data),

  register: (user) => axiosClient.post("/users/register", user).then((res) => res.data),

  // gửi mã code khi đăng ký xong
  confirmCode: (params) => axiosClient.post("/users/confirm-email", null, { params }),

  // lấy lại code khi đăng ký bị quên
  getConfirmCode: (params) => axiosClient.post("/users/confirm-email-code", null, { params }),

  // gửi 1 link đến email của user
  forwardPassword: (params) => axiosClient.post("/users/forward-password", null, { params }),

  resetPassword: (params) => axiosClient.post("/users/reset-password", params),

  login: (data) => axiosClient.post("/users/login", data).then((res) => res.data),

  refreshToken: (refreshToken) => axiosClient.post("/users/refresh-token", { refreshToken }).then((res) => res.data),

  searchUsers: (params) => axiosClient.get("/admin/users/search", { params }).then((res) => res.data),

  changeStatus: (id, params) => axiosClient.put("/admin/users/status/" + id, null, { params }),

  loginWithGoogle: () => axiosClient.get("/users/auth/social-login?login_type=google"),

  authGoogleCallback: (params) => axiosClient.get("/users/auth/social/callback", { params: params }),
}
