import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import Paper from "@mui/material/Paper"
function Task({ id, title }) {
  const { attributes, setNodeRef, listeners, transform, transition, isDragging } = useSortable({ id })
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    zIndex: isDragging ? 999 : "auto",
    cursor: isDragging ? "grabbing" : "grab",
    position: isDragging ? "relative" : "relative",
  }

  return (
    <Paper
      elevation={4}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      sx={{ padding: 2 }}
    >
      {title}
    </Paper>
  )
}
export default Task
