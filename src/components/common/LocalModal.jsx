import CloseIcon from "@mui/icons-material/Close"
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material"

function LocalModal({ open, onClose, title, children, maxWidth = "sm", fullWidth = true, showCloseButton = true }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      {title && (
        <DialogTitle sx={{ m: 0, p: 2 }}>
          {title}

          {showCloseButton && (
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}

      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  )
}

export default LocalModal
