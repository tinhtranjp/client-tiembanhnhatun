import { useMemo } from "react"
import { Box, Button, CircularProgress, Stack, Typography } from "@mui/material"
import FormOrder from "./components/FormOrder"
import { useOrdersAdd } from "./service/mutation"
import useOnBackPage from "@/hook/useOnBackPage"
import { useSearchParams } from "react-router-dom"
import { useGetProductDetail } from "../Product/service/queries"
import { defaultValues, mapProductToOrderItem } from "./service/helper"

export default function AddOrder() {
  const mutation = useOrdersAdd()
  const onBackPage = useOnBackPage("/order/list")

  const [searchParams] = useSearchParams()
  const productId = searchParams.get("productId")

  const { data, isLoading } = useGetProductDetail(productId)

  const handleSubmit = async (formData) => {
    await mutation.mutateAsync(formData)
  }

  // Chỉ có initialData khi thật sự có sản phẩm, và giữ nguyên reference giữa các lần render
  const initialData = useMemo(() => {
    if (!data?.data) return undefined
    return {
      ...defaultValues,
      orderItems: [mapProductToOrderItem(data.data)],
    }
  }, [data?.data])

  // Chờ load xong rồi mới render form, tránh user gõ xong bị reset
  if (productId && isLoading) {
    return (
      <Box
        p={2}
        display="flex"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box p={2}>
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <Typography
          variant="h6"
          mb={2}
        >
          Thêm đơn hàng
        </Typography>
        <Box>
          <Button
            variant="contained"
            size="small"
            onClick={onBackPage}
          >
            Quay lại
          </Button>
        </Box>
      </Stack>

      <FormOrder
        onSubmit={handleSubmit}
        initialData={initialData}
      />
    </Box>
  )
}
