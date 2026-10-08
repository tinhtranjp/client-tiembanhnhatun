import { useState } from "react"
import { Link } from "react-router-dom"

import { AppBar, Toolbar, IconButton, Drawer, Box, List, ListItemButton, ListItemText, Collapse } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import { useLocation } from "react-router-dom"

const menuItems = [
  { title: "Dashboard", type: "link", url: "/" },
  {
    title: "Thể loại",
    type: "parent",
    children: [
      { title: "List", type: "link", url: "/category/list" },
      { title: "Sắp xếp", type: "link", url: "/category/reorder" },
    ],
  },
  {
    title: "Chủ đề",
    type: "parent",
    children: [
      { title: "List", type: "link", url: "/theme/list" },
      { title: "Sắp xếp", type: "link", url: "/theme/reorder" },
    ],
  },
  {
    title: "Sản phẩm",
    type: "parent",
    children: [
      { title: "List", type: "link", url: "/product/list" },
      { title: "Add", type: "link", url: "/product/add" },
    ],
  },
  {
    title: "Mũ",
    type: "parent",
    children: [
      { title: "List", type: "link", url: "/hat/list" },
      { title: "Add", type: "link", url: "/hat/add" },
    ],
  },
  {
    title: "Nến",
    type: "parent",
    children: [
      { title: "List", type: "link", url: "/candle/list" },
      { title: "Add", type: "link", url: "/candle/add" },
    ],
  },
  {
    title: "Ghi chú",
    type: "parent",
    children: [
      { title: "List", type: "link", url: "/memo/list" },
      { title: "Add", type: "link", url: "/memo/add" },
    ],
  },
]

function DashboardLayout({ children }) {
  const [openDrawer, setOpenDrawer] = useState(false)

  // 2. State quản lý việc đóng/mở của các menu cha
  // Mặc định ban đầu 'Networks' đang mở (true)
  const [openSubMenus, setOpenSubMenus] = useState({
    Networks: true,
    Storage: false,
  })

  const toggleDrawer = (value) => () => {
    setOpenDrawer(value)
  }

  // Hàm xử lý khi bấm vào menu cha
  const handleToggleSubMenu = (title) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [title]: !prev[title], // Đảo ngược trạng thái true/false
    }))
  }
  const location = useLocation()
  const currentPath = location.pathname
  const isActive = (path) => currentPath === path
  console.log(currentPath)

  return (
    <Box>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={toggleDrawer(false)}
      >
        <Box sx={{ width: 280 }}>
          <List>
            {menuItems.map((item) => {
              // Nếu là menu bình thường (không có con)
              if (item.type === "link") {
                return (
                  <ListItemButton
                    key={item.title}
                    component={Link}
                    to={item.url}
                    selected={isActive(item.url)}
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                )
              }

              // Nếu là menu cha (có con)
              return (
                <Box key={item.title}>
                  <ListItemButton onClick={() => handleToggleSubMenu(item.title)}>
                    {/* Icon của menu cha (nếu có) */}
                    {item.icon && <Box sx={{ mr: 1.5, display: "flex" }}>{item.icon}</Box>}
                    <ListItemText primary={item.title} />

                    {/* Mũi tên chỉ lên/xuống tùy theo trạng thái */}
                    {openSubMenus[item.title] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>

                  {/* Component Collapse để tạo hiệu ứng trượt */}
                  <Collapse
                    in={openSubMenus[item.title]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List
                      component="div"
                      disablePadding
                    >
                      {item.children.map((subItem) => (
                        <ListItemButton
                          key={subItem.title}
                          sx={{ pl: 4 }} // Thụt lề sang phải (padding-left)
                          component={Link}
                          to={subItem.url}
                          onClick={toggleDrawer(false)}
                          selected={isActive(subItem.url)}
                        >
                          {/* Dấu chấm tròn nhỏ giống trong hình */}
                          <Box
                            sx={{
                              width: 4,
                              height: 4,
                              borderRadius: "50%",
                              bgcolor: "text.secondary",
                              mr: 2,
                            }}
                          />
                          <ListItemText primary={subItem.title} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              )
            })}
          </List>
        </Box>
      </Drawer>

      <Box component="main">{children}</Box>
    </Box>
  )
}

export default DashboardLayout
