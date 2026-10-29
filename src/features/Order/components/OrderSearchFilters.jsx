import { useState, useEffect, useRef } from "react"
import { Badge, Box, Button, Divider, Drawer, IconButton, MenuItem, Stack, TextField, Typography } from "@mui/material"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import FilterListIcon from "@mui/icons-material/FilterList"
import SearchIcon from "@mui/icons-material/Search"
import CloseIcon from "@mui/icons-material/Close"
import RestartAltIcon from "@mui/icons-material/RestartAlt"

const initialFilters = {
  query: "",
  orderStatus: "",
  paymentStatus: "",
  contactChannel: "",
  isShipping: "",
  createdFrom: "",
  createdTo: "",
  pickupFrom: "",
  pickupTo: "",
  orderBy: {
    field: "createdAt",
    direction: "desc",
  },
}

const orderStatusOptions = [
  { value: "PENDING", label: "Chưa làm" },
  { value: "READY", label: "Đã làm xong" },
  { value: "DONE", label: "Đã giao hàng xong" },
  { value: "CANCEL", label: "Đã hủy" },
]

const paymentOptions = [
  { value: "UNPAID", label: "Chưa thanh toán" },
  { value: "PAID", label: "Đã thanh toán" },
]

const contactOptions = [
  { value: "FACEBOOK", label: "Facebook" },
  { value: "ZALO", label: "Zalo" },
  { value: "PHONE", label: "Điện thoại" },
  { value: "STORE", label: "Trực tiếp tại tiệm" },
]

const sortOptions = [
  { value: "createdAt", label: "Ngày tạo đơn" },
  { value: "pickupAt", label: "Ngày nhận bánh" },
  { value: "totalAmount", label: "Tổng tiền" },
  { value: "updatedAt", label: "Ngày cập nhật" },
]

function createInitialFilters() {
  return {
    ...initialFilters,
    orderBy: { ...initialFilters.orderBy },
  }
}

function SelectField({ label, value, options, onChange }) {
  return (
    <TextField
      select
      fullWidth
      size="small"
      label={label}
      value={value}
      onChange={onChange}
    >
      <MenuItem value="">Tất cả</MenuItem>

      {options.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}
        >
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  )
}

function buildPayload(filters, limit) {
  const payload = {
    page: 1,
    limit,
    query: filters.query.trim(),
    orderBy: { ...filters.orderBy },
  }

  Object.entries(filters).forEach(([key, value]) => {
    if (key === "orderBy" || key === "query" || value === "") return

    payload[key] = key === "isShipping" ? value === "true" : value
  })

  return payload
}

export default function OrderSearchFilters({ onTodayPickUp, onSearch, loading = false, limit = 10 }) {
  const [filters, setFilters] = useState(createInitialFilters)
  const [appliedFilters, setAppliedFilters] = useState(createInitialFilters)
  const [open, setOpen] = useState(false)

  // Không tự tìm kiếm khi component vừa mount.
  const isFirstRender = useRef(true)

  // Ngăn việc reset form kích hoạt tìm kiếm tự động.
  const skipNextQuerySearch = useRef(false)

  const setField = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  console.log("[OrderSearchFilters] query effect:", {
    query: filters.query,
    appliedFilters,
  })
  const setSort = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      orderBy: {
        ...prev.orderBy,
        [name]: value === "" ? initialFilters.orderBy[name] : value,
      },
    }))
  }
  // Chỉ query thay đổi mới tự gọi API.
  // Các filter nâng cao chưa áp dụng sẽ không bị gửi nhầm.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (skipNextQuerySearch.current) {
      skipNextQuerySearch.current = false
      return
    }

    // Chỉ tìm kiếm khi từ khóa thực sự khác từ khóa đã áp dụng.
    if (filters.query === appliedFilters.query) return

    const timeout = setTimeout(() => {
      onSearch(
        buildPayload(
          {
            ...appliedFilters,
            query: filters.query,
          },
          limit,
        ),
      )
    }, 400)

    return () => clearTimeout(timeout)
  }, [filters.query])

  const activeCount = [
    filters.orderStatus,
    filters.paymentStatus,
    filters.contactChannel,
    filters.isShipping,
    filters.createdFrom,
    filters.createdTo,
    filters.pickupFrom,
    filters.pickupTo,
  ].filter((value) => value !== "").length

  const hasCreatedDateError = filters.createdFrom && filters.createdTo && filters.createdFrom > filters.createdTo

  const hasPickupDateError = filters.pickupFrom && filters.pickupTo && filters.pickupFrom > filters.pickupTo

  const handleReset = () => {
    if (filters.query !== "") {
      skipNextQuerySearch.current = true
    }

    setFilters(createInitialFilters())
  }

  const handleSearch = (event) => {
    console.trace("[OrderSearchFilters] handleSearch")
    event?.preventDefault()

    if (hasCreatedDateError || hasPickupDateError) return

    const nextFilters = {
      ...filters,
      orderBy: { ...filters.orderBy },
    }

    setAppliedFilters(nextFilters)
    onSearch(buildPayload(nextFilters, limit))
    setOpen(false)
  }
  const handleTodayPickup = () => {
    const today = new Date()
    const date = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-")

    const nextFilters = {
      ...filters,
      pickupFrom: date,
      pickupTo: date,
      orderBy: {
        field: "pickupAt",
        direction: "asc",
      },
    }

    setFilters(nextFilters)
    setAppliedFilters(nextFilters)

    onTodayPickUp(date)
    setOpen(false)
  }

  return (
    <Box>
      {/* Tìm kiếm nhanh */}
      <Stack
        direction="row"
        spacing={1}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Mã đơn, tên hoặc số điện thoại..."
          value={filters.query}
          onChange={(event) => setField("query", event.target.value)}
          slotProps={{
            input: {
              startAdornment: <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />,
            },
          }}
        />

        <IconButton
          aria-label="Mở bộ lọc"
          onClick={() => setOpen(true)}
          sx={{
            border: 1,
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          <Badge
            badgeContent={activeCount}
            color="primary"
          >
            <FilterListIcon />
          </Badge>
        </IconButton>

        <Button
          variant="contained"
          disabled={loading}
          onClick={handleSearch}
          sx={{
            minWidth: 48,
            px: 1.5,
            bgcolor: "#000",
            "&:hover": { bgcolor: "#222" },
          }}
        >
          <SearchIcon />
        </Button>
      </Stack>

      {/* Bộ lọc nâng cao */}
      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: {
            sx: {
              borderRadius: { xs: "20px 20px 0 0", sm: 3 },
              maxHeight: "90dvh",
              height: "auto",
            },
          },
        }}
      >
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "90dvh",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ p: 2 }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
            >
              Bộ lọc đơn hàng
            </Typography>

            <IconButton
              onClick={() => setOpen(false)}
              aria-label="Đóng"
            >
              <CloseIcon />
            </IconButton>
          </Stack>

          <Divider />

          <Stack
            spacing={2}
            sx={{ p: 2, overflowY: "auto" }}
          >
            <SelectField
              label="Trạng thái đơn"
              value={filters.orderStatus}
              options={orderStatusOptions}
              onChange={(e) => setField("orderStatus", e.target.value)}
            />

            <SelectField
              label="Trạng thái thanh toán"
              value={filters.paymentStatus}
              options={paymentOptions}
              onChange={(e) => setField("paymentStatus", e.target.value)}
            />

            <SelectField
              label="Kênh liên hệ"
              value={filters.contactChannel}
              options={contactOptions}
              onChange={(e) => setField("contactChannel", e.target.value)}
            />

            <SelectField
              label="Hình thức nhận bánh"
              value={filters.isShipping}
              options={[
                { value: "true", label: "Giao hàng" },
                { value: "false", label: "Khách tự đến lấy" },
              ]}
              onChange={(e) => setField("isShipping", e.target.value)}
            />

            <Divider />

            <Typography fontWeight={600}>Ngày tạo đơn</Typography>

            <Stack
              direction="row"
              spacing={1}
            >
              <TextField
                fullWidth
                size="small"
                type="date"
                label="Từ ngày"
                value={filters.createdFrom}
                onChange={(e) => setField("createdFrom", e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!hasCreatedDateError}
              />

              <TextField
                fullWidth
                size="small"
                type="date"
                label="Đến ngày"
                value={filters.createdTo}
                onChange={(e) => setField("createdTo", e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!hasCreatedDateError}
              />
            </Stack>

            <Typography fontWeight={600}>Ngày nhận bánh</Typography>

            <Stack
              direction="row"
              spacing={1}
            >
              <TextField
                fullWidth
                size="small"
                type="date"
                label="Từ ngày"
                value={filters.pickupFrom}
                onChange={(e) => setField("pickupFrom", e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!hasPickupDateError}
              />

              <TextField
                fullWidth
                size="small"
                type="date"
                label="Đến ngày"
                value={filters.pickupTo}
                onChange={(e) => setField("pickupTo", e.target.value)}
                slotProps={{ inputLabel: { shrink: true } }}
                error={!!hasPickupDateError}
              />
            </Stack>

            {hasCreatedDateError && (
              <Typography
                color="error"
                variant="caption"
              >
                Ngày kết thúc tạo đơn phải lớn hơn hoặc bằng ngày bắt đầu.
              </Typography>
            )}

            {hasPickupDateError && (
              <Typography
                color="error"
                variant="caption"
              >
                Ngày kết thúc nhận bánh phải lớn hơn hoặc bằng ngày bắt đầu.
              </Typography>
            )}

            <Divider />

            <Typography fontWeight={600}>Sắp xếp</Typography>

            <SelectField
              label="Sắp xếp theo"
              value={filters.orderBy.field}
              options={sortOptions}
              onChange={(e) => setSort("field", e.target.value)}
            />

            <SelectField
              label="Thứ tự"
              value={filters.orderBy.direction}
              options={[
                { value: "desc", label: "Mới nhất / Cao nhất trước" },
                { value: "asc", label: "Cũ nhất / Thấp nhất trước" },
              ]}
              onChange={(e) => setSort("direction", e.target.value)}
            />
          </Stack>

          <Divider />

          <Stack
            direction="row"
            spacing={1}
            sx={{
              p: 2,
              pb: "max(16px, env(safe-area-inset-bottom))",
            }}
          >
            <Button
              fullWidth
              variant="outlined"
              startIcon={<LocalShippingIcon />}
              disabled={loading}
              onClick={handleTodayPickup}
            >
              Today
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<RestartAltIcon />}
              disabled={loading}
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              startIcon={<SearchIcon />}
              disabled={loading}
              sx={{
                bgcolor: "#000",
                "&:hover": { bgcolor: "#222" },
              }}
            >
              Áp dụng
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </Box>
  )
}
