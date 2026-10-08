import * as React from "react"
import { Drawer, Box, IconButton, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

export default function CustomDrawer({
  title = "",
  anchor = "right",
  width = 420,
  open,
  onClose,
  closeOnBackdropClick = true,
  children,
}) {
  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={(event, reason) => {
        if (!closeOnBackdropClick && reason === "backdropClick") return
        onClose?.()
      }}
      sx={{ zIndex: 1300 }}
      ModalProps={{ keepMounted: true }}
    >
      <Box
        sx={{
          width,
          p: 2.5,
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 600 }}
            color="#333"
          >
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Nội dung chính */}
        <Box sx={{ flex: 1, overflowY: "auto" }}>{children}</Box>
      </Box>
    </Drawer>
  )
}
