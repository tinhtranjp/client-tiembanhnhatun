import { useState } from "react"
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material"

import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import { useNavigateForm } from "@/hook/useNavigateFrom"

export default function ActionMenu({ product }) {
  const [anchorEl, setAnchorEl] = useState(null)

  const open = Boolean(anchorEl)
  const navigate = useNavigateForm()

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleCreateOrder = () => {
    handleClose()
  }

  const handleGoDetail = () => {
    handleClose()
    navigate(`/product/${product.id}/detail`)
  }

  return (
    <>
      <IconButton
        size="small"
        onClick={handleOpen}
      >
        <MoreHorizIcon fontSize="small" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleCreateOrder}>
          <ListItemIcon>
            <EditCalendarOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Tạo đơn hàng</ListItemText>
        </MenuItem>

        <MenuItem onClick={handleGoDetail}>
          <ListItemIcon>
            <VisibilityOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
