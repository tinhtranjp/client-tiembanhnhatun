import { z } from "zod"

const orderImageSchema = z.discriminatedUnion("type", [
  z.object({
    id: z.string(),
    type: z.literal("new"),
    file: z.file(),
  }),
  z.object({
    id: z.union([z.string(), z.number()]),
    type: z.literal("existing"),
    url: z.string(),
  }),
])
export const orderItemSchema = z.object({
  id: z.number().int().positive().optional(),
  productId: z.number().int().positive().optional(),
  productName: z.string().max(255).optional(),
  note: z.string().optional(),
  size: z.string().max(50).optional(),
  layers: z.string().max(50).optional(),
  unitPrice: z.number().nonnegative().optional(),
  quantity: z.number().int().positive().optional(),
  subtotal: z.number().nonnegative().optional(),
  candleId: z.number().int().positive().optional(),
  hatId: z.number().int().positive().optional(),
  birthdayMessage: z.string().max(255).optional(),
  messageToUser: z.string().max(255).optional(),
  candleNumber: z.string().max(255).optional(),
  itemStatus: z.enum(["PENDING", "COMPLETED"]),
  cakeBase: z.string().max(50, "Kích thước tối đa 50 ký tự").nullable().optional(),
  images: z.array(orderImageSchema).max(5).default([]),
})

export const orderSchema = z.object({
  id: z.number().int().positive().optional(),
  customerName: z.string().max(255).optional(),
  customerPhone: z.string().max(20).optional(),
  recipientName: z.string().max(255).optional(),
  recipientPhone: z.string().max(20).optional(),
  contactChannel: z.string().max(20).optional(),
  deliveryAddress: z.string().optional(),
  adminNote: z.string().optional(),
  isShipping: z.boolean().default(false),
  subtotal: z.number().nonnegative().optional(),
  totalAmount: z.number().nonnegative().optional(),
  paymentStatus: z.string().max(20).optional(),
  orderStatus: z.string().max(20).optional(),
  pickupAt: z.string().optional().or(z.literal("")),
  orderItems: z.array(orderItemSchema).min(1, "Đơn hàng phải có ít nhất một sản phẩm"),
})
