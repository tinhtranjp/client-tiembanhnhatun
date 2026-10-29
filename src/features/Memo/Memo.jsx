import { useEffect, useMemo, useState } from "react"
import debounce from "lodash/debounce"
import { useNavigate } from "react-router-dom"

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Pagination,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material"

import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"

import { useMemoGetAll } from "./service/queries"

import { useMemoDelete } from "./service/mutation"

function Memo() {
  const navigate = useNavigate()

  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [page, setPage] = useState(1)

  const { data, isLoading } = useMemoGetAll({
    query: debouncedQuery,
    page,
    limit: 10,
  })

  const deleteMutation = useMemoDelete()

  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setDebouncedQuery(value)
      }, 400),
    [],
  )

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  }, [debouncedSearch])

  const handleSearch = (event) => {
    const value = event.target.value

    setQuery(value)
    setPage(1)

    debouncedSearch(value)
  }

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Bạn có chắc muốn xóa memo này không?")

    if (!confirmed) return

    try {
      await deleteMutation.mutateAsync(id)
    } catch (error) {
      console.error(error)
    }
  }
  const memos = data?.data?.data?.memos ?? []
  const totalPages = data?.data?.totalPages ?? 1

  return (
    <Box sx={{ p: 2 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        spacing={2}
        mb={3}
      >
        <Typography
          variant="h5"
          color="#333"
        >
          Danh sách ghi chú
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate("/memo/add")}
        >
          Thêm ghi chú
        </Button>
      </Stack>

      <TextField
        fullWidth
        value={query}
        onChange={handleSearch}
        placeholder="Tìm kiếm memo..."
        sx={{ mb: 3 }}
      />

      {isLoading ? (
        <Grid
          container
          spacing={2}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <Grid
              size={{ xs: 12, md: 6 }}
              key={index}
            >
              <Card>
                <CardContent>
                  <Skeleton
                    variant="text"
                    width="60%"
                    height={32}
                  />

                  <Skeleton
                    variant="text"
                    width="100%"
                  />

                  <Skeleton
                    variant="text"
                    width="90%"
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : memos.length === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          py={8}
        >
          <Typography color="text.secondary">Không có memo nào.</Typography>
        </Box>
      ) : (
        <>
          <Grid
            container
            spacing={2}
          >
            {memos.map((memo) => (
              <Grid
                size={{ xs: 12, md: 6 }}
                key={memo.id}
                onClick={() => navigate(`/memo/${memo.id}/detail`)}
                sx={{ cursor: "pointer" }}
              >
                <Card sx={{ p: 1 }}>
                  <Stack spacing={1.5}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      <Typography pr={"4px"}>{memo.title}</Typography>

                      <Stack
                        direction="row"
                        alignItems="flex-start"
                      >
                        <IconButton
                          size="small"
                          onClick={(event) => {
                            event.stopPropagation()
                            navigate(`/memo/${memo.id}/edit`)
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>

                        <IconButton
                          size="small"
                          color="error"
                          onClick={(event) => {
                            event.stopPropagation()
                            handleDelete(memo.id)
                          }}
                          disabled={deleteMutation.isPending}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </Stack>

                    {debouncedQuery && memo.similarity != null && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Độ tương đồng: {(Number(memo.similarity) * 100).toFixed(1)}%
                      </Typography>
                    )}
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box
              display="flex"
              justifyContent="center"
              mt={4}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  )
}

export default Memo
