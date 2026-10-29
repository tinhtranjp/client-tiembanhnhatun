import imageCompression from "browser-image-compression"
export const formatMoney = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0)

export const formatDate = (value) => {
  if (!value) return "Chưa cập nhật"

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return "Chưa cập nhật"

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export async function compressImage(file) {
  if (!file.type.startsWith("image/")) {
    return file
  }

  return imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1600,
    initialQuality: 0.88,
    useWebWorker: true,
    fileType: "image/jpeg",
  })
}

export const getToday = () => {
  const today = new Date()

  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-")
}
