import { Toolbar, Typography, IconButton, Tooltip } from "@mui/material"
import { alpha } from "@mui/material/styles"
import DeleteIcon from "@mui/icons-material/Delete"
import FilterListIcon from "@mui/icons-material/FilterList"

export default function TableToolbarCustom({
  numSelected,
  onDelete,
  title = "Danh sách công thức",
  isShowAction = true,
}) {
  return (
    <Toolbar
      sx={[
        { pl: { sm: 2 }, pr: { xs: 1, sm: 1 } },
        numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
        >
          Đang chọn : {numSelected}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
        >
          {title}
        </Typography>
      )}

      {isShowAction && numSelected > 0 ? (
        <Tooltip title="Xóa">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Lọc danh sách">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}
