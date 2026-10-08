import { Box, IconButton, Pagination, Stack, TextField, Typography } from "@mui/material"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import AddRoundedIcon from "@mui/icons-material/AddRounded"
import { useEffect, useState } from "react"
import { useGetProductList } from "./service/queries"
import ProductCard from "./components/ProductCard"
import { useNavigate } from "react-router-dom"
const LIMIT = 10
function Product() {
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const navigate = useNavigate()
  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(search)
      setPage(1)
    }, 400)

    return () => clearTimeout(timer)
  }, [search])

  const { data, isLoading } = useGetProductList({
    query,
    page,
    limit: LIMIT,
  })

  const products = data?.data?.data ?? []
  const total = data?.data?.total ?? 0
  const totalPages = Math.ceil(total / LIMIT)

  const handlePageChange = (_, value) => {
    setPage(value)
  }

  return (
    <Box
      sx={{
        minHeight: "100%",
        p: { xs: 1.5, sm: 2, md: 3 },
        bgcolor: "background.default",
      }}
    >
      {/* Header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        sx={{ mb: 2.5 }}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight={800}
            sx={{ letterSpacing: "-0.02em" }}
          >
            Sản phẩm
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Quản lý sản phẩm và nội dung AI tìm kiếm
          </Typography>
        </Box>

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >
          {/* Search */}
          <TextField
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm sản phẩm..."
            slotProps={{
              input: {
                startAdornment: (
                  <SearchRoundedIcon
                    fontSize="small"
                    sx={{
                      mr: 1,
                      color: "text.secondary",
                    }}
                  />
                ),
              },
            }}
            sx={{
              width: { xs: "100%", sm: 240 },
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          {/* Add */}
          <IconButton
            onClick={() => navigate("/product/add")}
            sx={{
              borderRadius: 2,
              bgcolor: "text.primary",
              color: "background.paper",
              "&:hover": {
                bgcolor: "text.primary",
              },
            }}
          >
            <AddRoundedIcon />
          </IconButton>
        </Stack>
      </Stack>

      {/* Products */}
      {isLoading ? (
        <Typography color="text.secondary">Đang tải sản phẩm...</Typography>
      ) : products.length === 0 ? (
        <Box
          sx={{
            py: 8,
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          <Typography variant="body1">Không tìm thấy sản phẩm</Typography>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                lg: "repeat(3, minmax(0, 1fr))",
                xl: "repeat(4, minmax(0, 1fr))",
              },
              gap: 1.5,
            }}
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </Box>

          {/* Pagination */}
          {totalPages > 1 && (
            <Stack
              alignItems="center"
              sx={{ mt: 4 }}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                shape="rounded"
                color="standard"
              />
            </Stack>
          )}
        </>
      )}
    </Box>
  )
}

export default Product
