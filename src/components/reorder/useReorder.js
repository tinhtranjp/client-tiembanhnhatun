import { useEffect, useRef, useState } from "react"

export default function useReorder(data, mapItem) {
  const [items, setItems] = useState([])

  const originalOrderMap = useRef(new Map())

  useEffect(() => {
    if (!data) return

    const list = data.map((item, index) => ({
      ...mapItem(item),
      orderBy: item.orderBy ?? index + 1,
    }))

    setItems(list)

    originalOrderMap.current = new Map(list.map((item) => [item.id, item.orderBy]))
  }, [data, mapItem])

  const reset = () => {
    setItems((prev) =>
      [...prev].sort((a, b) => originalOrderMap.current.get(a.id) - originalOrderMap.current.get(b.id)),
    )
  }

  const getChangedItems = () => {
    return items
      .map((item, index) => ({
        id: item.id,
        orderBy: index,
      }))
      .filter((item) => originalOrderMap.current.get(item.id) !== item.orderBy)
  }

  const sync = (changedItems) => {
    changedItems.forEach((item) => {
      originalOrderMap.current.set(item.id, item.orderBy)
    })
  }

  return {
    items,
    setItems,
    reset,
    getChangedItems,
    sync,
  }
}
