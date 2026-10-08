import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from "@mui/material"
import { useFormModalStore } from "@/store/FormModalStore"
import CloseIcon from "@mui/icons-material/Close"
export default function GlobalModal() {
  const { closeFormModal, formModal, resetFormModal } = useFormModalStore()

  return (
    <Dialog
      open={formModal.open}
      onClose={closeFormModal}
      maxWidth={formModal.maxWidth}
      fullWidth={formModal.fullWidth}
      slotProps={{
        transition: {
          timeout: 250,
          onExited: resetFormModal,
        },
      }}
    >
      {formModal.title && <DialogTitle sx={{ m: 0, p: 2 }}>{formModal.title}</DialogTitle>}

      {formModal.showCloseButton && (
        <IconButton
          aria-label="close"
          onClick={closeFormModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>
      )}

      <DialogContent dividers>{formModal.content}</DialogContent>

      {formModal.actions && (
        <DialogActions>
          {formModal.actions.map((action, idx) => (
            <Button
              key={idx}
              onClick={() => {
                action.onClick?.()

                if (action.closeOnClick !== false) {
                  closeFormModal()
                }
              }}
              color={action.color || "primary"}
            >
              {action.label}
            </Button>
          ))}
        </DialogActions>
      )}
    </Dialog>
  )
}
