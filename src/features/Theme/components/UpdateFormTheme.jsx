import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button"
import { useForm } from "react-hook-form"
import { themeSchema } from "../service/schema"
import { RHFTextField, Form } from "@/components/form"

function UpdateFormTheme({ onSubmit, theme }) {
  const methods = useForm({
    resolver: zodResolver(themeSchema),
    defaultValues: { name: theme.name },
    mode: "onSubmit",
  })

  const onSubmitForm = async (data) => {
    const result = { ...theme, name: data.name }
    await onSubmit?.(result)
  }

  return (
    <Form
      methods={methods}
      onSubmit={onSubmitForm}
    >
      <RHFTextField
        name="name"
        label="Tên chủ đề"
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

export default UpdateFormTheme
