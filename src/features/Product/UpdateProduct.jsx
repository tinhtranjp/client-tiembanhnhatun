import { Box, Typography, Button } from "@mui/material"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { useGetProductDetail } from "./service/queries"
import UpdateFormProduct from "./components/UpdateFormProduct"
import { useProductUpdate } from "./service/mutation"

export default function UpdateProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { data } = useGetProductDetail(id)

  const updateProduct = useProductUpdate()

  const handleSubmit = async (formData) => {
    await updateProduct.mutateAsync({
      id,
      data: formData,
    })
    handleOnBackPage()
  }

  const handleOnBackPage = () => {
    navigate(location.state?.from ?? "/product/list")
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography
          variant="h5"
          sx={{ my: 2 }}
        >
          Chỉnh sửa sản phẩm
        </Typography>

        <Box>
          <Button
            size="small"
            variant="contained"
            onClick={handleOnBackPage}
          >
            Quay lại
          </Button>
        </Box>
      </Box>
      <UpdateFormProduct
        onSubmit={handleSubmit}
        productDetail={data?.data}
      />
    </Box>
  )
}
