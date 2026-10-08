import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button"
import { Box } from "@mui/material"

import { Form, RHFTextField } from "../../../components/form"
import RHFNumberCustom from "@/components/form/fields/RHFNumberCustom"
import RHFImageUpload from "@/components/form/fields/RHFImageUpload"
import { candleSchema } from "../service/schema"

function CandleUpdateForm({ candle, onSubmit }) {
  const methods = useForm({
    resolver: zodResolver(candleSchema),
    defaultValues: {
      name: "",
      price: undefined,
      status: "AVAILABLE",
      thumbnail: null,
    },
  })

  useEffect(() => {
    if (!candle) return

    methods.reset({
      name: candle.name,
      price: Number(candle.price),
      status: candle.status,
      thumbnail: null,
    })
  }, [candle, methods])

  const onSubmitForm = async (data) => {
    const formData = new FormData()

    formData.append(
      "data",
      JSON.stringify({
        name: data.name,
        price: data.price,
        status: data.status,
      }),
    )

    // Chỉ gửi file nếu user chọn ảnh mới
    if (data.thumbnail instanceof File) {
      formData.append("file", data.thumbnail)
    }

    await onSubmit(formData)
  }

  return (
    <Form
      methods={methods}
      onSubmit={onSubmitForm}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <RHFTextField
          name="name"
          label="Tên nến"
        />

        <RHFNumberCustom
          name="price"
          label="Giá tiền"
        />

        <RHFImageUpload
          name="thumbnail"
          label="Ảnh nến"
          initialImage={candle?.thumbnail}
        />
      </Box>

      <Button
        sx={{ mt: 2 }}
        variant="contained"
        type="submit"
        loading={methods.formState.isSubmitting}
        loadingIndicator="Loading…"
      >
        Cập nhật
      </Button>
    </Form>
  )
}

export default CandleUpdateForm
