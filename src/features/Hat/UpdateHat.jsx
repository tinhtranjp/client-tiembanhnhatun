import { Box, Typography, Button } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import HatUpdateForm from "./components/UpdateFormHat"
import { useHatGetDetails } from "./service/queries"
import { useHatUpdate } from "./service/mutation"
export default function UpdateHat() {
  const { id } = useParams()
  const { data } = useHatGetDetails(id)

  const navigate = useNavigate()
  const mutation = useHatUpdate()

  const handleSubmit = async (formData) => {
    try {
      await mutation.mutateAsync({
        id,
        data: formData,
      })
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
          Cập nhật mũ
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
      <HatUpdateForm
        onSubmit={handleSubmit}
        hat={data?.data}
      />
    </Box>
  )
}
