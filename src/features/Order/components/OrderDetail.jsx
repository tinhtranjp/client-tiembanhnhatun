import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material"

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded"
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined"
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined"
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded"
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined"
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined"
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined"
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined"
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded"

import DOMPurify from "dompurify"
import { formatDate, formatMoney } from "@/helper/common"
import { getStatusColor, orderStatusOptions } from "../service/helper"
import { showImage } from "@/store/ImageViewStore"
import { useLocation, useNavigate } from "react-router-dom"
import { useOrdersToggleItemStatus } from "../service/mutation"

const PAYMENT_STATUSES = {
  UNPAID: { label: "Chưa thanh toán", color: "warning" },
  PAID: { label: "Đã thanh toán", color: "success" },
}

function InfoRow({ icon, label, value }) {
  return (
    <Stack
      direction="row"
      spacing={1.25}
      alignItems="flex-start"
    >
      <Box sx={{ color: "text.secondary", display: "flex", pt: 0.15 }}>{icon}</Box>

      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography
          variant="caption"
          color="text.secondary"
        >
          {label}
        </Typography>

        <Typography
          variant="body2"
          fontWeight={500}
          sx={{ overflowWrap: "anywhere" }}
        >
          {value || "Chưa cập nhật"}
        </Typography>
      </Box>
    </Stack>
  )
}

function SectionCard({ title, icon, children, action }) {
  return (
    <Card
      variant="outlined"
      sx={{ borderRadius: 3, height: "100%" }}
    >
      <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          sx={{ mb: 2 }}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <Box sx={{ display: "flex", color: "primary.main" }}>{icon}</Box>

            <Typography fontWeight={800}>{title}</Typography>
          </Stack>

          {action}
        </Stack>

        {children}
      </CardContent>
    </Card>
  )
}

function ProductRow({ item, index }) {
  const product = item.product ?? {}
  const name = item.productName ?? product.name ?? item.name ?? `Sản phẩm ${index + 1}`

  const quantity = Number(item.quantity ?? 1)
  const unitPrice = Number(item.unitPrice ?? item.unit_price ?? 0)
  const lineTotal = Number(item.subtotal ?? 0)
  const updateItemStatusMutation = useOrdersToggleItemStatus()
  const handleUpdateItemStatus = async () => {
    try {
      await updateItemStatusMutation.mutateAsync({ id: item.id })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Stack
      spacing={1.5}
      alignItems="flex-start"
    >
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {item.images?.length > 0 ? (
          item.images.map((img, index) => (
            <Box
              key={img.id ?? img.secureUrl ?? index}
              component="img"
              src={img.secureUrl}
              alt={`${name} ${index + 1}`}
              onClick={() => showImage(img.secureUrl)}
              sx={{
                width: 76,
                height: 76,
                flex: "0 0 76px",
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
          ))
        ) : (
          <CakeOutlinedIcon
            color="action"
            fontSize="large"
          />
        )}
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Stack
          direction={"row"}
          spacing={1}
        >
          <Typography
            fontWeight={700}
            sx={{ overflowWrap: "anywhere", mt: 2 }}
          >
            {name}
          </Typography>
          <Chip
            sx={{ cursor: "pointer" }}
            size="small"
            label={item.itemStatus === "PENDING" ? "Chưa làm" : "Đã làm xong"}
            color={item.itemStatus === "PENDING" ? "warning" : "success"}
            variant="outlined"
            onClick={handleUpdateItemStatus}
          />
        </Stack>
        {item.layers && <Typography mt={1}>Số tầng: {item.layers}</Typography>}

        {item.size && <Typography mt={1}>Kích thước: {item.size}</Typography>}

        {item.note && <Typography mt={1}>Ghi chú bánh: {item.note}</Typography>}

        <Typography sx={{ mt: 1 }}>
          Đơn giá : {formatMoney(unitPrice)} × {quantity}
        </Typography>
        {item.candle && (
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Box
              component="img"
              src={item.candle.thumbnail}
              alt={`${item.candle.name} ${index + 1}`}
              sx={{
                width: 76,
                height: 76,
                flex: "0 0 76px",
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
            <Box>
              <Typography>{item.candle.name}</Typography>
              <Typography>{formatMoney(item.candle.price)}</Typography>
            </Box>
          </Box>
        )}

        {item.hat && (
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Box
              component="img"
              src={item.hat.thumbnail}
              alt={`${item.hat.name} ${index + 1}`}
              sx={{
                width: 76,
                height: 76,
                flex: "0 0 76px",
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
            <Box>
              <Typography>{item.hat.name}</Typography>
              <Typography>{formatMoney(item.hat.price)}</Typography>
            </Box>
          </Box>
        )}
        <Typography
          fontWeight={800}
          color="primary.main"
          sx={{ mt: 2 }}
        >
          Tổng tiền : {formatMoney(lineTotal)}
        </Typography>
      </Box>
    </Stack>
  )
}

export default function OrderDetail({
  order,
  loading = false,
  updating = false,
  onBack,
  onChangeStatus,
  onChangePaymentStatus,
}) {
  const location = useLocation()
  const navigate = useNavigate()
  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography color="text.secondary">Đang tải chi tiết đơn hàng...</Typography>
      </Box>
    )
  }

  if (!order) {
    return (
      <Stack
        alignItems="center"
        spacing={2}
        sx={{ py: 8 }}
      >
        <ReceiptLongOutlinedIcon sx={{ fontSize: 52, color: "text.disabled" }} />
        <Typography fontWeight={700}>Không tìm thấy đơn hàng</Typography>
        <Button
          onClick={onBack}
          startIcon={<ArrowBackRoundedIcon />}
        >
          Quay lại danh sách
        </Button>
      </Stack>
    )
  }

  const payment = PAYMENT_STATUSES[order.paymentStatus] ?? {
    label: order.paymentStatus ?? "Không rõ",
    color: "default",
  }

  const items = order.orderItems ?? order.items ?? []
  const subtotal = Number(order.subtotal ?? 0)
  const shippingCost = Number(order.shippingCost ?? 0)
  const totalAmount = Number(order.totalAmount ?? subtotal + shippingCost)

  const handleEdit = () => {
    navigate(`/order/${order.id}/edit`, {
      state: {
        from: location.pathname,
      },
    })
  }
  return (
    <Stack spacing={2}>
      {/* Header */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
      >
        <IconButton
          onClick={onBack}
          aria-label="Quay lại"
          sx={{ border: 1, borderColor: "divider" }}
        >
          <ArrowBackRoundedIcon />
        </IconButton>

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            variant="h5"
            fontWeight={900}
          >
            Chi tiết đơn hàng
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Đơn #{order.accessCode || order.id}
          </Typography>
        </Box>
        <Box>
          <InfoRow
            icon={<AccessTimeRoundedIcon fontSize="small" />}
            label="Thời gian nhận bánh"
            value={formatDate(order.pickupAt)}
          />
        </Box>
      </Stack>

      {/* Thông tin tổng quan */}
      <Card
        sx={{
          borderRadius: 3,
          color: "primary.contrastText",
          bgcolor: "primary.main",
        }}
      >
        <CardContent sx={{ p: 2.5, "&:last-child": { pb: 2.5 } }}>
          <Typography
            variant="body2"
            sx={{ opacity: 0.85 }}
          >
            Tổng thanh toán
          </Typography>

          <Typography
            variant="h4"
            fontWeight={900}
            sx={{ my: 1, overflowWrap: "anywhere" }}
          >
            {formatMoney(totalAmount)}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
          >
            <Chip
              size="small"
              label={payment.label}
              color={payment.color}
              onClick={() => onChangePaymentStatus(order, order.paymentStatus === "UNPAID" ? "PAIND" : "UNPAID")}
            />
            <Typography
              variant="caption"
              sx={{ opacity: 0.85 }}
            >
              Tạo lúc {formatDate(order.createdAt)}
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      {/* Hai cột trên desktop, một cột trên mobile */}
      <Box sx={{ alignItems: "center", display: "flex", justifyContent: "space-between" }}>
        <FormControl
          size="small"
          sx={{ minWidth: 140 }}
        >
          <Select
            value={order.orderStatus}
            onChange={(event) => {
              onChangeStatus(order, event.target.value)
            }}
            sx={{
              color: getStatusColor(order),
              fontWeight: 600,
              "& .MuiSelect-icon": {
                color: getStatusColor(order),
              },
            }}
          >
            {orderStatusOptions.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box>
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={handleEdit}
          >
            Chỉnh sửa
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
          gap: 2,
          alignItems: "stretch",
        }}
      >
        {/* Danh sách bánh */}
        <SectionCard
          title={`Sản phẩm (${items.length}) - Đã hoàn thành: ${items.filter((item) => item.itemStatus === "COMPLETED").length}`}
          icon={<CakeOutlinedIcon />}
        >
          {items.length ? (
            <Stack spacing={2}>
              {items.map((item, index) => (
                <Box key={item.id ?? index}>
                  {index > 0 && <Divider sx={{ mb: 2 }} />}
                  <ProductRow
                    item={item}
                    index={index}
                  />
                </Box>
              ))}
            </Stack>
          ) : (
            <Typography
              color="text.secondary"
              variant="body2"
            >
              API chưa trả về danh sách sản phẩm của đơn hàng.
            </Typography>
          )}
        </SectionCard>

        <SectionCard
          title="Thông tin khách hàng"
          icon={<PersonOutlineRoundedIcon />}
        >
          <Stack spacing={1.75}>
            <InfoRow
              icon={<PersonOutlineRoundedIcon fontSize="small" />}
              label="Tên khách hàng"
              value={order.customerName}
            />

            <InfoRow
              icon={<PhoneOutlinedIcon fontSize="small" />}
              label="Số điện thoại khách"
              value={order.customerPhone}
            />

            <Divider />

            <InfoRow
              icon={<PersonOutlineRoundedIcon fontSize="small" />}
              label="Tên người nhận"
              value={order.recipientName || order.customerName}
            />

            <InfoRow
              icon={<PhoneOutlinedIcon fontSize="small" />}
              label="Số điện thoại người nhận"
              value={order.recipientPhone || order.customerPhone}
            />

            <InfoRow
              icon={<ReceiptLongOutlinedIcon fontSize="small" />}
              label="Kênh liên hệ"
              value={order.contactChannel}
            />
          </Stack>
        </SectionCard>

        <SectionCard
          title="Giao hàng & nhận bánh"
          icon={order.isShipping ? <LocalShippingOutlinedIcon /> : <StorefrontOutlinedIcon />}
        >
          <Stack spacing={1.75}>
            <InfoRow
              icon={
                order.isShipping ? (
                  <LocalShippingOutlinedIcon fontSize="small" />
                ) : (
                  <StorefrontOutlinedIcon fontSize="small" />
                )
              }
              label="Hình thức nhận"
              value={order.isShipping ? "Giao hàng" : "Khách tự đến lấy"}
            />

            {order.isShipping && (
              <InfoRow
                icon={<LocationOnOutlinedIcon fontSize="small" />}
                label="Địa chỉ giao hàng"
                value={order.deliveryAddress}
              />
            )}

            <InfoRow
              icon={<AccessTimeRoundedIcon fontSize="small" />}
              label="Thời gian nhận bánh"
              value={formatDate(order.pickupAt)}
            />

            <InfoRow
              icon={<AccessTimeRoundedIcon fontSize="small" />}
              label="Ngày cập nhật"
              value={formatDate(order.updatedAt)}
            />
          </Stack>
        </SectionCard>
      </Box>

      {/* Chi tiết tiền */}
      <SectionCard
        title="Chi tiết thanh toán"
        icon={<PaymentsOutlinedIcon />}
      >
        <Stack spacing={1.5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}
          >
            <Typography color="text.secondary">Tiền bánh</Typography>
            <Typography fontWeight={600}>{formatMoney(subtotal)}</Typography>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}
          >
            <Typography color="text.secondary">Phí giao hàng</Typography>
            <Typography fontWeight={600}>{formatMoney(shippingCost)}</Typography>
          </Stack>

          <Divider />

          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}
          >
            <Typography fontWeight={800}>Tổng cộng</Typography>
            <Typography
              fontWeight={900}
              color="primary.main"
              sx={{ overflowWrap: "anywhere", textAlign: "right" }}
            >
              {formatMoney(totalAmount)}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <Typography
              color="text.secondary"
              variant="body2"
            >
              Trạng thái thanh toán
            </Typography>

            <Chip
              label={payment.label}
              color={payment.color}
              size="small"
            />
          </Stack>

          <Button
            variant="outlined"
            color={order.paymentStatus === "UNPAID" ? "primary" : "error"}
            disabled={updating}
            onClick={() => onChangePaymentStatus(order, order.paymentStatus === "UNPAID" ? "PAIND" : "UNPAID")}
            fullWidth
          >
            {order.paymentStatus === "UNPAID" ? "Xác nhận đã thanh toán" : "Xác nhận chưa thanh toán"}
          </Button>
        </Stack>
      </SectionCard>

      {/* Ghi chú HTML */}
      <SectionCard
        title="Ghi chú đơn hàng"
        icon={<EditNoteRoundedIcon />}
      >
        {order.adminNote ? (
          <Box
            sx={{
              overflowWrap: "anywhere",
              "& p": { mt: 0, mb: 1 },
              "& p:last-child": { mb: 0 },
              "& img": { maxWidth: "100%", height: "auto" },
              "& ul, & ol": { pl: 3 },
            }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(order.adminNote),
            }}
          />
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Chưa có ghi chú.
          </Typography>
        )}
      </SectionCard>
    </Stack>
  )
}
