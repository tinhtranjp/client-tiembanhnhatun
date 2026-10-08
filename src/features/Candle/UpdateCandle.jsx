import { Box, Typography, Button } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { useCandleGetDetails } from "./service/queries"
import { useCandleUpdate } from "./service/mutation"
import CandleUpdateForm from "./components/UpdateFormCandle"

export default function UpdateCandle() {
  const { id } = useParams()
  const { data } = useCandleGetDetails(id)

  const navigate = useNavigate()
  const mutation = useCandleUpdate()

  const handleSubmit = async (formData) => {
    try {
      await mutation.mutateAsync({
        id,
        data: formData,
      })
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
          Cập nhật nến
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
      <CandleUpdateForm
        onSubmit={handleSubmit}
        candle={data?.data}
      />
    </Box>
  )
}
