import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
  Typography,
} from "@mui/material"

import { Close, Check } from "@mui/icons-material"

function formatPrice(price) {
  return Number(price ?? 0).toLocaleString("vi-VN") + " đ"
}

export default function SelectCandleModal({
  open,
  onClose,
  candles = [],
  page = 1,
  totalPages = 1,
  total = 0,
  onPageChange,
  onSelect,
  selectedCandleId,
  loading = false,
}) {
  const handleSelect = (candle) => {
    if (candle.status !== "AVAILABLE") return

    onSelect(candle)
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      scroll="paper"
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pr: 2,
        }}
      >
        <Box>
          <Typography
            variant="h6"
            fontWeight={700}
          >
            Chọn nến
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Có {total} loại nến
          </Typography>
        </Box>

        <IconButton
          onClick={onClose}
          aria-label="Đóng"
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Box
            py={6}
            textAlign="center"
          >
            <Typography color="text.secondary">Đang tải danh sách nến...</Typography>
          </Box>
        ) : candles.length === 0 ? (
          <Box
            py={6}
            textAlign="center"
          >
            <Typography color="text.secondary">Chưa có loại nến nào.</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, minmax(0, 1fr))",
                sm: "repeat(3, minmax(0, 1fr))",
                md: "repeat(4, minmax(0, 1fr))",
              },
              gap: 2,
            }}
          >
            {candles.map((candle) => {
              const isSelected = String(selectedCandleId ?? "") === String(candle.id)

              const unavailable = candle.status !== "AVAILABLE"

              return (
                <Card
                  key={candle.id}
                  variant="outlined"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderColor: isSelected ? "primary.main" : "divider",
                    borderWidth: isSelected ? 2 : 1,
                    opacity: unavailable ? 0.65 : 1,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={candle.thumbnail}
                    alt={candle.name}
                    sx={{
                      aspectRatio: "1",
                      objectFit: "cover",
                      bgcolor: "action.hover",
                    }}
                  />

                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      flexGrow: 1,
                      p: 1.5,
                      "&:last-child": { pb: 1.5 },
                    }}
                  >
                    <Typography
                      sx={{
                        overflowWrap: "anywhere",
                      }}
                    >
                      {candle.name}
                    </Typography>

                    <Typography color="success">{formatPrice(candle.price)}</Typography>
                    <Button
                      fullWidth
                      size="small"
                      variant={isSelected ? "contained" : "outlined"}
                      startIcon={isSelected ? <Check /> : undefined}
                      disabled={unavailable}
                      onClick={() => handleSelect(candle)}
                    >
                      {isSelected ? "Đã chọn" : "Chọn nến"}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </Box>
        )}

        {totalPages > 1 && (
          <Box
            display="flex"
            justifyContent="center"
            mt={3}
            mb={1}
          >
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, nextPage) => onPageChange(nextPage)}
              color="primary"
              shape="rounded"
              disabled={loading}
            />
          </Box>
        )}
      </DialogContent>

      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          variant="outlined"
          onClick={onClose}
        >
          Đóng
        </Button>
      </Box>
    </Dialog>
  )
}
