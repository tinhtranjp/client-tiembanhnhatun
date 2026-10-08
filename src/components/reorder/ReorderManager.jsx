import { useCallback } from "react"
import ReorderList from "./ReorderList"
import useReorder from "@/components/reorder/useReorder"

function ReorderManager({
  data,
  mutation,
  idColumn,
  showReset = false,
  maxWidth = "100%",
  saveText = "Lưu",
  resetText = "Reset",
  isGrid = false,
  mapItem,
}) {
  const defaultMapItem = useCallback(
    (item) => ({
      id: item.id,
      title: item.name,
    }),
    [],
  )

  const mapper = mapItem ?? defaultMapItem

  const { items, setItems, reset, getChangedItems, sync } = useReorder(data, mapper)

  const handleSave = async () => {
    const changedItems = getChangedItems()

    if (changedItems.length === 0) return

    await mutation.mutateAsync(changedItems)

    sync(changedItems)
  }

  return (
    <ReorderList
      idColumn={idColumn}
      items={items}
      onChange={setItems}
      onSave={handleSave}
      onReset={reset}
      showReset={showReset}
      maxWidth={maxWidth}
      saveText={saveText}
      resetText={resetText}
      isGrid={isGrid}
    />
  )
}

export default ReorderManager
