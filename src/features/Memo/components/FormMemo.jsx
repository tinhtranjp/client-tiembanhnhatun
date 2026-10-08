import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import RHFCkeditor from "@/components/form/fields/RHFCkeditor"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { useMediaDiff } from "@/hook/useMediaDiff"

import { Form, RHFTextField } from "@/components/form"

import { memoSchema } from "../service/schema"
import { useRef } from "react"

function FormMemo({ onSubmit }) {
  const editorRef = useRef(null)

  const { getMediaDiff } = useMediaDiff()
  const methods = useForm({
    resolver: zodResolver(memoSchema),

    defaultValues: {
      title: "",
      description: "",
    },
  })

  const onSubmitForm = async (data) => {
    const uploadMedia = editorRef.current?.getUploadMedia() ?? []
    const { activeImageIds, deleteImageIds } = getMediaDiff(data.description, uploadMedia)
    await onSubmit({
      ...data,
      activeImageIds,
      deleteImageIds,
    })
  }

  return (
    <Form
      methods={methods}
      onSubmit={onSubmitForm}
    >
      <Stack spacing={3}>
        <RHFTextField
          name="title"
          label="Tiêu đề"
        />

        <RHFCkeditor
          ref={editorRef}
          name="description"
          label="Nội dung"
          folder="memos"
          relatedType="memo"
          imageType="description"
        />
        <Button
          variant="contained"
          type="submit"
          loading={methods.formState.isSubmitting}
          loadingIndicator="Loading…"
        >
          Submit
        </Button>
      </Stack>
    </Form>
  )
}

export default FormMemo
