import { Box, Button, Stack, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import useOnBackPage from "@/hook/useOnBackPage"
import VideoUploader from "@/components/form/fields/VideoUploader"
import { useQueryClient } from "@tanstack/react-query"
import { productKeys } from "./service/queries"
export default function UploadVideo() {
  const { id } = useParams()
  const onBackPage = useOnBackPage(`/product/${id}/detail`)
  const queryClient = useQueryClient()
  return (
    <Box p={2}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
      >
        <Typography
          variant="h6"
          mb={1}
          color="#333"
        >
          Upload video #{id}
        </Typography>
        <Box>
          <Button
            size="small"
            onClick={onBackPage}
            variant="contained"
          >
            Quay lại
          </Button>
        </Box>
      </Stack>
      <VideoUploader
        productId={id}
        onUploaded={(video) => {
          queryClient.invalidateQueries({
            queryKey: productKeys.detail(id),
          })
          onBackPage()
        }}
      />
    </Box>
  )
}
