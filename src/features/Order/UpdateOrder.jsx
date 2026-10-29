import { useGetOrderDetail } from "./service/queries"

import { Box, Typography, Button } from "@mui/material"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import FormOrder from "./components/FormOrder"
import { useOrdersUpdate } from "./service/mutation"

export default function UpdateOrder() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const { data } = useGetOrderDetail(id)
  const mutation = useOrdersUpdate()

  const handleSubmit = async (data) => {
    await mutation.mutateAsync({ id, data })
  }
  const handleOnBackPage = () => {
    navigate(location.state?.from ?? "/product/list")
  }
  if (!data) return
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
      <FormOrder
        initialData={data?.data}
        mode="update"
        onSubmit={handleSubmit}
      />
    </Box>
  )
}
