import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button"
import { Box } from "@mui/material"

import { Form, RHFTextField } from "../../../components/form"
import RHFNumberCustom from "@/components/form/fields/RHFNumberCustom"
import RHFImageUpload from "@/components/form/fields/RHFImageUpload"
import { hatSchema } from "../service/schema"

function HatUpdateForm({ hat, onSubmit }) {
  const methods = useForm({
    resolver: zodResolver(hatSchema),
    defaultValues: {
      name: "",
      price: undefined,
      status: "AVAILABLE",
      thumbnail: null,
    },
  })

  useEffect(() => {
    if (!hat) return

    methods.reset({
      name: hat.name,
      price: Number(hat.price),
      status: hat.status,
      thumbnail: null,
    })
  }, [hat, methods])

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
          label="Tên mũ"
        />

        <RHFNumberCustom
          name="price"
          label="Giá tiền"
        />

        <RHFImageUpload
          name="thumbnail"
          label="Ảnh mũ"
          initialImage={hat?.thumbnail}
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

export default HatUpdateForm
