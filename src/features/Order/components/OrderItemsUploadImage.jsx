import { useEffect, useRef, useState } from "react"
import { Box, Button, IconButton, Typography, Tooltip } from "@mui/material"
import { AddPhotoAlternate, Close, DragIndicator } from "@mui/icons-material"

import { DndContext, closestCenter } from "@dnd-kit/core"
import { SortableContext, useSortable, rectSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const MAX_FILE_SIZE = 5 * 1024 * 1024
const MAX_FILES = 5
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"]

function createImageId() {
  return `order-image-${crypto.randomUUID()}`
}

function SortableImage({ item, index, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id })

  const [preview, setPreview] = useState("")

  useEffect(() => {
    if (item.type === "existing") {
      setPreview(item.url || "")
      return
    }

    if (!(item.file instanceof File)) {
      setPreview("")
      return
    }

    const objectUrl = URL.createObjectURL(item.file)
    setPreview(objectUrl)

    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [item.type, item.file, item.url])
  return (
    <Box
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: "none",
      }}
      sx={{
        position: "relative",
        aspectRatio: "1",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "background.paper",
      }}
    >
      {preview && (
        <Box
          component="img"
          src={preview}
          alt={`Ảnh tham khảo ${index + 1}`}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      )}
      <Tooltip title="Kéo để sắp xếp">
        <IconButton
          {...attributes}
          {...listeners}
          size="small"
          sx={{
            position: "absolute",
            top: 6,
            left: 6,
            color: "white",
            bgcolor: "rgba(0,0,0,.5)",
            "&:hover": {
              bgcolor: "rgba(0,0,0,.7)",
            },
          }}
        >
          <DragIndicator fontSize="small" />
        </IconButton>
      </Tooltip>

      <IconButton
        size="small"
        aria-label={`Xóa ảnh ${index + 1}`}
        onClick={() => onRemove(index)}
        sx={{
          position: "absolute",
          top: 6,
          right: 6,
          bgcolor: "background.paper",
          "&:hover": {
            bgcolor: "action.hover",
          },
        }}
      >
        <Close fontSize="small" />
      </IconButton>

      <Typography
        variant="caption"
        sx={{
          position: "absolute",
          bottom: 6,
          left: 6,
          px: 1,
          py: 0.25,
          borderRadius: 1,
          bgcolor: "rgba(0,0,0,.6)",
          color: "white",
        }}
      >
        {index + 1}
      </Typography>
    </Box>
  )
}

export default function OrderItemsUploadImage({ value = [], onChange, maxFiles = MAX_FILES }) {
  const inputRef = useRef(null)
  const [error, setError] = useState("")

  // Chuẩn hóa ảnh từ RHF thành danh sách có ID ổn định.
  const items = value.map((item, index) => ({
    ...item,
    id: item.id ?? `order-image-${index}`,
  }))

  const addFiles = (fileList) => {
    const files = Array.from(fileList ?? [])

    if (!files.length) return

    const remaining = maxFiles - items.length

    if (remaining <= 0) {
      setError(`Mỗi sản phẩm chỉ được tối đa ${maxFiles} ảnh.`)
      return
    }

    const accepted = []
    const errors = []

    for (const file of files) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        errors.push(`${file.name}: chỉ nhận JPG, PNG hoặc WEBP.`)
        continue
      }

      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: ảnh vượt quá 5 MB.`)
        continue
      }

      if (accepted.length >= remaining) {
        errors.push(`Mỗi sản phẩm chỉ được tối đa ${maxFiles} ảnh.`)
        break
      }

      accepted.push({
        id: createImageId(),
        type: "new",
        file,
      })
    }

    if (accepted.length) {
      onChange([...items, ...accepted])
    }

    setError(errors.join(" "))
  }

  const handleInputChange = (event) => {
    addFiles(event.target.files)

    // Cho phép chọn lại cùng file.
    event.target.value = ""
  }

  const handleDrop = (event) => {
    event.preventDefault()
    addFiles(event.dataTransfer.files)
  }

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return

    const oldIndex = items.findIndex((item) => item.id === active.id)
    const newIndex = items.findIndex((item) => item.id === over.id)

    if (oldIndex < 0 || newIndex < 0) return

    onChange(arrayMove(items, oldIndex, newIndex))
  }

  const handleRemove = (index) => {
    onChange(items.filter((_, itemIndex) => itemIndex !== index))
    setError("")
  }

  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <Typography
          variant="subtitle2"
          fontWeight={600}
        >
          Ảnh tham khảo
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
        >
          {items.length}/{maxFiles} ảnh
        </Typography>
      </Box>

      <Box
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
        onClick={() => {
          if (items.length < maxFiles) {
            inputRef.current?.click()
          }
        }}
        sx={{
          border: "1px dashed",
          borderColor: "divider",
          borderRadius: 2,
          p: 2,
          textAlign: "center",
          cursor: items.length < maxFiles ? "pointer" : "default",
          "&:hover": {
            borderColor: items.length < maxFiles ? "primary.main" : "divider",
            bgcolor: items.length < maxFiles ? "action.hover" : "transparent",
          },
        }}
      >
        <AddPhotoAlternate sx={{ fontSize: 32, color: "text.secondary" }} />

        <Typography variant="body2">Kéo thả ảnh mẫu bánh vào đây</Typography>

        <Typography
          variant="caption"
          color="text.secondary"
        >
          JPG, PNG, WEBP · tối đa 5 MB/ảnh
        </Typography>

        <Box mt={1}>
          <Button
            size="small"
            variant="outlined"
            disabled={items.length >= maxFiles}
            onClick={(event) => {
              event.stopPropagation()
              inputRef.current?.click()
            }}
          >
            Chọn ảnh
          </Button>
        </Box>

        <input
          ref={inputRef}
          type="file"
          hidden
          multiple
          accept="image/jpeg,image/png,image/webp"
          onChange={handleInputChange}
        />
      </Box>

      {error && (
        <Typography
          variant="caption"
          color="error"
          display="block"
          mt={1}
        >
          {error}
        </Typography>
      )}

      {items.length > 0 && (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((item) => item.id)}
            strategy={rectSortingStrategy}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                gap: 1.5,
                mt: 2,
              }}
            >
              {items.map((item, index) => (
                <SortableImage
                  key={item.id}
                  item={item}
                  index={index}
                  onRemove={handleRemove}
                />
              ))}
            </Box>
          </SortableContext>
        </DndContext>
      )}
    </Box>
  )
}
