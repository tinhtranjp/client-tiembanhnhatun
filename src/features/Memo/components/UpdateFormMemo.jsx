import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import RHFCkeditor from "@/components/form/fields/RHFCkeditor"
import { Form, RHFTextField } from "@/components/form"
import { useRef } from "react"
import { memoSchema } from "../service/schema"
import { useMediaDiff } from "@/hook/useMediaDiff"
function UpdateFormMemo({ memo, onSubmit }) {
  const editorRef = useRef(null)
  const { getMediaDiff } = useMediaDiff()

  const methods = useForm({
    resolver: zodResolver(memoSchema),

    defaultValues: {
      title: "",
      description: "",
    },
  })

  useEffect(() => {
    if (!memo) return

    methods.reset({
      title: memo.title,
      description: memo.description,
    })
  }, [memo, methods])

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
          type="submit"
          variant="contained"
          fullWidth
        >
          Cập nhật ghi chú
        </Button>
      </Stack>
    </Form>
  )
}

export default UpdateFormMemo
