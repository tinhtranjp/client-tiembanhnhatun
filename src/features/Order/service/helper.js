export function buildOrderFormData(data) {
  const formData = new FormData()

  const order = {
    ...data,

    orderItems: data.orderItems.map((item, itemIndex) => ({
      ...item,

      images: item.images.map((image, imageIndex) => {
        if (image.type === "new" && image.file instanceof File) {
          const fileKey = `image_${itemIndex}_${imageIndex}`

          formData.append(fileKey, image.file)

          // Chỉ gửi metadata, không gửi object File trong JSON
          return {
            id: image.id,
            type: "new",
            fileKey,
          }
        }

        // Ảnh đã tồn tại, nếu có
        return image
      }),
    })),
  }

  formData.append("order", JSON.stringify(order))

  return formData
}

export const defaultValues = {
  customerName: "",
  customerPhone: "",
  recipientName: "",
  recipientPhone: "",
  contactChannel: "FACEBOOK",
  deliveryAddress: "",
  adminNote: "",
  pickupAt: "",
  isShipping: false,
  shippingCost: undefined,
  orderItems: [
    {
      productId: undefined,
      productName: "",
      description: "",
      size: "",
      itemStatus: "PENDING",
      unitPrice: undefined,
      quantity: 1,
      subtotal: undefined,
      candleId: undefined,
      hatId: undefined,
      birthdayMessage: "",
      cakeBase: "",
      images: [],
    },
  ],
}

export const mapOrderToForm = (order) => {
  return {
    id: Number(order.id),
    customerName: order.customerName ?? "",
    customerPhone: order.customerPhone ?? "",
    recipientName: order.recipientName ?? "",
    recipientPhone: order.recipientPhone ?? "",
    contactChannel: order.contactChannel ?? "FACEBOOK",
    deliveryAddress: order.deliveryAddress ?? "",
    adminNote: order.adminNote ?? "",
    pickupAt: order.pickupAt ?? "",
    isShipping: order.isShipping ?? false,
    shippingCost: order.shippingCost ?? undefined,

    orderItems: (order.orderItems ?? []).map((item) => ({
      id: Number(item.id),
      productId: item.productId ?? undefined,
      productName: item.productName ?? "",
      description: item.description ?? "",
      note: item.note ?? "",
      size: item.size ?? "",
      layers: item.layers ?? "",
      itemStatus: item.itemStatus ?? "PENDING",
      unitPrice: item.unitPrice != null ? Number(item.unitPrice) : undefined,
      quantity: item.quantity ?? 1,
      subtotal: item.subtotal ?? undefined,
      candleId: item.candleId !== null ? Number(item.candleId) : undefined,
      candleNumber: item.candleNumber ?? "",
      hatId: item.hatId ? Number(item.hatId) : undefined,
      birthdayMessage: item.birthdayMessage ?? "",
      messageToUser: item.messageToUser ?? "",
      cakeBase: item.cakeBase ?? "",

      images: (item.images ?? []).map((image) => ({
        id: image.id,
        type: "existing",
        url: image.secureUrl,
      })),
    })),
  }
}

export const orderStatusOptions = [
  { value: "PENDING", label: "Chưa làm", color: "#ED6C02" },
  { value: "READY", label: "Đã làm xong", color: "#0288D1" },
  { value: "DONE", label: "Đã giao hàng xong", color: "#2E7D32" },
  { value: "CANCEL", label: "Đã hủy", color: "#D32F2F" },
]

export const STATUS_MAP = {
  PENDING: { label: "Chưa làm", color: "warning" },
  READY: { label: "Làm xong rồi", color: "info" },
  DONE: { label: "Đã giao", color: "success" },
  CANCEL: { label: "Đã hủy", color: "error" },
}

export const PAYMENT_MAP = {
  UNPAID: { label: "Chưa thanh toán", color: "warning" },
  PAID: { label: "Đã thanh toán", color: "success" },
}

export const getStatusColor = (order) => {
  return orderStatusOptions.find((option) => option.value === order.orderStatus)?.color
}
