import { useForm } from "react-hook-form"
import { Form, RHFRadioGroup, RHFTextField } from "../../../components/form"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button"
import { orderSchema } from "../service/schema"
import RHFCkeditor from "@/components/form/fields/RHFCkeditor"
import { Box } from "@mui/material"
import { useRef } from "react"
import { useMediaDiff } from "@/hook/useMediaDiff"
import FormOrderItems from "./FormOrderItems"
import { contactChanelOptions } from "@/helper/optionsData"
import { Controller } from "react-hook-form"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"
import "dayjs/locale/vi"
import { buildOrderFormData, defaultValues, mapOrderToForm } from "../service/helper"
import { useLocation, useNavigate, useParams } from "react-router-dom"

function FormOrder({ onSubmit, product, initialData, mode = "create" }) {
  const editorRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  const { getMediaDiff } = useMediaDiff()
  const mappedData = initialData ? mapOrderToForm(initialData) : defaultValues

  console.log("API id:", initialData?.id, typeof initialData?.id)
  console.log("Mapped id:", mappedData.id, typeof mappedData.id)
  console.log("Mapped item id:", mappedData.orderItems?.[0]?.id, typeof mappedData.orderItems?.[0]?.id)

  const methods = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: mappedData,
  })

  const onSubmitForm = async (data) => {
    try {
      const uploadMedia = editorRef.current?.getUploadMedia() ?? []
      const { activeImageIds, deleteImageIds } = getMediaDiff(data.adminNote, uploadMedia)

      const orderItems = data.orderItems.map((item) => ({
        ...item,
        subtotal: Number(item.subtotal ?? 0),
      }))

      const subtotal = orderItems.reduce((total, item) => total + item.subtotal, 0)
      const shippingCost = data.isShipping ? 30000 : 0

      const submitData = {
        ...data,
        recipientName: data.isShipping ? data.recipientName : "",
        recipientPhone: data.isShipping ? data.recipientPhone : "",
        deliveryAddress: data.isShipping ? data.deliveryAddress : "",
        orderItems,
        subtotal,
        shippingCost,
        totalAmount: subtotal + shippingCost,
        activeImageIds,
        deleteImageIds,
      }
      console.log("submitData ====>", submitData)
      const formData = buildOrderFormData(submitData)
      await onSubmit?.(formData)
      onBackPage()
    } catch (error) {
      console.log(error)
    }
  }

  const onBackPage = () => {
    navigate(location.state?.from ?? "/order/list")
  }
  const isShipping = methods.watch("isShipping")

  console.log(methods.getValues("orderItems.0.unitPrice"))
  return (
    <Form
      methods={methods}
      onSubmit={onSubmitForm}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <RHFTextField
          name="customerName"
          label="Tên người đặt bánh"
        />
        <RHFTextField
          name="customerPhone"
          label="Số điện thoại người đặt bánh"
        />
        <RHFRadioGroup
          name="isShipping"
          label="Hình thức nhận bánh"
          row
          booleanValue
          options={[
            { label: "Đến lấy tại tiệm", value: false },
            { label: "Giao hàng", value: true },
          ]}
        />
        {isShipping && (
          <>
            <RHFTextField
              name="recipientName"
              label="Tên người nhận bánh"
            />
            <RHFTextField
              name="recipientPhone"
              label="Số điện thoại người nhận bánh"
            />
            <RHFTextField
              name="deliveryAddress"
              label="Địa chỉ nhận bánh"
            />
          </>
        )}

        <RHFRadioGroup
          label={"Nơi nhận đơn"}
          options={contactChanelOptions}
          name="contactChannel"
          row
        />
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="vi"
        >
          <Controller
            name="pickupAt"
            control={methods.control}
            render={({ field, fieldState }) => (
              <DateTimePicker
                label="Thời gian nhận bánh"
                value={field.value ? dayjs(field.value) : null}
                onChange={(date) => {
                  field.onChange(date?.isValid() ? date.toISOString() : "")
                }}
                format="DD/MM/YYYY HH:mm"
                ampm={false}
                minDateTime={dayjs()}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
        <RHFCkeditor
          ref={editorRef}
          name="adminNote"
          label="Ghi chú của admin"
          folder="products"
          relatedType="product"
          imageType="description"
        />
        <FormOrderItems initialData={initialData} />
      </Box>
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        type="submit"
        loading={methods.formState.isSubmitting}
        loadingIndicator="Loading…"
      >
        Submit
      </Button>
    </Form>
  )
}

export default FormOrder
