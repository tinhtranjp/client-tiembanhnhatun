import { useLocation, useNavigate, useParams } from "react-router-dom"

import UpdateFormMemo from "./components/UpdateFormMemo"
import { useMemoGetDetails } from "./service/queries"
import { useMemoUpdate } from "./service/mutation"

import { Box, Button, Stack, Typography } from "@mui/material"
function UpdateMemo() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const { data, isLoading } = useMemoGetDetails(id)

  const mutation = useMemoUpdate()

  const handleSubmit = async (formData) => {
    try {
      await mutation.mutateAsync({
        id,
        data: formData,
      })
      onBackPage()
    } catch (error) {
      console.error(error)
    }
  }
  const onBackPage = () => {
    navigate(location.state?.from ?? "/memo/list")
  }

  if (isLoading) {
    return <div>Đang tải...</div>
  }

  return (
    <Stack
      spacing={4}
      mt={2}
      p={2}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5">Chỉnh sửa ghi chú</Typography>
        <Button
          variant="contained"
          size="small"
          onClick={onBackPage}
        >
          Quay lại
        </Button>
      </Box>
      <UpdateFormMemo
        memo={data?.data?.data}
        onSubmit={handleSubmit}
      />
    </Stack>
  )
}

export default UpdateMemo
