import { closestCorners, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import Column from "./Column"

function DndImages({ idColumn, imgs, onChangeImgs, isGrid = true, onClick, onRemoveFile, isError }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )
  const getImgPos = (id) => imgs.findIndex((img) => img.id === id)

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id === over.id) return

    onChangeImgs((imgs) => {
      const originalPos = getImgPos(active.id)
      const newPos = getImgPos(over.id)

      return arrayMove(imgs, originalPos, newPos)
    })
  }

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
      sensors={sensors}
    >
      <Column
        isGrid={isGrid}
        id={idColumn}
        imgs={imgs}
        onClick={onClick}
        onRemoveFile={onRemoveFile}
        isError={isError}
      />
    </DndContext>
  )
}

export default DndImages
