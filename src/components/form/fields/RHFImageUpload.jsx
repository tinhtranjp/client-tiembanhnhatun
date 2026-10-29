import { useController } from "react-hook-form"
import { Box, Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { compressImage } from "@/helper/common"
export default function RHFImageUpload({ name, label = "Ảnh", initialImage = null, accept = "image/*" }) {
  const { field, fieldState } = useController({ name })

  const [preview, setPreview] = useState(initialImage)
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    setPreview(initialImage)
    setRemoved(false)
  }, [initialImage])

  const handleChange = async (event) => {
    const input = event.target
    const file = input.files?.[0]

    if (!file) return

    try {
      let uploadFile = file

      if (["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        try {
          const blob = await compressImage(file)

          uploadFile = new File([blob], file.name.replace(/\.[^.]+$/, ".jpg"), {
            type: blob.type || "image/jpeg",
            lastModified: Date.now(),
          })
        } catch (error) {
          console.error("Nén ảnh thất bại:", error)
        }
      }

      field.onChange(uploadFile)
      setRemoved(false)

      const url = URL.createObjectURL(uploadFile)
      setPreview(url)
    } finally {
      input.value = ""
    }
  }

  const handleRemove = () => {
    field.onChange(null)
    setPreview(null)
    setRemoved(true)
  }

  return (
    <Box>
      <Typography
        variant="body2"
        mb={1}
      >
        {label}
      </Typography>

      {preview && !removed ? (
        <Box>
          <Box
            component="img"
            src={preview}
            alt="Preview"
            sx={{
              width: 200,
              height: 200,
              objectFit: "cover",
              borderRadius: 1,
              border: "1px solid",
              borderColor: "divider",
              display: "block",
              mb: 1,
            }}
          />

          <Button
            variant="outlined"
            color="error"
            onClick={handleRemove}
          >
            Xóa ảnh
          </Button>
        </Box>
      ) : (
        <Button
          component="label"
          variant="outlined"
        >
          Chọn ảnh
          <input
            hidden
            type="file"
            accept={accept}
            onChange={handleChange}
          />
        </Button>
      )}

      {fieldState.error && (
        <Typography
          variant="caption"
          color="error"
          display="block"
          mt={0.5}
        >
          {fieldState.error.message}
        </Typography>
      )}
    </Box>
  )
}
