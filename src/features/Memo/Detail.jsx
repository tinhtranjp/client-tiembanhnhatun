import { useParams } from "react-router-dom"
import { useMemoGetDetails } from "./service/queries"
import { useNavigate, useLocation } from "react-router-dom"
import { Box, IconButton, Button, Stack, Typography } from "@mui/material"

import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { useMemoDelete } from "./service/mutation"
import HtmlRender from "@/components/common/HtmlRender"

export default function Detail() {
  const { id } = useParams()
  const { data } = useMemoGetDetails(id)
  const memo = data?.data?.data
  const deleteMutation = useMemoDelete()
  const navigate = useNavigate()
  const location = useLocation()
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Bạn có chắc muốn xóa memo này không?")

    if (!confirmed) return

    try {
      await deleteMutation.mutateAsync(id)
      navigate("/memo/list")
    } catch (error) {
      console.error(error)
    }
  }
  if (!memo) return
  return (
    <Box px={2}>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate("/memo/list")}
          sx={{ my: "20px" }}
        >
          Quay lại
        </Button>
      </Box>
      <Stack>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Typography
            variant="h5"
            color="#333"
          >
            ID: #{memo.id}
          </Typography>

          <Stack direction="row">
            <IconButton
              size="small"
              onClick={() =>
                navigate(`/memo/${memo.id}/edit`, {
                  state: {
                    from: location.pathname + location.search,
                  },
                })
              }
            >
              <EditIcon fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              color="error"
              onClick={() => handleDelete(memo.id)}
              disabled={deleteMutation.isPending}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
      <Typography
        variant="h6"
        color="#333"
        mb={4}
      >
        {memo.title}
      </Typography>
      <HtmlRender htmlString={memo.description} />
    </Box>
  )
}
