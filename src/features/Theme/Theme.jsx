import { Button, Typography } from "@mui/material"
import { useThemeGetAll } from "./service/queries"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import { FaEdit } from "react-icons/fa"
import IconButton from "@mui/material/IconButton"
import { useFormModalStore } from "@/store/FormModalStore"
import UpdateFormTheme from "./components/UpdateFormTheme"
import { useThemeUpdate, useThemeAdd } from "./service/mutation"
import AddIcon from "@mui/icons-material/Add"
import FormTheme from "./components/FormTheme"

function Theme() {
  const { data } = useThemeGetAll()
  const { closeFormModal, openFormModal } = useFormModalStore()

  const handleCreateTheme = () => {
    openFormModal({
      title: "Thêm chủ đề",
      content: <FormTheme onSubmit={onCreateSubmit} />,
    })
  }

  const createMutation = useThemeAdd()
  const onCreateSubmit = async (data) => {
    try {
      await createMutation.mutateAsync(data)
      closeFormModal()
    } catch (error) {
      console.error(error)
    }
  }

  const handleEditTheme = (theme) => {
    openFormModal({
      title: "Cập nhật chủ đề",
      content: (
        <UpdateFormTheme
          theme={theme}
          onSubmit={onUpdateSubmit}
        />
      ),
    })
  }

  const updateMutation = useThemeUpdate()
  const onUpdateSubmit = async (data) => {
    try {
      await updateMutation.mutateAsync({
        id: data.id,
        data,
      })

      closeFormModal()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box className="flex items-center justify-between">
        <Typography
          variant="h5"
          p={2}
        >
          Danh sách chủ đề
        </Typography>
        <Button
          onClick={handleCreateTheme}
          sx={{ pr: 2 }}
          startIcon={<AddIcon />}
        >
          Thêm mới
        </Button>
      </Box>
      <Grid spacing={2}>
        <Grid size={4}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "background.default",
              display: "grid",
              gridTemplateColumns: { md: "1fr 1fr 1fr 1fr 1fr 1fr" },
              gap: 2,
            }}
          >
            {data?.data.map((theme) => (
              <Box key={theme.id}>
                <Paper className="flex items-center justify-between p-3">
                  <Typography>{theme.name}</Typography>
                  <IconButton
                    aria-label="Example"
                    onClick={() => handleEditTheme(theme)}
                  >
                    <FaEdit />
                  </IconButton>
                </Paper>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Theme
