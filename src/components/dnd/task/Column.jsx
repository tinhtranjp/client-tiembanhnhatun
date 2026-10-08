import { SortableContext, rectSortingStrategy, verticalListSortingStrategy } from "@dnd-kit/sortable"
import Task from "./Task"
import { Box } from "@mui/material"

function Column({ tasks, isGrid }) {
  const type = isGrid ? rectSortingStrategy : verticalListSortingStrategy
  return (
    <SortableContext
      items={tasks.map((t) => t.id)}
      strategy={type}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: isGrid ? "repeat(8, 1fr)" : "repeat(1, 1fr)", // 3 cột
          gap: 2,
        }}
      >
        {tasks?.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
          />
        ))}
      </Box>
    </SortableContext>
  )
}

export default Column
