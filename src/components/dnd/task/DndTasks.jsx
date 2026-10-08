import { DndContext, PointerSensor, KeyboardSensor, closestCorners, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import Column from "./Column"

function DndTasks({ idColumn, tasks = [], onChangeTasks, isGrid = true }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const getTaskPos = (id) => tasks.findIndex((task) => task.id === id)

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return

    const oldIndex = getTaskPos(active.id)
    const newIndex = getTaskPos(over.id)

    if (oldIndex === -1 || newIndex === -1) return

    onChangeTasks?.(arrayMove(tasks, oldIndex, newIndex))
  }

  return (
    <DndContext
      collisionDetection={closestCorners}
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <Column
        id={idColumn}
        tasks={tasks}
        isGrid={isGrid}
      />
    </DndContext>
  )
}

export default DndTasks
