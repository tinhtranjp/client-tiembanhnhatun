import { useEffect, useState } from "react"
import { DndContext, PointerSensor, KeyboardSensor, closestCenter, useSensor, useSensors } from "@dnd-kit/core"
import { restrictToVerticalAxis, restrictToFirstScrollableAncestor } from "@dnd-kit/modifiers"
import { useThemeReorder } from "./service/mutation"

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Box, Button, Paper, Stack, Typography } from "@mui/material"
import DragIndicatorIcon from "@mui/icons-material/DragIndicator"

import { useThemeGetAll } from "./service/queries"

function SortableTheme({ theme }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: theme.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      {...attributes}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        minWidth: 0,
        minHeight: 56,
        px: 1.5,
        gap: 1,
        boxSizing: "border-box",
      }}
    >
      <Typography
        sx={{
          flex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {theme.name}
      </Typography>
      <Box
        {...listeners}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 40,
          minWidth: 40,
          height: 40,
          cursor: "grab",
          touchAction: "none",
          color: "text.secondary",
        }}
      >
        <DragIndicatorIcon />
      </Box>
    </Paper>
  )
}

function ReoderTheme() {
  const [themes, setThemes] = useState([])

  const { data } = useThemeGetAll()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),

    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  useEffect(() => {
    if (!data?.data) return

    setThemes(data.data)
  }, [data])

  const handleDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return

    setThemes((currentThemes) => {
      const oldIndex = currentThemes.findIndex((theme) => theme.id === active.id)

      const newIndex = currentThemes.findIndex((theme) => theme.id === over.id)

      if (oldIndex === -1 || newIndex === -1) {
        return currentThemes
      }

      return arrayMove(currentThemes, oldIndex, newIndex)
    })
  }

  const mutation = useThemeReorder()
  const handleSave = async () => {
    const data = themes.map((theme, index) => ({
      id: Number(theme.id),
      displayOrder: index,
    }))

    try {
      await mutation.mutateAsync(data)

      console.log("Sắp xếp thể loại thành công.")
    } catch (error) {
      console.error("Sắp xếp thể loại thất bại:", error)
    }
  }
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 600,
        mx: "auto",
        px: {
          xs: 1,
          sm: 2,
        },
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mt: 2,
          mb: 2,
          fontSize: {
            xs: "1.1rem",
            sm: "1.25rem",
          },
        }}
      >
        Sắp xếp chủ đề
      </Typography>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToFirstScrollableAncestor]}
      >
        <SortableContext
          items={themes.map((theme) => theme.id)}
          strategy={verticalListSortingStrategy}
        >
          <Stack spacing={1}>
            {themes.map((theme) => (
              <SortableTheme
                key={theme.id}
                theme={theme}
              />
            ))}
          </Stack>
        </SortableContext>
      </DndContext>

      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: {
            xs: "stretch",
            sm: "flex-end",
          },
        }}
      >
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!themes.length}
          fullWidth
          sx={{
            maxWidth: {
              sm: 180,
            },
          }}
        >
          Sắp xếp
        </Button>
      </Box>
    </Box>
  )
}

export default ReoderTheme
