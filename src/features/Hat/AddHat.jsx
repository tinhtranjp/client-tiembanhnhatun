import { Box, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import FormHat from "./components/FormHat"
import { useHatAdd } from "./service/mutation"
export default function AddHat() {
  const navigate = useNavigate()
  const mutation = useHatAdd()
  const handleSubmit = async (formData) => {
    try {
      await mutation.mutateAsync(formData)
      navigate("/hat/list")
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
          Thêm Mũ
        </Typography>
        <Box>
          <Button
            size="small"
            variant="contained"
            onClick={() => navigate("/hat/list")}
          >
            Quay lại
          </Button>
        </Box>
      </Box>
      <FormHat onSubmit={handleSubmit} />
    </Box>
  )
}
