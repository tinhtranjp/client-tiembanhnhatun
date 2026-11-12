import { useGetOrderDetail } from "./service/queries"

import { Box, Typography, Button } from "@mui/material"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import FormOrder from "./components/FormOrder"
import { useOrdersUpdate } from "./service/mutation"

import { useMemo } from "react"
import { mapOrderToForm } from "./service/helper"

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
  const initialData = useMemo(() => (data?.data ? mapOrderToForm(data.data) : undefined), [data])
  if (!initialData) return null

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
        initialData={initialData}
        mode="update"
        onSubmit={handleSubmit}
      />
    </Box>
  )
}
