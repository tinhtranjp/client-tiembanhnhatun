import { useForm } from "react-hook-form"
import { Form, RHFTextField } from "../../../components/form"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button"
import { themeSchema } from "../service/schema"

function FormTheme({ onSubmit }) {
  const methods = useForm({
    resolver: zodResolver(themeSchema),
    defaultValues: { name: "" },
  })

  const onSubmitForm = async (data) => {
    await onSubmit(data)
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

export default FormTheme
