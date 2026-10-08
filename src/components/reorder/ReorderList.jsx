import { Box, Button } from "@mui/material"
import DndTasks from "@/components/dnd/task/DndTasks"

function ReorderList({ items, onChange, onSave, onReset, showReset, maxWidth, idColumn, saveText, resetText, isGrid }) {
  return (
    <>
      <Box sx={{ maxWidth }}>
        <DndTasks
          idColumn={idColumn}
          tasks={items}
          onChangeTasks={onChange}
          isGrid={isGrid}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
        {showReset && (
          <Button
            variant="outlined"
            onClick={onReset}
          >
            {resetText}
          </Button>
        )}

        <Button
          variant="contained"
          onClick={onSave}
        >
          {saveText}
        </Button>
      </Box>
    </>
  )
}

export default ReorderList
