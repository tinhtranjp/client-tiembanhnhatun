import CloseIcon from "@mui/icons-material/Close"
import { Box, styled } from "@mui/material"
import { IconButton } from "../../../features/Category/components/IconButton"
import AddIcon from "@mui/icons-material/Add"

const Preview = styled("img")({
  width: 100,
  height: 100,
  objectFit: "cover",
  borderRadius: 4,
  border: "1px solid #ddd",
  display: "block",
})

function PreviewImage({ id, url, onRemoveFile, isNone = false, dragHandleProps, isDragging, isError }) {
  if (isNone) {
    return (
      <Box
        border={1}
        sx={{ border: "1px #000 dashed", "&:hover": { cursor: "pointer" } }}
        borderColor={isError ? "red" : "grey.300"}
        borderRadius={1}
        p={1}
      >
        <Box
          sx={{
            width: 100,
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AddIcon sx={{ color: isError ? "red" : "#666" }} />
        </Box>
      </Box>
    )
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={0.5}
      border={1}
      borderColor="grey.300"
      borderRadius={1}
      p={1}
      sx={{
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {/* ✅ CHỈ ảnh mới có drag listeners */}
      <Box
        {...dragHandleProps}
        sx={{ cursor: "grab", "&:active": { cursor: "grabbing" } }}
      >
        <Preview
          src={url}
          alt={url}
        />
      </Box>

      {/* ✅ Nút Close KHÔNG có drag listeners */}
      <IconButton
        size="small"
        onClick={() => {
          onRemoveFile?.(id)
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  )
}

export default PreviewImage
