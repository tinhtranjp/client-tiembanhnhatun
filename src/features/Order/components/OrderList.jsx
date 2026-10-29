import { useEffect, useState } from "react"
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined"
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined"
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded"
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined"
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined"
import CakeOutlinedIcon from "@mui/icons-material/CakeOutlined"
import OrderSearchFilters from "./OrderSearchFilters"
import { getStatusColor, orderStatusOptions, PAYMENT_MAP } from "../service/helper"
import { formatDate, formatMoney, getToday } from "@/helper/common"
import { useOrdersTogglePaymentStatus, useOrdersUpdateStatus } from "../service/mutation"
import { useLocation, useNavigate } from "react-router-dom"
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined"
// Hỗ trợ một số kiểu dữ liệu ảnh thường gặp trong API.
function getImageUrl(item) {
  const image = item?.images?.[0] ?? item?.media?.[0]

  if (typeof image === "string") return image

  return (
    image?.secureUrl ??
    image?.secure_url ??
    image?.url ??
    image?.imageUrl ??
    image?.image_url ??
    item?.imageUrl ??
    item?.image_url ??
    ""
  )
}

function OrderImages({ items = [] }) {
  const images = items.slice(0, 4).map((item) => ({
    id: item.id,
    name: item.productName ?? item.product?.name ?? "Bánh",
    url: getImageUrl(item),
  }))

  if (!images.length) {
    return (
      <Box
        sx={{
          height: 100,
          borderRadius: 2,
          bgcolor: "action.hover",
          display: "grid",
          placeItems: "center",
          color: "text.secondary",
        }}
      >
        <Stack
          alignItems="center"
          spacing={0.5}
        >
          <CakeOutlinedIcon fontSize="large" />
          <Typography variant="caption">Chưa có ảnh bánh</Typography>
        </Stack>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: images.length === 1 ? "1fr" : `repeat(${images.length}, minmax(0, 1fr))`,
        gap: 0.75,
        overflow: "hidden",
        borderRadius: 2,
      }}
    >
      {images.map((image) => (
        <Box
          key={image.id ?? image.name}
          sx={{
            position: "relative",
            minWidth: 0,
            height: images.length === 1 ? 170 : 100,
            bgcolor: "action.hover",
            borderRadius: 1.5,
            overflow: "hidden",
          }}
        >
          {image.url ? (
            <Box
              component="img"
              src={image.url}
              alt={image.name}
              loading="lazy"
              sx={{
                width: "100%",
                height: "100%",
                display: "block",
                objectFit: "cover",
              }}
            />
          ) : (
            <Stack
              alignItems="center"
              justifyContent="center"
              sx={{ width: "100%", height: "100%" }}
            >
              <CakeOutlinedIcon color="action" />
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: 10 }}
              >
                Không có ảnh
              </Typography>
            </Stack>
          )}
        </Box>
      ))}
    </Box>
  )
}

function OrderCard({ order, onClick, onChangeStatus, updatePayment }) {
  const payment = PAYMENT_MAP[order.paymentStatus] ?? {
    label: order.paymentStatus ?? "Không rõ",
    color: "default",
  }

  const items = order.orderItems ?? []
  const customerName = order.customerName || "Khách hàng"
  const customerPhone = order.customerPhone || "Chưa có số điện thoại"

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        transition: "border-color 0.2s",
        "&:hover": { borderColor: "primary.main" },
      }}
    >
      <CardActionArea
        onClick={() => onClick?.(order)}
        disableRipple
        disableTouchRipple
      >
        <Box sx={{ p: 1.75 }}>
          {/* Mã đơn và trạng thái */}
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            spacing={1}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="subtitle1"
                fontWeight={800}
                sx={{ overflowWrap: "anywhere" }}
              >
                Đơn #{order.accessCode || order.id}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                Mã hệ thống: {order.id}
              </Typography>
            </Box>

            <FormControl
              size="small"
              sx={{ minWidth: 140 }}
            >
              <Select
                value={order.orderStatus}
                onClick={(event) => event.stopPropagation()}
                onChange={(event) => {
                  event.stopPropagation()
                  onChangeStatus(order.id, event.target.value)
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
                    onClick={(e) => e.stopPropagation()}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Box sx={{ mt: 1.5 }}>
            <OrderImages items={items} />
          </Box>

          {/* Thông tin khách hàng */}
          <Stack
            spacing={1.25}
            sx={{ mt: 1.75 }}
          >
            <Typography fontWeight={700}>{customerName}</Typography>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <PhoneOutlinedIcon
                fontSize="small"
                color="action"
              />
              <Typography
                variant="body2"
                color="text.secondary"
              >
                {customerPhone}
              </Typography>
            </Stack>

            {order.recipientName && (
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Người nhận: {order.recipientName}
                {order.recipientPhone ? ` · ${order.recipientPhone}` : ""}
              </Typography>
            )}

            <Stack
              direction="row"
              spacing={1}
              alignItems="flex-start"
            >
              {order.isShipping ? (
                <LocalShippingOutlinedIcon
                  fontSize="small"
                  color="action"
                />
              ) : (
                <StorefrontOutlinedIcon
                  fontSize="small"
                  color="action"
                />
              )}

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ overflowWrap: "anywhere" }}
              >
                {order.isShipping ? order.deliveryAddress || "Chưa có địa chỉ giao hàng" : "Khách tự đến lấy bánh"}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
            >
              <AccessTimeRoundedIcon
                fontSize="small"
                color="action"
              />
              <Box>
                <Typography variant="body2">Nhận bánh: {formatDate(order.pickupAt)}</Typography>
              </Box>
            </Stack>
          </Stack>

          {order.adminNote && (
            <Box
              sx={{
                mt: 1.5,
                p: 1.25,
                borderRadius: 2,
                bgcolor: "action.hover",
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Ghi chú
              </Typography>
              <Typography
                variant="body2"
                component="div"
                dangerouslySetInnerHTML={{
                  __html: order.adminNote || "",
                }}
              />
            </Box>
          )}

          <Divider sx={{ my: 1.75 }} />

          {/* Tổng tiền */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Stack spacing={0.75}>
              <Chip
                size="small"
                variant="outlined"
                color={payment.color}
                label={payment.label}
                sx={{ alignSelf: "flex-start" }}
                onClick={(e) => {
                  e.stopPropagation()
                  updatePayment(order.id)
                }}
              />

              <Typography
                variant="caption"
                color="text.secondary"
              >
                {items.length} loại bánh
              </Typography>
            </Stack>

            <Box sx={{ textAlign: "right" }}>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Tổng thanh toán
              </Typography>
              <Typography
                variant="h6"
                color="primary.main"
                fontWeight={800}
              >
                {formatMoney(order.totalAmount)}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </CardActionArea>
    </Card>
  )
}

export default function OrderList({
  orders = [],
  total = 0,
  page = 1,
  limit = 10,
  loading = false,
  onSearch,
  onPageChange,
  onLimitChange,
  onOrderClick,
  onTodayPickUp,
  countToday,
}) {
  const [searchParams, setSearchParams] = useState(() => ({
    page,
    limit,
    pickupFrom: getToday(),
    pickupTo: getToday(),
    orderBy: {
      field: "pickupAt",
      direction: "asc",
    },
  }))
  useEffect(() => {
    setSearchParams((prev) => ({ ...prev, page, limit }))
  }, [page, limit])

  const totalPages = Math.max(1, Math.ceil(total / limit))

  const handleSearch = (filters) => {
    const next = { ...filters, page: 1, limit }

    setSearchParams(next)
    onSearch?.(next)
  }

  const handlePageChange = (_, nextPage) => {
    const next = { ...searchParams, page: nextPage, limit }

    setSearchParams(next)
    onPageChange?.(nextPage, next)
  }

  const handleLimitChange = (event) => {
    const nextLimit = Number(event.target.value)
    const next = { ...searchParams, page: 1, limit: nextLimit }

    setSearchParams(next)
    onLimitChange?.(nextLimit, next)
  }

  const start = total === 0 ? 0 : (page - 1) * limit + 1
  const end = Math.min(page * limit, total)

  const updateStatusMutation = useOrdersUpdateStatus()
  const togglePaymentMutation = useOrdersTogglePaymentStatus()
  const navigate = useNavigate()
  const location = useLocation()
  const handleChangeStatus = async (id, status) => {
    try {
      await updateStatusMutation.mutateAsync({ id, orderStatus: status })
    } catch (error) {
      console.log(error)
    }
  }
  const handleUpdatePayment = async (id) => {
    try {
      const confirmed = window.confirm("Bạn có chắc chắn muốn thay đổi trạng thái thanh toán của đơn hàng này không?")

      if (!confirmed) return
      await togglePaymentMutation.mutateAsync({ id })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Stack spacing={2}>
      <OrderSearchFilters
        onSearch={handleSearch}
        loading={loading}
        limit={limit}
        onTodayPickUp={onTodayPickUp}
      />

      {/* Số lượng và phân trang */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <Box>
          <Typography fontWeight={800}>Danh sách đơn hàng</Typography>
          <Typography
            variant="caption"
            color="text.secondary"
          >
            {total === 0 ? "Chưa có đơn hàng" : `Hiển thị ${start}–${end} / ${total} đơn`}
          </Typography>
        </Box>
        <Stack
          spacing={1}
          direction={"row"}
        >
          <TextField
            select
            size="small"
            value={limit}
            onChange={handleLimitChange}
            sx={{ width: 95 }}
            slotProps={{
              select: { inputProps: { "aria-label": "Số đơn mỗi trang" } },
            }}
          >
            {[10, 20, 50, 100].map((value) => (
              <MenuItem
                key={value}
                value={value}
              >
                {value} / trang
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="contained"
            disabled={loading}
            sx={{
              minWidth: 48,
              px: 1.5,
              bgcolor: "#333",
              "&:hover": {
                bgcolor: "#555",
              },
            }}
            onClick={() => {
              navigate("/order/cakebase-summary", {
                state: {
                  from: location.pathname,
                },
              })
            }}
          >
            <RocketLaunchOutlinedIcon />
          </Button>
          <Button
            variant="contained"
            disabled={loading}
            sx={{
              minWidth: 48,
              px: 1.5,
              bgcolor: "#333",
              "&:hover": {
                bgcolor: "#555",
              },
            }}
            onClick={() => {
              navigate("/order/add", {
                state: {
                  from: location.pathname,
                },
              })
            }}
          >
            <AddIcon />
          </Button>
        </Stack>
      </Stack>
      {countToday && (
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          p={1}
          bgcolor={"#444"}
          color="white"
          borderRadius={2}
        >
          <Typography>
            {countToday?.total}/{countToday?.totalCount} đơn chưa làm.
          </Typography>
          <Typography>{formatDate(countToday?.pickupAt)}</Typography>
        </Stack>
      )}
      {/* Nội dung */}
      {loading ? (
        <Stack
          alignItems="center"
          spacing={1}
          sx={{ py: 8 }}
        >
          <CircularProgress />
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Đang tải đơn hàng...
          </Typography>
        </Stack>
      ) : orders.length === 0 ? (
        <Box
          sx={{
            py: 7,
            px: 2,
            textAlign: "center",
            border: 1,
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <ReceiptLongOutlinedIcon sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
          <Typography fontWeight={700}>Không tìm thấy đơn hàng</Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Thử thay đổi từ khóa hoặc bộ lọc nhé.
          </Typography>
        </Box>
      ) : (
        <Stack spacing={1.5}>
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onClick={onOrderClick}
              updatePayment={handleUpdatePayment}
              onChangeStatus={handleChangeStatus}
            />
          ))}
        </Stack>
      )}

      {/* Pagination */}
      {total > 0 && (
        <Stack
          spacing={1.5}
          alignItems="center"
          sx={{ py: 1.5 }}
        >
          <Pagination
            count={totalPages}
            page={Math.min(page, totalPages)}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            siblingCount={0}
            boundaryCount={1}
            disabled={loading}
          />

          <Typography
            variant="caption"
            color="text.secondary"
          >
            Trang {page} / {totalPages}
          </Typography>
        </Stack>
      )}
    </Stack>
  )
}
