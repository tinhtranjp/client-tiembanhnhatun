import { Box, Button, Stack, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import { useGetProductDetail } from "./service/queries"
import ProductDetail from "./components/ProductDetail"
import { useNavigateForm } from "@/hook/useNavigateFrom"
import useOnBackPage from "@/hook/useOnBackPage"

export default function ProductDetailPage() {
  const { id } = useParams()
  const { data } = useGetProductDetail(id)
  const navigateFrom = useNavigateForm()
  const onBackPage = useOnBackPage("/product/list")

  if (!data) return

  return (
    <Box p={2}>
      <Stack
        justifyContent={"space-between"}
        direction={"row"}
      >
        <Typography
          variant="h5"
          mb={1}
          color="#333"
        >
          Chi tiết sản phẩm #{id}
        </Typography>
        <Box>
          <Button
            size="small"
            variant="contained"
            onClick={onBackPage}
          >
            Quay lại
          </Button>
        </Box>
      </Stack>
      <ProductDetail
        product={data.data}
        onUpdateVideo={() => navigateFrom(`/product/${id}/upload-video`)}
      />
    </Box>
  )
}
