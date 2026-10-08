import PreviewImage from "@/components/dnd/img/PreviewImage"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Box } from "@mui/material"

function Item({ id, url, onRemoveFile }) {
  const { attributes, setNodeRef, listeners, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    zIndex: isDragging ? 999 : "auto",
    position: "relative",
  }

  return (
    <Box
      ref={setNodeRef}
      style={style}
    >
      <PreviewImage
        url={url}
        id={id}
        onRemoveFile={onRemoveFile}
        dragHandleProps={{ ...attributes, ...listeners }} // ✅ Truyền listeners xuống
        isDragging={isDragging}
      />
    </Box>
  )
}

export default Item
