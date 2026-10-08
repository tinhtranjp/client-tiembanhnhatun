import { Box, Card, CardContent, Chip, Divider, IconButton, Stack, Typography } from "@mui/material"
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import { useNavigate } from "react-router-dom"

function ProductCard({ product }) {
  const navigate = useNavigate()
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        overflow: "hidden",
        transition: "all .2s ease",
        "&:hover": {
          borderColor: "text.primary",
          boxShadow: "0 8px 30px rgba(0,0,0,.06)",
        },
      }}
    >
      <CardContent sx={{ p: 2 }}>
        {/* Header */}
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between"
          gap={1}
        >
          <Stack
            direction="row"
            spacing={1.25}
            minWidth={0}
            alignItems="flex-start"
          >
            {/* Thumbnail */}
            <Box
              component="img"
              src={product.thumbnail || "/placeholder-product.png"}
              alt={product.name}
              sx={{
                width: 40,
                height: 40,
                flexShrink: 0,
                borderRadius: 1.5,
                objectFit: "cover",
                bgcolor: "action.hover",
                border: "1px solid",
                borderColor: "divider",
              }}
            />

            <Box minWidth={0}>
              <Typography
                variant="subtitle1"
                fontWeight={700}
                sx={{
                  lineHeight: 1.35,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {product.name}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 0.5 }}
              >
                #{product.id}
              </Typography>
            </Box>
          </Stack>

          <IconButton size="small">
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </Stack>

        {/* Price */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 2 }}
        >
          <Box>
            <Typography
              variant="h6"
              fontWeight={800}
              sx={{ lineHeight: 1 }}
            >
              {Number(product.current_price).toLocaleString("vi-VN")}đ
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 0.5, display: "block" }}
            >
              {Number(product.min_price).toLocaleString("vi-VN")}đ{" – "}
              {Number(product.max_price).toLocaleString("vi-VN")}đ
            </Typography>
          </Box>

          <Chip
            label="Đang bán"
            size="small"
            variant="outlined"
            sx={{
              borderRadius: 2,
              fontWeight: 600,
            }}
          />
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Product metadata */}
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          useFlexGap
        >
          {product.size && (
            <Chip
              label={product.size}
              size="small"
              sx={{ borderRadius: 1.5 }}
            />
          )}

          {product.layers && (
            <Chip
              label={product.layers}
              size="small"
              sx={{ borderRadius: 1.5 }}
            />
          )}
        </Stack>

        {/* Embedding text */}
        <Box
          sx={{
            mt: 2,
            p: 1.5,
            borderRadius: 2,
            bgcolor: "action.hover",
          }}
        >
          <Typography
            variant="caption"
            fontWeight={700}
            color="text.secondary"
          >
            EMBEDDING TEXT
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 0.5,
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.embedding_text || "Chưa có embedding text"}
          </Typography>
        </Box>

        {/* Footer */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <Typography
            variant="caption"
            color="text.secondary"
          >
            {new Date(product.updated_at).toLocaleDateString("vi-VN")}
          </Typography>

          <IconButton
            onClick={() => navigate(`/product/${product.id}/edit`)}
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
  )
}
export default ProductCard
