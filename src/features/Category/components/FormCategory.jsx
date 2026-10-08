import { useForm } from "react-hook-form"
import { Form, RHFTextField } from "../../../components/form"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button"
import { categorySchema } from "../service/schema"

function FormCategory({ onSubmit }) {
  const methods = useForm({
    resolver: zodResolver(categorySchema),
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
        label="Tên thể loại"
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

export default FormCategory
