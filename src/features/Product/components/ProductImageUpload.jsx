import { useEffect, useRef, useState } from "react"
import { Box, Button, IconButton, Typography } from "@mui/material"
import { AddPhotoAlternate, Close, DragIndicator } from "@mui/icons-material"

import { DndContext, closestCenter } from "@dnd-kit/core"

import { SortableContext, useSortable, rectSortingStrategy, arrayMove } from "@dnd-kit/sortable"

import { CSS } from "@dnd-kit/utilities"

const MAX_FILE_SIZE = 5 * 1024 * 1024

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"]

function SortableImage({ id, data, index, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const [preview, setPreview] = useState("")

  useEffect(() => {
    if (data.type === "existing") {
      setPreview(data.secureUrl)
      return
    }

    const url = URL.createObjectURL(data.file)

    setPreview(url)

    return () => {
      URL.revokeObjectURL(url)
    }
  }, [data])

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
  }

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      sx={{
        position: "relative",
        aspectRatio: "1",
        borderRadius: 2,
        overflow: "hidden",
        border: "2px solid",
        borderColor: index === 0 ? "primary.main" : "divider",
        bgcolor: "background.paper",
      }}
    >
      <Box
        component="img"
        src={preview}
        alt={data.type === "existing" ? "Product image" : data.file.name}
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* Drag handle */}
      <IconButton
        {...listeners}
        size="small"
        sx={{
          position: "absolute",
          top: 6,
          left: 6,
          color: "white",
          bgcolor: "rgba(0,0,0,.45)",

          "&:hover": {
            bgcolor: "rgba(0,0,0,.65)",
          },
        }}
      >
        <DragIndicator fontSize="small" />
      </IconButton>

      {/* Thumbnail */}
      {index === 0 && (
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            left: 8,
            bottom: 8,
            px: 1,
            py: 0.5,
            borderRadius: 1,
            bgcolor: "background.paper",
            fontWeight: 600,
          }}
        >
          Thumbnail
        </Typography>
      )}

      {/* Remove */}
      <IconButton
        size="small"
        onClick={() => onRemove(index)}
        sx={{
          position: "absolute",
          top: 6,
          right: 6,
          bgcolor: "background.paper",

          "&:hover": {
            bgcolor: "background.paper",
          },
        }}
      >
        <Close fontSize="small" />
      </IconButton>
    </Box>
  )
}

export default function ProductImageUpload({ value = [], onChange }) {
  const inputRef = useRef(null)

  const [items, setItems] = useState([])

  /*
   * Đồng bộ value từ bên ngoài vào state nội bộ.
   *
   * Create:
   * value = [File, File]
   *
   * Update:
   * value = [
   *   {
   *     id: 1,
   *     secureUrl: "...",
   *     type: "existing",
   *   },
   * ]
   *
   * Sau khi thêm ảnh mới:
   * value = [
   *   {
   *     id: 1,
   *     secureUrl: "...",
   *     type: "existing",
   *   },
   *   {
   *     file: File,
   *     type: "new",
   *   },
   * ]
   */
  useEffect(() => {
    setItems(
      value
        .map((item, index) => {
          // Existing image
          if (item?.type === "existing") {
            return {
              id: `existing-${item.id}`,
              data: item,
            }
          }

          // New image
          if (item?.type === "new") {
            return {
              id: item.id ?? `new-${item.file.name}-${item.file.size}-${index}`,
              data: item,
            }
          }

          // Backward compatible với Create hiện tại
          // đang truyền File[]
          if (item instanceof File) {
            return {
              id: `new-${item.name}-${item.size}-${index}`,
              data: {
                file: item,
                type: "new",
              },
            }
          }

          return null
        })
        .filter(Boolean),
    )
  }, [value])

  const addFiles = (files) => {
    const validFiles = Array.from(files).filter((file) => {
      return ACCEPTED_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE
    })

    if (!validFiles.length) {
      return
    }

    const newItems = validFiles.map((file) => ({
      file,
      type: "new",
    }))

    onChange([...value, ...newItems])
  }

  const handleInputChange = (event) => {
    addFiles(event.target.files)

    // Cho phép chọn lại cùng một file
    event.target.value = ""
  }

  const handleDrop = (event) => {
    event.preventDefault()

    if (event.dataTransfer.files?.length) {
      addFiles(event.dataTransfer.files)
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) {
      return
    }

    const oldIndex = items.findIndex((item) => item.id === active.id)

    const newIndex = items.findIndex((item) => item.id === over.id)

    if (oldIndex === -1 || newIndex === -1) {
      return
    }

    const newItems = arrayMove(items, oldIndex, newIndex)

    setItems(newItems)

    onChange(newItems.map((item) => item.data))
  }

  const handleRemove = (index) => {
    const newItems = items.filter((_, itemIndex) => itemIndex !== index)

    setItems(newItems)

    onChange(newItems.map((item) => item.data))
  }

  return (
    <Box>
      <Typography
        variant="subtitle1"
        fontWeight={500}
        sx={{ mb: 1 }}
      >
        Ảnh sản phẩm
      </Typography>

      {/* Upload area */}
      <Box
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => inputRef.current?.click()}
        sx={{
          border: "2px dashed",
          borderColor: "divider",
          borderRadius: 2,
          p: 3,
          textAlign: "center",
          cursor: "pointer",

          "&:hover": {
            borderColor: "primary.main",
            bgcolor: "action.hover",
          },
        }}
      >
        <AddPhotoAlternate
          sx={{
            fontSize: 42,
            color: "text.secondary",
            mb: 1,
          }}
        />

        <Typography>Kéo thả ảnh vào đây</Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          hoặc chọn ảnh từ máy
        </Typography>

        <Button
          variant="outlined"
          onClick={(event) => {
            event.stopPropagation()
            inputRef.current?.click()
          }}
        >
          Chọn ảnh
        </Button>

        <input
          ref={inputRef}
          type="file"
          hidden
          multiple
          accept="image/jpeg,image/png,image/webp"
          onChange={handleInputChange}
        />
      </Box>

      {/* Images */}
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
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: 2,
                mt: 2,
              }}
            >
              {items.map((item, index) => (
                <SortableImage
                  key={item.id}
                  id={item.id}
                  data={item.data}
                  index={index}
                  onRemove={handleRemove}
                />
              ))}
            </Box>
          </SortableContext>
        </DndContext>
      )}

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          display: "block",
          mt: 1,
        }}
      >
        JPG, PNG, WEBP · tối đa 5MB / ảnh · ảnh đầu tiên là thumbnail
      </Typography>
    </Box>
  )
}
