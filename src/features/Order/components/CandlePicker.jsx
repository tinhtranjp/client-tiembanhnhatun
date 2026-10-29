import { useEffect, useMemo, useState } from "react"
import { Box, Button, Typography } from "@mui/material"
import { Add } from "@mui/icons-material"

import SelectCandleModal from "./SelectCandleModal"
import { useCandleGetAll } from "@/features/Candle/service/queries"

export default function CandlePicker({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)

  const limit = 8

  const { data, isLoading } = useCandleGetAll({
    page,
    limit,
  })

  const candles = useMemo(() => data?.data?.candles ?? [], [data?.data?.candles])

  const totalPages = data?.data?.totalPages ?? 1
  const total = data?.data?.total ?? 0

  useEffect(() => {
    if (value?.id || !candles.length) return

    const defaultCandle = candles.find((candle) => candle.name?.startsWith("Miễn phí - "))

    if (defaultCandle) {
      onChange(defaultCandle)
    }
  }, [candles, value?.id, onChange])

  return (
    <Box>
      {value?.id && (
        <Box
          display="flex"
          alignItems="center"
          gap={1.5}
          mb={2}
        >
          <Box
            component="img"
            src={value.thumbnail}
            alt={value.name}
            sx={{
              width: 56,
              height: 56,
              objectFit: "cover",
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
            }}
          />

          <Box>
            <Typography
              variant="body2"
              fontWeight={600}
            >
              {value.name}
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
            >
              {Number(value.price).toLocaleString("vi-VN")} đ
            </Typography>
          </Box>
        </Box>
      )}

      <Button
        variant="outlined"
        startIcon={<Add />}
        onClick={() => setOpen(true)}
      >
        {value?.id ? "Đổi nến" : "Chọn nến"}
      </Button>

      <SelectCandleModal
        open={open}
        onClose={() => setOpen(false)}
        candles={candles}
        page={page}
        totalPages={totalPages}
        total={total}
        loading={isLoading}
        selectedCandleId={value?.id}
        onPageChange={setPage}
        onSelect={onChange}
      />
    </Box>
  )
}
