import { useForm } from "react-hook-form"
import { Form, RHFTextField } from "../../../components/form"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button"
import RHFNumberCustom from "@/components/form/fields/RHFNumberCustom"
import RHFImageUpload from "@/components/form/fields/RHFImageUpload"
import { Box } from "@mui/material"
import { hatCreateSchema } from "../service/schema"

function FormHat({ onSubmit }) {
  const methods = useForm({
    resolver: zodResolver(hatCreateSchema),
    defaultValues: { name: "", price: undefined, status: "AVAILABLE", thumbnail: null },
  })

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

    if (data.thumbnail) {
      formData.append("file", data.thumbnail)
    }

    await onSubmit(formData)
    methods.reset()
  }

  return (
    <Form
      methods={methods}
      onSubmit={onSubmitForm}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <RHFTextField
          name="name"
          label="Tên mũ"
        />
        <RHFNumberCustom
          name="price"
          label="Giá tiền"
        />
        <RHFImageUpload
          name={"thumbnail"}
          label="Ảnh mũ"
        />
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

export default FormHat
