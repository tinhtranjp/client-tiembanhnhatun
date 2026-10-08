import { Button, Typography } from "@mui/material"
import { useCategoryGetAll } from "./service/queries"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import { FaEdit } from "react-icons/fa"
import IconButton from "@mui/material/IconButton"
import { useFormModalStore } from "@/store/FormModalStore"
import UpdateFormCategory from "./components/UpdateFormCategory"
import { useCategoryUpdate, useCategoryAdd } from "./service/mutation"
import AddIcon from "@mui/icons-material/Add"
import FormCategory from "./components/FormCategory"
function Category() {
  const { data } = useCategoryGetAll()
  const { closeFormModal, openFormModal } = useFormModalStore()

  const handleCreateCategory = () => {
    openFormModal({
      title: "Thêm thể loại",
      content: <FormCategory onSubmit={onCreateSubmit} />,
    })
  }

  const createMutation = useCategoryAdd()
  const onCreateSubmit = async (data) => {
    try {
      await createMutation.mutateAsync(data)
      closeFormModal()
    } catch (error) {
      console.error(error)
    }
  }

  const handleEditCategory = (category) => {
    openFormModal({
      title: "Cập nhật thể loại",
      content: (
        <UpdateFormCategory
          category={category}
          onSubmit={onUpdateSubmit}
        />
      ),
    })
  }

  const updateMutation = useCategoryUpdate()
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
      <Box className="flex items-center justify-between p-4">
        <Typography variant="h5">Danh sách thể loại</Typography>
        <Button
          onClick={handleCreateCategory}
          sx={{ pr: 2 }}
          startIcon={<AddIcon />}
          variant="contained"
          size="small"
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
            {data?.data.map((cate) => (
              <Box key={cate.id}>
                <Paper className="flex items-center justify-between p-3">
                  <Typography>{cate.name}</Typography>
                  <IconButton
                    aria-label="Example"
                    onClick={() => handleEditCategory(cate)}
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

export default Category
