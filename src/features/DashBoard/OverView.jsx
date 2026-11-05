import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material"
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined"

import { useCollectionGetDetails } from "../Collection/service/querries"
import { useNavigateForm } from "@/hook/useNavigateFrom"

const formatPrice = (price) => new Intl.NumberFormat("vi-VN").format(price) + "đ"

function OverView() {
  const navigateForm = useNavigateForm()
  const { data, isLoading, isError } = useCollectionGetDetails("ready-cakes")

  // Hỗ trợ cả trường hợp API trả về Axios response
  // hoặc đã unwrap data trong service
  const collection = data?.data?.data ?? data?.data ?? data
  const products = collection?.products ?? []

  const handleOrder = (product) => {
    navigateForm(`/order/add?productId=${product.id}`)
  }
  const renderColorBaseCake = (baseCake) => {
    switch (baseCake) {
      case "VANI":
        return { bgcolor: "#FFF3CD", color: "#B8860B" }

      case "CHOCOLATE":
        return { bgcolor: "#EFEBE9", color: "#795548" }

      case "MATCHA":
        return { bgcolor: "#E8F5E9", color: "#2E7D32" }

      default:
        return { bgcolor: "#F5F5F5", color: "#616161" }
    }
  }

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        py={10}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">Không thể tải danh sách bánh. Vui lòng thử lại!</Alert>
      </Container>
    )
  }

  return (
    <Box sx={{ bgcolor: "#faf8f6", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box mb={4}>
          <Typography
            variant="h4"
            fontWeight={800}
            sx={{ color: "#49352c", mb: 1 }}
          >
            {collection?.name || "Bánh hiện có ở quán"}
          </Typography>

          <Typography color="text.secondary">{collection?.description}</Typography>

          <Chip
            label={`${products.length} mẫu bánh`}
            sx={{
              mt: 2,
              bgcolor: "#f3e5dc",
              color: "#986448",
              fontWeight: 600,
            }}
          />
        </Box>

        {/* Product grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              sm: "repeat(3, minmax(0, 1fr))",
              md: "repeat(4, minmax(0, 1fr))",
            },
            gap: { xs: 1.5, sm: 2.5 },
          }}
        >
          {products.map((product) => (
            <Card
              key={product.id}
              elevation={0}
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                border: "1px solid #eee7e2",
                display: "flex",
                flexDirection: "column",
                transition: "all .25s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 24px rgba(80,50,30,0.10)",
                },
              }}
            >
              {/* Image */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "1 / 1",
                  overflow: "hidden",
                  bgcolor: "#f5f0ec",
                }}
              >
                <CardMedia
                  component="img"
                  image={product.thumbnail}
                  alt={product.name}
                  sx={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />

                <Chip
                  label={product.size}
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    bgcolor: "rgba(255,255,255,.92)",
                    fontWeight: 700,
                  }}
                />
              </Box>
              {/* Content */}
              <CardContent
                sx={{
                  p: { xs: 1.5, sm: 2 },
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  "&:last-child": { pb: 2 },
                }}
              >
                <Typography
                  fontWeight={700}
                  sx={{
                    color: "#49352c",
                    fontSize: { xs: 14, sm: 16 },
                    minHeight: 44,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {product.name}
                </Typography>
                <Box>
                  <Chip
                    label={product.base_cake?.toLowerCase() ?? "không xác định"}
                    size="small"
                    sx={renderColorBaseCake(product.base_cake)}
                  />
                </Box>
                <Typography
                  fontWeight={800}
                  sx={{
                    color: "#b56e4e",
                    fontSize: { xs: 16, sm: 19 },
                    mt: 1,
                  }}
                >
                  {formatPrice(product.current_price)}
                </Typography>

                <Box
                  mt={1}
                  mb={2}
                >
                  <Chip
                    size="small"
                    color={product.quantity > 0 ? "success" : "default"}
                    label={`Còn ${product.quantity} bánh`}
                    variant="outlined"
                  />
                </Box>

                <Box mt="auto">
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<ShoppingCartOutlinedIcon />}
                    disabled={product.quantity <= 0}
                    onClick={() => handleOrder(product)}
                    sx={{
                      bgcolor: "#a66c4f",
                      borderRadius: 2,
                      fontWeight: 700,
                      py: 1,
                      textTransform: "none",
                      boxShadow: "none",
                      "&:hover": {
                        bgcolor: "#89543c",
                        boxShadow: "none",
                      },
                    }}
                  >
                    Đặt bánh
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {!products.length && <Alert severity="info">Hiện tại chưa có bánh nào trong danh sách.</Alert>}
      </Container>
    </Box>
  )
}

export default OverView
