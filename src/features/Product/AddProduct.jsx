import { Box, Typography, Button } from "@mui/material"
import FormProduct from "./components/FormProduct"
import { useProductAdd } from "./service/mutation"
import { productApi } from "./service/productApi"
import { useNavigate } from "react-router-dom"

function AddProduct() {
  const mutation = useProductAdd()
  const navigate = useNavigate()
  const handleSubmit = async ({ files, ...data }) => {
    try {
      const result = await mutation.mutateAsync(data)
      const productId = result.data.data.id
      if (files.length > 0) {
        await productApi.uploadImages(productId, files)
      }
      backToProductList()
    } catch (error) {
      console.log(error)
    }
  }
  const backToProductList = () => {
    navigate("/product/list")
  }
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          sx={{ my: 2 }}
        >
          Thêm sản phẩm
        </Typography>
        <Box>
          <Button
            onClick={backToProductList}
            variant="contained"
          >
            Quay lại
          </Button>
        </Box>
      </Box>
      <FormProduct onSubmit={handleSubmit} />
    </Box>
  )
}
export default AddProduct
