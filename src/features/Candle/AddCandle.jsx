import { Box, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import FormCandle from "./components/FormCandle.jsx"
import { useCandleAdd } from "./service/mutation"

export default function AddHat() {
  const navigate = useNavigate()
  const mutation = useCandleAdd()
  const handleSubmit = async (formData) => {
    try {
      await mutation.mutateAsync(formData)
      navigate("/candle/list")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Box sx={{ px: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography
          variant="h6"
          sx={{ my: "20px" }}
        >
          Thêm Nến
        </Typography>
        <Box>
          <Button
            size="small"
            variant="contained"
            onClick={() => navigate("/candle/list")}
          >
            Quay lại
          </Button>
        </Box>
      </Box>
      <FormCandle onSubmit={handleSubmit} />
    </Box>
  )
}
