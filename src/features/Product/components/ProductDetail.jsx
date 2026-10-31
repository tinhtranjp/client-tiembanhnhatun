import { Box, Button, Card, CardContent, Chip, Divider, Grid, Stack, Typography } from "@mui/material"

import ImageIcon from "@mui/icons-material/Image"
import VideocamIcon from "@mui/icons-material/Videocam"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import SellIcon from "@mui/icons-material/Sell"
import LayersIcon from "@mui/icons-material/Layers"
import SearchIcon from "@mui/icons-material/Search"
import { useThemeGetByIds } from "@/features/Theme/service/queries"
import { useProductDeleteMedia } from "../service/mutation"

function InfoItem({ label, value, icon }) {
  return (
    <Stack
      direction="row"
      spacing={1.5}
      alignItems="center"
    >
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: 2,
          bgcolor: "action.hover",
          display: "grid",
          placeItems: "center",
          color: "text.secondary",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>

      <Box minWidth={0}>
        <Typography
          variant="caption"
          color="text.secondary"
        >
          {label}
        </Typography>
        <Typography
          fontWeight={600}
          sx={{ overflowWrap: "anywhere" }}
        >
          {value ?? "Chưa cập nhật"}
        </Typography>
      </Box>
    </Stack>
  )
}

function ThemeList({ themes = [] }) {
  if (!themes.length) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
      >
        Chưa có chủ đề
      </Typography>
    )
  }

  return (
    <Stack
      direction="row"
      gap={1}
      flexWrap="wrap"
    >
      {themes.map((theme) => (
        <Chip
          key={theme.id}
          label={theme.name}
          size="small"
        />
      ))}
    </Stack>
  )
}

function MediaSection({ media = [], onUpdateVideo }) {
  const images = media.filter((item) => item.resourceType === "image")

  const videos = media.filter((item) => item.resourceType === "video")
  const deleteMutation = useProductDeleteMedia()

  const handleDeleteMedia = async (id) => {
    console.log(id)
    try {
      if (window.confirm("Bạn có chắc muốn xóa video không ?")) {
        await deleteMutation.mutateAsync({ id })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Stack spacing={3}>
      {/* Images */}
      <Box>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          mb={1.5}
        >
          <ImageIcon color="action" />
          <Typography
            variant="h6"
            fontWeight={700}
          >
            Hình ảnh
          </Typography>
          <Chip
            label={images.length}
            size="small"
          />
        </Stack>
        {images.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 1.5,
            }}
          >
            {images.map((image) => (
              <Box
                key={image.id}
                sx={{
                  aspectRatio: "1 / 1",
                  borderRadius: 2,
                  overflow: "hidden",
                  bgcolor: "action.hover",
                }}
              >
                <Box
                  component="img"
                  src={image.secureUrl}
                  alt="Ảnh sản phẩm"
                  loading="lazy"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <Box
            sx={{
              py: 4,
              border: "1px dashed",
              borderColor: "divider",
              borderRadius: 2,
              textAlign: "center",
            }}
          >
            <ImageIcon sx={{ fontSize: 36, color: "text.disabled" }} />
            <Typography
              color="text.secondary"
              variant="body2"
            >
              Sản phẩm chưa có hình ảnh
            </Typography>
          </Box>
        )}
      </Box>

      <Divider />

      {/* Videos */}
      <Box>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          mb={1.5}
        >
          <VideocamIcon color="action" />
          <Typography
            variant="h6"
            fontWeight={700}
          >
            Video
          </Typography>
          <Chip
            label={videos.length}
            size="small"
          />
        </Stack>

        {videos.length > 0 ? (
          <Grid
            container
            spacing={1.5}
          >
            {videos.map((video) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={video.id}
              >
                <Box
                  sx={{
                    bgcolor: "#111",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    component="video"
                    src={video.secureUrl}
                    controls
                    playsInline
                    preload="metadata"
                    sx={{
                      display: "block",
                      width: "100%",
                      aspectRatio: "16 / 9",
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Stack
                  mt={2}
                  direction={"row"}
                  spacing={2}
                >
                  <Button
                    variant="contained"
                    size="small"
                    onClick={onUpdateVideo}
                  >
                    Thay video
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    variant="contained"
                    onClick={() => handleDeleteMedia(video.id)}
                  >
                    Xóa
                  </Button>
                </Stack>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box
            sx={{
              minHeight: 190,
              border: "1px dashed",
              borderColor: "divider",
              borderRadius: 2,
              bgcolor: "action.hover",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              p: 3,
              textAlign: "center",
            }}
          >
            <VideocamIcon sx={{ fontSize: 48, color: "text.disabled" }} />

            <Typography fontWeight={600}>Sản phẩm chưa có video</Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              Thêm video để khách hàng có thể xem sản phẩm trực quan hơn.
            </Typography>

            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              onClick={onUpdateVideo}
              sx={{ mt: 1 }}
            >
              Cập nhật video
            </Button>
          </Box>
        )}
      </Box>
    </Stack>
  )
}

export default function ProductDetail({ product, onUpdateVideo }) {
  const { data } = useThemeGetByIds(product?.themeIds ?? [])
  const themes = Array.isArray(data?.data) ? data.data : []

  const media = product?.media ?? product?.medias ?? []

  return (
    <Stack spacing={2.5}>
      {/* Product information */}
      <Card variant="outlined">
        <CardContent sx={{ p: 2.5 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            mb={2.5}
          >
            Thông tin sản phẩm
          </Typography>

          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              sm={6}
            >
              <InfoItem
                label="Tên sản phẩm"
                value={product.name}
                icon={<SellIcon fontSize="small" />}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
            >
              <InfoItem
                label="Giá thấp nhất"
                value={product.minPrice?.toLocaleString("vi-VN") + " đ"}
                icon={<SellIcon fontSize="small" />}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
            >
              <InfoItem
                label="Giá cao nhất"
                value={product.maxPrice?.toLocaleString("vi-VN") + " đ"}
                icon={<SellIcon fontSize="small" />}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
            >
              <InfoItem
                label="Giá hiện tại"
                value={product.currentPrice?.toLocaleString("vi-VN") + " đ"}
                icon={<SellIcon fontSize="small" />}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
            >
              <InfoItem
                label="Kích thước"
                value={product.size}
                icon={<LayersIcon fontSize="small" />}
              />
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
            >
              <InfoItem
                label="Số tầng"
                value={product.layers}
                icon={<LayersIcon fontSize="small" />}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 2.5 }} />

          <Typography
            fontWeight={700}
            mb={1}
          >
            Chủ đề
          </Typography>
          <ThemeList themes={themes} />

          <Divider sx={{ my: 2.5 }} />

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            mb={1}
          >
            <SearchIcon color="action" />
            <Typography fontWeight={700}>Nội dung tìm kiếm</Typography>
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}
          >
            {product.embeddingText || "Chưa có nội dung"}
          </Typography>
        </CardContent>
      </Card>

      {/* Media */}
      <Card variant="outlined">
        <CardContent sx={{ p: 2.5 }}>
          <Typography
            variant="h6"
            fontWeight={700}
            mb={2.5}
          >
            Thư viện sản phẩm
          </Typography>

          <MediaSection
            media={media}
            onUpdateVideo={onUpdateVideo}
          />
        </CardContent>
      </Card>
    </Stack>
  )
}
