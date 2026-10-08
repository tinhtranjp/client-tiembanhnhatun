import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button"
import { useForm } from "react-hook-form"
import { categorySchema } from "../service/schema"
import { RHFTextField, Form } from "@/components/form"

function UpdateFormCategory({ onSubmit, category }) {
  const methods = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: category.name },
    mode: "onSubmit",
  })

  const onSubmitForm = async (data) => {
    const result = { ...category, name: data.name }
    await onSubmit?.(result)
  }

  return (
    <Form
      methods={methods}
      onSubmit={onSubmitForm}
    >
      <RHFTextField
        name="name"
        label="Tên thể loại"
      />

      <Button
        variant="contained"
        type="submit"
        loading={methods.formState.isSubmitting}
        loadingIndicator="Loading…"
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </Form>
  )
}

export default UpdateFormCategory
