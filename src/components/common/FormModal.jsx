import React from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material"
import { useFormModalStore } from "@/store/FormModalStore"

export default function FormModal({ maxWidth = "lg" }) {
  const { formModal, closeFormModal } = useFormModalStore()

  return (
    <Dialog
      open={formModal.open}
      onClose={closeFormModal}
      fullWidth
      maxWidth={maxWidth}
    >
      {formModal.title && <DialogTitle sx={{ whiteSpace: "pre-line" }}>{formModal.title}</DialogTitle>}

      <DialogContent dividers>{formModal.content}</DialogContent>

      {formModal.actions && (
        <DialogActions>
          {formModal.actions.map((action, idx) => (
            <Button
              key={idx}
              onClick={() => {
                action.onClick?.()
                if (action.closeOnClick !== false) closeFormModal()
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
