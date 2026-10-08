import { useController } from "react-hook-form"
import { Box, Button, Typography } from "@mui/material"
import { useEffect, useState } from "react"

export default function RHFImageUpload({ name, label = "Ảnh", initialImage = null, accept = "image/*" }) {
  const { field, fieldState } = useController({ name })

  const [preview, setPreview] = useState(initialImage)
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    setPreview(initialImage)
    setRemoved(false)
  }, [initialImage])

  const handleChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    field.onChange(file)
    setRemoved(false)

    const url = URL.createObjectURL(file)
    setPreview(url)
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
