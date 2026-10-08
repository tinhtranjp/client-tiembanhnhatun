import { SortableContext, rectSortingStrategy, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Box } from "@mui/material"

import Item from "./Item"
import PreviewImage from "@/components/dnd/img/PreviewImage"
function Column({ imgs, isGrid, onClick, onRemoveFile, isError }) {
  const type = isGrid ? rectSortingStrategy : verticalListSortingStrategy
  return (
    <SortableContext
      items={imgs?.map((t) => t.id) || []}
      strategy={type}
    >
      <Box
        sx={{
          display: isGrid ? "flex" : "grid",
          flexWrap: isGrid ? "wrap" : undefined, // chỉ dùng khi là flex
          gridTemplateColumns: isGrid ? undefined : "repeat(1, 1fr)",
          gap: 2,
        }}
      >
        {imgs?.map((img) => (
          <Item
            key={img.id}
            id={img.id}
            url={img.url}
            onRemoveFile={onRemoveFile}
          />
        ))}

        <Box
          sx={{ display: "flex-col", justifyContent: "center", alignItems: "center" }}
          onClick={onClick}
        >
          <PreviewImage
            isNone
            isError={isError}
          />
        </Box>
      </Box>
    </SortableContext>
  )
}

export default Column
