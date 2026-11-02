import { useState } from "react"
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import { useNavigateForm } from "@/hook/useNavigateFrom"
import { useCollectionAddProduct } from "@/features/Collection/service/mutation"
import { toast } from "sonner"

export default function ActionMenu({ product, collections }) {
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

  const mutationAddCollections = useCollectionAddProduct()
  const handleAddCollection = async (collectionId, slug) => {
    let quantity = 0
    handleClose()
    if (slug == "ready-cakes") {
      const value = window.prompt("Nhập số lượng sản phẩm:")

      if (value === null) return

      quantity = Number(value)

      if (!Number.isInteger(quantity) || quantity < 0) {
        toast.error("Số lượng phải là số nguyên không âm.")
        return
      }
    }
    try {
      await mutationAddCollections.mutateAsync({
        id: collectionId,
        data: {
          quantity,
          productId: Number(product.id),
        },
      })
    } catch (error) {
      console.log(error)
    }
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
        {collections &&
          collections.map((c) => (
            <MenuItem
              key={c.id}
              onClick={() => handleAddCollection(c.id, c.slug)}
            >
              <ListItemIcon>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>{c.name}</ListItemText>
            </MenuItem>
          ))}
      </Menu>
    </>
  )
}
