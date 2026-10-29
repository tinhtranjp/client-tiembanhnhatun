import { Box, Button, Stack, Typography } from "@mui/material"
import FormOrder from "./components/FormOrder"
import { useOrdersAdd } from "./service/mutation"
import useOnBackPage from "@/hook/useOnBackPage"

export default function AddOrder() {
  const mutation = useOrdersAdd()
  const onBackPage = useOnBackPage("/order/list")

  const handleSubmit = async (data) => {
    await mutation.mutateAsync(data)
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

      <FormOrder onSubmit={handleSubmit} />
    </Box>
  )
}
