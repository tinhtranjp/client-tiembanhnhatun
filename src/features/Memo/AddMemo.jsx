import { useNavigate } from "react-router-dom"

import { Box, Button, Typography } from "@mui/material"
import FormMemo from "./components/FormMemo"
import { useMemoAdd } from "./service/mutation"

function AddMemo() {
  const navigate = useNavigate()
  const mutation = useMemoAdd()

  const handleSubmit = async (data) => {
    try {
      await mutation.mutateAsync(data)
      goMemoList()
    } catch (error) {
      console.error(error)
    }
  }

  const goMemoList = () => {
    navigate("/memo/list")
  }
  return (
    <Box sx={{ p: 2, mt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h5"
          mb={4}
        >
          Tạo ghi chú
        </Typography>
        <Box>
          <Button
            size="small"
            variant="contained"
            onClick={goMemoList}
          >
            Quay lại
          </Button>
        </Box>
      </Box>
      <FormMemo onSubmit={handleSubmit} />
    </Box>
  )
}

export default AddMemo
