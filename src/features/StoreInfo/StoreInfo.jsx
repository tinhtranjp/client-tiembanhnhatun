"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Box, Paper, Stack, Typography, Button, TextField, Divider, CircularProgress } from "@mui/material"
import {
  EditOutlined,
  StorefrontOutlined,
  PhoneOutlined,
  AccessTimeOutlined,
  LocationOnOutlined,
  FacebookOutlined,
  AccountBalanceOutlined,
  QrCode2Outlined,
  MapOutlined,
  CloseOutlined,
  SaveOutlined,
} from "@mui/icons-material"
import { toast } from "sonner"
import { useStoreInfo } from "./service/queries"
import { useUpdateStoreInfo } from "./service/mutation"

// Thay bằng schema dùng chung của project nếu đã export
const emptyToNull = (schema) =>
  z.preprocess((value) => (typeof value === "string" && value.trim() === "" ? null : value), schema.nullable())

const storeInfoSchema = z.object({
  nameShop: z.string().trim().min(1, "Vui lòng nhập tên cửa hàng").max(255),
  fbLink: emptyToNull(z.url("URL Facebook không hợp lệ")),
  zaloLink: emptyToNull(z.url("URL Zalo không hợp lệ")),
  phone: emptyToNull(z.string().max(20)),
  openHours: emptyToNull(z.string().max(100)),
  address: emptyToNull(z.string()),
  googleMapLink: emptyToNull(z.url("URL Google Maps không hợp lệ")),
  paymentQr: emptyToNull(z.url("URL ảnh QR không hợp lệ")),
  bankName: emptyToNull(z.string().max(100)),
  bankAccountName: emptyToNull(z.string().max(255)),
  bankAccountNumber: emptyToNull(z.string().max(50)),
})

const defaultValues = {
  nameShop: "",
  fbLink: "",
  zaloLink: "",
  phone: "",
  openHours: "",
  address: "",
  googleMapLink: "",
  paymentQr: "",
  bankName: "",
  bankAccountName: "",
  bankAccountNumber: "",
}

const formSections = [
  {
    title: "Thông tin cửa hàng",
    fields: [
      { name: "nameShop", label: "Tên cửa hàng", required: true },
      { name: "phone", label: "Số điện thoại" },
      { name: "openHours", label: "Giờ mở cửa" },
      { name: "address", label: "Địa chỉ", multiline: true },
      { name: "googleMapLink", label: "Google Maps URL" },
    ],
  },
  {
    title: "Mạng xã hội",
    fields: [
      { name: "fbLink", label: "Facebook URL" },
      { name: "zaloLink", label: "Zalo URL" },
    ],
  },
  {
    title: "Thông tin thanh toán",
    fields: [
      { name: "bankName", label: "Tên ngân hàng" },
      { name: "bankAccountName", label: "Chủ tài khoản" },
      { name: "bankAccountNumber", label: "Số tài khoản" },
      { name: "paymentQr", label: "URL ảnh QR thanh toán" },
    ],
  },
]

function InfoItem({ icon: Icon, label, value, href }) {
  return (
    <Stack
      direction="row"
      spacing={1.5}
      alignItems="flex-start"
    >
      {Icon && (
        <Box sx={{ color: "text.secondary", pt: 0.25 }}>
          <Icon fontSize="small" />
        </Box>
      )}

      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography
          variant="caption"
          color="text.secondary"
        >
          {label}
        </Typography>

        {href && value ? (
          <Typography
            component="a"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "block",
              fontWeight: 600,
              overflowWrap: "anywhere",
            }}
          >
            {value}
          </Typography>
        ) : (
          <Typography
            fontWeight={600}
            sx={{ overflowWrap: "anywhere" }}
          >
            {value || "Chưa cập nhật"}
          </Typography>
        )}
      </Box>
    </Stack>
  )
}

function StoreInfoView({ data, onEdit }) {
  return (
    <Paper
      variant="outlined"
      sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        spacing={2}
        mb={3}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: 2,
              bgcolor: "action.hover",
              display: "grid",
              placeItems: "center",
            }}
          >
            <StorefrontOutlined
              color="primary"
              fontSize="large"
            />
          </Box>

          <Box>
            <Typography
              variant="h6"
              fontWeight={800}
            >
              {data.nameShop}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Thông tin cửa hàng
            </Typography>
          </Box>
        </Stack>

        <Button
          variant="contained"
          startIcon={<EditOutlined />}
          onClick={onEdit}
        >
          Chỉnh sửa
        </Button>
      </Stack>

      <Stack spacing={3}>
        <Box>
          <Typography
            fontWeight={700}
            mb={2}
          >
            Thông tin chung
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
              },
              gap: 2.5,
            }}
          >
            <InfoItem
              icon={PhoneOutlined}
              label="Số điện thoại"
              value={data.phone}
            />

            <InfoItem
              icon={AccessTimeOutlined}
              label="Giờ mở cửa"
              value={data.openHours}
            />

            <InfoItem
              icon={LocationOnOutlined}
              label="Địa chỉ"
              value={data.address}
            />

            <InfoItem
              icon={MapOutlined}
              label="Google Maps"
              value={data.googleMapLink}
              href={data.googleMapLink}
            />
          </Box>
        </Box>

        <Divider />

        <Box>
          <Typography
            fontWeight={700}
            mb={2}
          >
            Mạng xã hội
          </Typography>

          <Stack spacing={2}>
            <InfoItem
              icon={FacebookOutlined}
              label="Facebook"
              value={data.fbLink}
              href={data.fbLink}
            />

            <InfoItem
              label="Zalo"
              value={data.zaloLink}
              href={data.zaloLink}
            />
          </Stack>
        </Box>

        <Divider />

        <Box>
          <Typography
            fontWeight={700}
            mb={2}
          >
            Thông tin thanh toán
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
              },
              gap: 2.5,
            }}
          >
            <InfoItem
              icon={AccountBalanceOutlined}
              label="Ngân hàng"
              value={data.bankName}
            />

            <InfoItem
              label="Chủ tài khoản"
              value={data.bankAccountName}
            />

            <InfoItem
              label="Số tài khoản"
              value={data.bankAccountNumber}
            />
          </Box>

          <Box mt={3}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              mb={1.5}
            >
              <QrCode2Outlined color="action" />
              <Typography fontWeight={600}>QR thanh toán</Typography>
            </Stack>

            {data.paymentQr ? (
              <Box
                component="img"
                src={data.paymentQr}
                alt="QR thanh toán"
                sx={{
                  width: 200,
                  maxWidth: "100%",
                  aspectRatio: "1",
                  objectFit: "contain",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  p: 1,
                }}
              />
            ) : (
              <Typography
                variant="body2"
                color="text.secondary"
              >
                Chưa có mã QR thanh toán
              </Typography>
            )}
          </Box>
        </Box>
      </Stack>
    </Paper>
  )
}

function StoreInfoForm({ data, onCancel, onSubmit, loading }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(storeInfoSchema),
    defaultValues,
  })

  useEffect(() => {
    reset(
      Object.fromEntries(
        Object.entries({
          ...defaultValues,
          ...data,
        }).map(([key, value]) => [key, value ?? ""]),
      ),
    )
  }, [data, reset])

  return (
    <Paper
      variant="outlined"
      sx={{ p: { xs: 2, md: 3 }, borderRadius: 3 }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography
          variant="h6"
          fontWeight={800}
        >
          Chỉnh sửa thông tin
        </Typography>

        <Button
          color="inherit"
          startIcon={<CloseOutlined />}
          onClick={onCancel}
          disabled={loading}
        >
          Đóng
        </Button>
      </Stack>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack spacing={3}>
          {formSections.map((section) => (
            <Box key={section.title}>
              <Typography
                fontWeight={700}
                mb={2}
              >
                {section.title}
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "repeat(2, minmax(0, 1fr))",
                  },
                  gap: 2,
                }}
              >
                {section.fields.map((field) => (
                  <TextField
                    key={field.name}
                    {...register(field.name)}
                    label={field.label}
                    required={field.required}
                    fullWidth
                    size="small"
                    multiline={field.multiline}
                    minRows={field.multiline ? 3 : undefined}
                    error={!!errors[field.name]}
                    helperText={errors[field.name]?.message}
                    sx={field.multiline ? { gridColumn: { md: "span 2" } } : undefined}
                  />
                ))}
              </Box>
            </Box>
          ))}

          <Divider />

          <Stack
            direction={{ xs: "column-reverse", sm: "row" }}
            justifyContent="flex-end"
            spacing={1}
          >
            <Button
              variant="outlined"
              color="inherit"
              onClick={onCancel}
              disabled={loading}
            >
              Hủy
            </Button>

            <Button
              type="submit"
              variant="contained"
              startIcon={<SaveOutlined />}
              disabled={loading || !isDirty}
            >
              {loading ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  )
}

export default function StoreInfoPage() {
  const [editing, setEditing] = useState(false)

  const { data, isLoading, isError, refetch } = useStoreInfo()

  const updateMutation = useUpdateStoreInfo()

  const handleSubmit = (values) => {
    updateMutation.mutate(values, {
      onSuccess: () => {
        toast.success("Cập nhật thông tin cửa hàng thành công")
        setEditing(false)
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Cập nhật thông tin thất bại")
      },
    })
  }

  if (isLoading) {
    return (
      <Box
        minHeight={300}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    )
  }

  if (isError || !data) {
    return (
      <Box p={3}>
        <Typography
          color="error"
          mb={2}
        >
          Không thể tải thông tin cửa hàng.
        </Typography>

        <Button
          variant="outlined"
          onClick={() => refetch()}
        >
          Thử lại
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1100, mx: "auto" }}>
      <Typography
        variant="h5"
        fontWeight={800}
        mb={3}
      >
        Quản lý cửa hàng
      </Typography>

      {editing ? (
        <StoreInfoForm
          data={data}
          onCancel={() => setEditing(false)}
          onSubmit={handleSubmit}
          loading={updateMutation.isPending}
        />
      ) : (
        <StoreInfoView
          data={data}
          onEdit={() => setEditing(true)}
        />
      )}
    </Box>
  )
}
