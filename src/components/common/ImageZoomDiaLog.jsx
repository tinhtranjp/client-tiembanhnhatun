import { Dialog, IconButton, Box } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import RestartAltIcon from "@mui/icons-material/RestartAlt"

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { useImageViewerStore } from "@/store/ImageViewStore"

export default function ImageZoomDialog() {
  const { open, imageUrl, closeImage } = useImageViewerStore()

  return (
    <Dialog
      open={open}
      onClose={closeImage}
      fullScreen
      slotProps={{
        paper: {
          sx: {
            bgcolor: "#000",
            color: "#fff",
          },
        },
      }}
    >
      <IconButton
        onClick={closeImage}
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 2,
          color: "#fff",
        }}
      >
        <CloseIcon />
      </IconButton>

      {imageUrl && (
        <Box
          sx={{
            width: "100%",
            height: "100dvh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TransformWrapper
            key={imageUrl}
            initialScale={1}
            minScale={1}
            maxScale={5}
            centerOnInit
            doubleClick={{
              mode: "toggle",
              step: 2,
            }}
          >
            {({ resetTransform }) => (
              <>
                <IconButton
                  onClick={() => resetTransform()}
                  sx={{
                    position: "absolute",
                    bottom: 24,
                    right: 16,
                    zIndex: 2,
                    color: "#fff",
                  }}
                >
                  <RestartAltIcon />
                </IconButton>

                <TransformComponent
                  wrapperStyle={{
                    width: "100vw",
                    height: "100dvh",
                  }}
                  contentStyle={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={imageUrl}
                    alt="Ảnh phóng to"
                    draggable={false}
                    style={{
                      maxWidth: "100vw",
                      maxHeight: "100dvh",
                      objectFit: "contain",
                      userSelect: "none",
                    }}
                  />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </Box>
      )}
    </Dialog>
  )
}
