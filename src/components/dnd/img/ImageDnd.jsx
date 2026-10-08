import { useState, useEffect, useRef, useCallback } from "react"
import DndImages from "./DndImages"
import { Box } from "@mui/material"
import isEqual from "lodash/isEqual"

export default function ImageDnd({ onChange, isError, type = "add", initialValue, ...props }) {
  const [items, setItems] = useState([])
  const [start, setStart] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (onChange && start) {
      // const files = items.map((i) => i.file).filter((f) => !!f)
      onChange(items)
    } else if (onChange && !isEqual(items, initialValue)) {
      onChange(items)
    }
  }, [items])

  useEffect(() => {
    if (initialValue && type === "update") {
      setItems([...initialValue].sort((a, b) => (a.orderBy ?? 0) - (b.orderBy ?? 0)))
    }
  }, [initialValue, type])

  useEffect(() => {
    return () => {
      items.forEach((item) => {
        if (item.preview) {
          URL.revokeObjectURL(item.preview)
        }
      })
    }
  }, [])

  function handleFiles(files) {
    if (!files) return
    const newItems = Array.from(files).map((file, idx) => ({
      id: `${Date.now()}-${idx}`,
      file,
      url: URL.createObjectURL(file),
    }))
    setItems((prev) => [...prev, ...newItems])

    setStart(true)
  }

  function removeItem(id) {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id)
      if (target?.preview) {
        URL.revokeObjectURL(target.url)
      }
      return prev.filter((i) => i.id !== id)
    })
  }

  const handleButtonClick = useCallback(() => {
    inputRef.current?.click()
  }, [])

  return (
    <Box {...props}>
      <DndImages
        imgs={items}
        onChangeImgs={setItems}
        onRemoveFile={removeItem} // truyền xuống để Page gọi khi xóa
        onClick={handleButtonClick}
        isError={isError}
      />
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleFiles(e.target.files)}
        hidden
        id="fileInput"
      />
    </Box>
  )
}
