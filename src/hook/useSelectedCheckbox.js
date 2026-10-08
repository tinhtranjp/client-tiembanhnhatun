import { useState } from "react"

function useSelectedCheckbox() {
  const [selected, setSelected] = useState([])
  const handleSelectAllClick = (event, rows) => {
    console.log("handleSelectAllClick", event.target.checked, rows)
    if (event.target.checked) {
      setSelected(rows.map((n) => n.id))
    } else {
      setSelected([])
    }
  }

  const handleClick = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]))
  }

  return {
    selected,
    setSelected,
    handleClick,
    handleSelectAllClick,
  }
}

export default useSelectedCheckbox
