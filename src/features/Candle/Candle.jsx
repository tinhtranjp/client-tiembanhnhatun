import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
  IconButton,
  Stack,
} from "@mui/material"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import Pagination from "@mui/material/Pagination"
import SearchIcon from "@mui/icons-material/Search"
import { useEffect, useMemo, useState } from "react"
import debounce from "lodash/debounce"
import { useNavigate } from "react-router-dom"
import { useCandleGetAll } from "./service/queries"
import { useCandleToggleStatus } from "./service/mutation"

export default function Candle() {
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [sort, setSort] = useState("")
  const [page, setPage] = useState(1)

  const navigate = useNavigate()

  const { data, isLoading } = useCandleGetAll({
    query: debouncedQuery,
    page,
    limit: 10,
    sort: sort || undefined,
  })

  const candles = data?.data?.candles ?? []
  const totalPages = data?.data?.totalPages ?? 0
  const toggleStatus = useCandleToggleStatus()

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

  const handleSort = (event) => {
    setSort(event.target.value)
    setPage(1)
  }

  const handleToggleStatus = (id) => {
    toggleStatus.mutate(id)
  }

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        px: 2,
        py: 2,
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 2 }}>
        <Box
          justifyContent="space-between"
          display="flex"
          alignItems="center"
        >
          <Typography
            variant="h5"
            fontWeight={700}
          >
            Danh sách nến
          </Typography>

          <Button
            variant="contained"
            size="small"
            onClick={() => navigate("/candle/add")}
          >
            Thêm mới
          </Button>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          Quản lý các mẫu nến của tiệm
        </Typography>
      </Box>

      {/* Search */}
      <TextField
        fullWidth
        size="small"
        placeholder="Tìm kiếm tên nến..."
        value={query}
        onChange={handleSearch}
        slotProps={{
          input: {
            startAdornment: (
              <SearchIcon
                sx={{
                  mr: 1,
                  color: "text.secondary",
                }}
              />
            ),
          },
        }}
        sx={{
          mb: 1.5,
        }}
      />

      {/* Sort */}
      <FormControl
        fullWidth
        size="small"
        sx={{ mb: 2 }}
      >
        <InputLabel>Sắp xếp theo giá</InputLabel>

        <Select
          value={sort}
          label="Sắp xếp theo giá"
          onChange={handleSort}
          renderValue={(value) => {
            if (value === "") return "Mặc định"
            if (value === "price_asc") return "Giá thấp → cao"
            return "Giá cao → thấp"
          }}
        >
          <MenuItem value="">Mặc định</MenuItem>
          <MenuItem value="price_asc">Giá thấp → cao</MenuItem>
          <MenuItem value="price_desc">Giá cao → thấp</MenuItem>
        </Select>
      </FormControl>

      {/* Loading */}
      {isLoading ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 1.5,
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <Card
              key={index}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <Skeleton
                variant="rectangular"
                sx={{
                  aspectRatio: "1 / 1",
                }}
              />

              <CardContent sx={{ p: 1.5 }}>
                <Skeleton width="80%" />
                <Skeleton width="55%" />
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <>
          {/* Candle grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 1.5,
            }}
          >
            {candles.map((candle) => (
              <Card
                key={candle.id}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  transition: "transform 0.2s",
                  "&:active": {
                    transform: "scale(0.98)",
                  },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    image={candle.thumbnail}
                    alt={candle.name}
                    sx={{
                      aspectRatio: "1 / 1",
                      objectFit: "cover",
                    }}
                  />

                  <Chip
                    onClick={() => handleToggleStatus(candle.id)}
                    size="small"
                    label={candle.status === "AVAILABLE" ? "Đang bán" : "Tạm ngưng"}
                    color={candle.status === "AVAILABLE" ? "success" : "error"}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  />
                </Box>

                <CardContent
                  sx={{
                    p: 1.5,
                    "&:last-child": {
                      pb: 1.5,
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    noWrap
                  >
                    {candle.name}
                  </Typography>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ mt: 0.5 }}
                    >
                      {Number(candle.price).toLocaleString("vi-VN")}đ
                    </Typography>

                    <IconButton
                      onClick={() => navigate(`/candle/${candle.id}/edit`)}
                      size="small"
                      sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 2,
                      }}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Empty */}
          {candles.length === 0 && (
            <Box
              sx={{
                py: 8,
                textAlign: "center",
              }}
            >
              <Typography color="text.secondary">Không tìm thấy mẫu nến nào.</Typography>
            </Box>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mt: 3,
                pb: 2,
              }}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                size="small"
                color="primary"
                siblingCount={0}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  )
}
