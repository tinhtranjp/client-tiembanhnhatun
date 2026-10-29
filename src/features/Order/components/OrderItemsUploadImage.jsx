import { useEffect, useRef, useState } from "react"
import { Box, Button, IconButton, Typography, Tooltip } from "@mui/material"
import { AddPhotoAlternate, Close, DragIndicator } from "@mui/icons-material"

import { DndContext, closestCenter } from "@dnd-kit/core"
import { SortableContext, useSortable, rectSortingStrategy, arrayMove } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

import { compressImage } from "@/helper/common"

const MAX_FILE_SIZE = 50 * 1024 * 1024
const MAX_FILES = 5

function createImageId() {
  return `order-image-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function isImageFile(file) {
  if (!file) return false

  if (file.type?.startsWith("image/")) return true

  return /\.(jpe?g|png|webp|gif|bmp|avif|heic|heif|tiff?)$/i.test(file.name || "")
}

function SortableImage({ item, index, onRemove }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id })

  const [preview, setPreview] = useState("")
  const [previewError, setPreviewError] = useState(false)

  useEffect(() => {
    setPreviewError(false)

    if (item.type === "existing") {
      setPreview(item.url || "")
      return
    }

    const file = item.file

    if (!file || typeof file !== "object") {
      setPreview("")
      setPreviewError(true)
      return
    }

    let objectUrl

    try {
      objectUrl = URL.createObjectURL(file)
      setPreview(objectUrl)
    } catch (error) {
      console.error("Không tạo được preview:", error)
      setPreview("")
      setPreviewError(true)
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
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
      {preview && !previewError && (
        <Box
          component="img"
          src={preview}
          alt={`Ảnh tham khảo ${index + 1}`}
          onError={() => {
            console.error("Trình duyệt không đọc được ảnh:", {
              name: item.file?.name,
              type: item.file?.type,
              size: item.file?.size,
            })
            setPreviewError(true)
          }}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      )}

      {(!preview || previewError) && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 1,
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          <AddPhotoAlternate />
          <Typography variant="caption">{previewError ? "Không đọc được ảnh" : "Đang tải ảnh..."}</Typography>
        </Box>
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
  const [isCompressing, setIsCompressing] = useState(false)

  const items = (Array.isArray(value) ? value : []).map((item, index) => ({
    ...item,
    id: item.id ?? `order-image-existing-${index}`,
  }))

  // Nén tuần tự để giảm tải RAM trên điện thoại.
  const addFiles = async (fileList) => {
    const files = Array.from(fileList ?? [])

    if (!files.length) return

    const remaining = maxFiles - items.length

    if (remaining <= 0) {
      setError(`Mỗi sản phẩm chỉ được tối đa ${maxFiles} ảnh.`)
      return
    }

    const accepted = []
    const errors = []

    setIsCompressing(true)
    setError("")

    try {
      for (const file of files) {
        if (accepted.length >= remaining) {
          errors.push(`Mỗi sản phẩm chỉ được tối đa ${maxFiles} ảnh.`)
          break
        }

        if (!file || file.size <= 0) {
          errors.push("Có ảnh không hợp lệ hoặc dung lượng bằng 0.")
          continue
        }

        if (!isImageFile(file)) {
          errors.push(`${file.name || "File"}: không phải định dạng ảnh hỗ trợ.`)
          continue
        }

        if (file.size > MAX_FILE_SIZE) {
          errors.push(`${file.name}: ảnh vượt quá 50 MB.`)
          continue
        }
        try {
          const compressedBlob = await compressImage(file)

          if (!compressedBlob || typeof compressedBlob.size !== "number" || compressedBlob.size <= 0) {
            throw new Error("Kết quả nén ảnh không hợp lệ.")
          }

          const compressedFile =
            compressedBlob instanceof File
              ? compressedBlob
              : new File([compressedBlob], file.name.replace(/\.[^.]+$/, ".jpg"), {
                  type: compressedBlob.type || "image/jpeg",
                  lastModified: Date.now(),
                })

          accepted.push({
            id: createImageId(),
            type: "new",
            file: compressedFile,
          })
        } catch (compressionError) {
          console.error("Không nén được ảnh:", file.name, compressionError)
          errors.push(`${file.name}: không xử lý được ảnh. Ông thử ảnh JPG hoặc PNG nhé.`)
        }
      }

      if (accepted.length > 0) {
        onChange([...items, ...accepted])
      }

      setError(errors.join(" "))
    } finally {
      setIsCompressing(false)
    }
  }

  const handleInputChange = async (event) => {
    const input = event.target
    const files = input.files

    try {
      await addFiles(files)
    } catch (error) {
      console.error("Lỗi xử lý ảnh:", error)
      setError("Không thể xử lý ảnh. Ông thử chọn lại ảnh nhé.")
    } finally {
      // Cho phép chọn lại cùng một file.
      input.value = ""
    }
  }

  const handleDrop = async (event) => {
    event.preventDefault()

    if (isCompressing) return

    await addFiles(event.dataTransfer.files)
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

  const openFilePicker = () => {
    if (!isCompressing && items.length < maxFiles) {
      inputRef.current?.click()
    }
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
        onClick={openFilePicker}
        sx={{
          border: "1px dashed",
          borderColor: "divider",
          borderRadius: 2,
          p: 2,
          textAlign: "center",
          cursor: !isCompressing && items.length < maxFiles ? "pointer" : "default",
          "&:hover": {
            borderColor: !isCompressing && items.length < maxFiles ? "primary.main" : "divider",
            bgcolor: !isCompressing && items.length < maxFiles ? "action.hover" : "transparent",
          },
        }}
      >
        <AddPhotoAlternate sx={{ fontSize: 32, color: "text.secondary" }} />

        <Typography variant="body2">
          {isCompressing ? "Đang xử lý và nén ảnh..." : "Chọn ảnh mẫu bánh từ điện thoại"}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
        >
          JPG, PNG, WEBP và một số định dạng ảnh khác · tối đa 50 MB/ảnh
        </Typography>

        <Box mt={1}>
          <Button
            size="small"
            variant="outlined"
            disabled={isCompressing || items.length >= maxFiles}
            onClick={(event) => {
              event.stopPropagation()
              openFilePicker()
            }}
          >
            {isCompressing ? "Đang nén ảnh..." : "Chọn ảnh"}
          </Button>
        </Box>

        <input
          ref={inputRef}
          type="file"
          hidden
          multiple
          accept="image/*"
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
