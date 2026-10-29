import axios from "axios"

export const axiosClient = axios.create({
  // baseURL: "http://localhost:3000/api/v1/",
  baseURL: "http://192.168.1.5:3000/api/v1/",
  // baseURL: "https://tuntundb.asia/api/v1/",
})
axiosClient.interceptors.response.use(
  function (response) {
    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)
