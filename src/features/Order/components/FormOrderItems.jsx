import { useEffect, useState } from "react"
import { Controller, useFieldArray, useFormContext, useWatch } from "react-hook-form"
import { Box, Grid, IconButton, Stack, TextField, Typography } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"

import OrderItemsUploadImage from "./OrderItemsUploadImage"
import CandlePicker from "./CandlePicker"
import HatPicker from "./HatPicker"
import RHFNumberCustom from "@/components/form/fields/RHFNumberCustom"
import { layers, sizeCakes, cakeBaseOptions } from "@/features/Product/helper"
import { AutocompleteField } from "@/components/form"
import { useMemo } from "react"

const emptyOrderItem = {
  productId: undefined,
  productName: "",
  note: "",
  size: "",
  unitPrice: undefined,
  quantity: 1,
  subtotal: undefined,
  candleId: undefined,
  candleNumber: "",
  itemStatus: "PENDING",
  hatId: undefined,
  birthdayMessage: "",
  messageToUser: "",
  cakeBase: "",
  layers: "",
  images: [],
}

export default function FormOrderItems({ initialData }) {
  const [selectedCandles, setSelectedCandles] = useState({})
  const [selectedHats, setSelectedHats] = useState({})

  const {
    control,
    register,
    setValue,
    formState: { errors },
  } = useFormContext()
  console.log(errors)
  const { fields, append, remove } = useFieldArray({
    control,
    name: "orderItems",
  })

  const watchedOrderItems = useWatch({
    control,
    name: "orderItems",
  })

  const orderItems = useMemo(() => watchedOrderItems ?? [], [watchedOrderItems])

  const handleCandleChange = (index, candle, onChange) => {
    onChange(candle ? Number(candle.id) : undefined)

    setSelectedCandles((prev) => {
      const next = { ...prev }

      if (candle) {
        next[index] = candle
      } else {
        delete next[index]
      }

      return next
    })
  }

  const handleHatChange = (index, hat, onChange) => {
    onChange(hat ? Number(hat.id) : undefined)

    setSelectedHats((prev) => {
      const next = { ...prev }

      if (hat) {
        next[index] = hat
      } else {
        delete next[index]
      }

      return next
    })
  }

  const handleRemove = (index) => {
    remove(index)

    const removeAndShift = (prev) =>
      Object.fromEntries(
        Object.entries(prev)
          .filter(([key]) => Number(key) !== index)
          .map(([key, value]) => [Number(key) > index ? Number(key) - 1 : Number(key), value]),
      )

    setSelectedCandles(removeAndShift)
    setSelectedHats(removeAndShift)
  }
  useEffect(() => {
    if (!initialData?.orderItems) return

    setSelectedCandles(Object.fromEntries(initialData.orderItems.map((item, index) => [index, item.candle ?? null])))

    setSelectedHats(Object.fromEntries(initialData.orderItems.map((item, index) => [index, item.hat ?? null])))
  }, [initialData])
  // Đồng bộ subtotal vào form sau khi dữ liệu thay đổi.
  useEffect(() => {
    orderItems.forEach((item, index) => {
      const hasPrice =
        item?.unitPrice !== undefined &&
        item?.unitPrice !== null &&
        item?.unitPrice !== "" &&
        item?.quantity !== undefined &&
        item?.quantity !== null &&
        item?.quantity !== ""

      const subtotal = hasPrice
        ? Number(item.unitPrice) * Number(item.quantity) +
          Number(selectedHats[index]?.price ?? 0) +
          Number(selectedCandles[index]?.price ?? 0)
        : undefined

      if (item?.subtotal !== subtotal) {
        setValue(`orderItems.${index}.subtotal`, subtotal, {
          shouldDirty: false,
          shouldValidate: false,
        })
      }
    })
  }, [orderItems, selectedHats, selectedCandles, setValue])

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h6">Sản phẩm trong đơn hàng</Typography>
      </Box>

      {fields.map((field, index) => {
        const item = orderItems[index]
        const itemErrors = errors.orderItems?.[index]

        const hatPrice = Number(selectedHats[index]?.price ?? 0)
        const candlePrice = Number(selectedCandles[index]?.price ?? 0)

        const hasPrice =
          item?.unitPrice !== undefined &&
          item?.unitPrice !== null &&
          item?.unitPrice !== "" &&
          item?.quantity !== undefined &&
          item?.quantity !== null &&
          item?.quantity !== ""

        const subtotal = hasPrice ? Number(item.unitPrice) * Number(item.quantity) + hatPrice + candlePrice : null

        return (
          <Box
            key={field.id}
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 2,
              p: 2,
              mb: 2,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography fontWeight={600}>Sản phẩm #{index + 1}</Typography>

              <Stack
                direction="row"
                spacing={1}
              >
                <IconButton
                  color="primary"
                  onClick={() => append({ ...emptyOrderItem })}
                  aria-label="Thêm sản phẩm"
                >
                  <AddIcon />
                </IconButton>

                <IconButton
                  color="error"
                  onClick={() => handleRemove(index)}
                  disabled={fields.length === 1}
                  aria-label={`Xóa sản phẩm ${index + 1}`}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </Box>

            <Grid
              container
              spacing={2}
            >
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  {...register(`orderItems.${index}.productName`)}
                  label="Tên sản phẩm"
                  fullWidth
                  error={!!itemErrors?.productName}
                  helperText={itemErrors?.productName?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <AutocompleteField
                  name={`orderItems.${index}.cakeBase`}
                  label="Vị bánh"
                  options={cakeBaseOptions}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <AutocompleteField
                  name={`orderItems.${index}.layers`}
                  label="Số tầng"
                  options={layers}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <AutocompleteField
                  name={`orderItems.${index}.size`}
                  label="Size bánh"
                  options={sizeCakes}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <RHFNumberCustom
                  {...register(`orderItems.${index}.unitPrice`, {
                    setValueAs: (value) => (value === "" ? undefined : Number(value)),
                  })}
                  label="Đơn giá"
                  type="number"
                  fullWidth
                  slotProps={{ htmlInput: { min: 0 } }}
                  error={!!itemErrors?.unitPrice}
                  helperText={itemErrors?.unitPrice?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  {...register(`orderItems.${index}.quantity`, {
                    setValueAs: (value) => (value === "" ? undefined : Number(value)),
                  })}
                  label="Số lượng"
                  type="number"
                  fullWidth
                  slotProps={{ htmlInput: { min: 1, step: 1 } }}
                  error={!!itemErrors?.quantity}
                  helperText={itemErrors?.quantity?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  {...register(`orderItems.${index}.birthdayMessage`)}
                  label="Lời nhắn trên bánh"
                  fullWidth
                  inputProps={{ maxLength: 255 }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <Controller
                  name={`orderItems.${index}.candleId`}
                  control={control}
                  render={({ field: controllerField }) => (
                    <CandlePicker
                      value={selectedCandles[index] ?? null}
                      onChange={(candle) => handleCandleChange(index, candle, controllerField.onChange)}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  {...register(`orderItems.${index}.candleNumber`)}
                  label="Nến số"
                  fullWidth
                  inputProps={{ maxLength: 255 }}
                />

                <Typography variant="caption">
                  Lưu ý: nếu chọn nến số, shop sẽ ưu tiên lấy nến số. Nếu muốn chọn cả hai, hãy ghi rõ ở phần ghi chú
                  của khách.
                </Typography>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  {...register(`orderItems.${index}.note`)}
                  label="Ghi chú của khách"
                  fullWidth
                  multiline
                  rows={2}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  {...register(`orderItems.${index}.messageToUser`)}
                  label="Ghi chú gửi tới khách"
                  fullWidth
                  multiline
                  rows={2}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <Controller
                  name={`orderItems.${index}.hatId`}
                  control={control}
                  render={({ field: controllerField }) => (
                    <HatPicker
                      value={selectedHats[index] ?? null}
                      onChange={(hat) => handleHatChange(index, hat, controllerField.onChange)}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Thành tiền"
                  value={subtotal !== null ? subtotal.toLocaleString("vi-VN") : ""}
                  fullWidth
                  slotProps={{ input: { readOnly: true } }}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Controller
                  name={`orderItems.${index}.images`}
                  control={control}
                  render={({ field: controllerField }) => (
                    <OrderItemsUploadImage
                      value={controllerField.value ?? []}
                      onChange={controllerField.onChange}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Box>
        )
      })}
    </Box>
  )
}
