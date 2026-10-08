import axios from "axios"
import { toast } from "sonner"

export function getErrorMessage(error) {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data

    if (data?.details && Object.keys(data.details).length > 0) {
      return Object.values(data.details)[0]
    }

    return data?.message ?? error.message
  }

  return "Đã có lỗi xảy ra"
}

export function getToastError(error) {
  toast.error(getErrorMessage(error))
}
