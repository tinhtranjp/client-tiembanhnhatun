import axios from "axios"

import { getUser, setUser, clearUser } from "@store/UserStore"
import { userApi } from "@service/userApi"
import { toast } from "sonner"

export const axiosClient = axios.create({
  baseURL: "http://192.168.1.18:3000/api/v1/",
  // baseURL: "https://tuntundb.asia/api/v1/",
})

axiosClient.interceptors.request.use(
  (config) => {
    const token = getUser()?.accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

let refreshTokenPromise = null

axiosClient.interceptors.response.use(
  function (response) {
    return response
  },
  (error) => {
    if (error.response?.status === 410) {
      logout()
      return Promise.reject(error)
    }

    const originalRequests = error.config

    if (error.response?.status === 401 && !originalRequests._retry) {
      originalRequests._retry = true
      const refreshToken = getUser()?.refreshToken

      if (!refreshToken) {
        logout()
        return Promise.reject(error)
      }

      if (!refreshTokenPromise) {
        refreshTokenPromise = userApi
          .refreshToken(refreshToken)
          .catch(() => {
            clearUser()
            window.location.replace = "/login"
          })
          .finally(() => {
            refreshTokenPromise = null
          })
      }

      return refreshTokenPromise.then((userResponse) => {
        setUser(userResponse)
        originalRequests.headers["Authorization"] = `Bearer ${userResponse.accessToken}`
        return axiosClient(originalRequests)
      })
    }

    return Promise.reject(error)
  },
)
function logout() {
  clearUser()
  window.location.href = "/login"
}
export const getErrorData = (error) => {
  return error?.response?.data
}
export const getErrorDetail = (error) => {
  return error?.response?.data?.details
}

export function handleApiError(error, defaultMessage = "Có lỗi xảy ra") {
  if (!error || !error.status) {
    toast.error(defaultMessage)
    return
  }

  switch (error.status) {
    case 400:
      toast.error("Dữ liệu không hợp lệ, vui lòng kiểm tra lại")
      break
    case 401:
      toast.error("Bạn chưa đăng nhập")
      break
    case 403:
      toast.error("Bạn không có quyền thực hiện thao tác này")
      break
    case 404:
      toast.error("Dữ liệu không tồn tại")
      break
    case 409:
      toast.error("Dữ liệu đã tồn tại")
      break
    case 410:
      toast.error("Bạn đã hết phiên đăng nhập, vui lòng đăng nhập lại.")
      break
    case 500:
      toast.error("Máy chủ gặp sự cố, vui lòng thử lại sau")
      break
    default:
      toast.error(defaultMessage)
  }
}
