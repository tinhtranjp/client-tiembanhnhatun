import { useEffect, useMemo, useState } from "react"

import { Box, Button, Typography } from "@mui/material"
import { Add } from "@mui/icons-material"

import SelectCandleModal from "./SelectCandleModal"
import { useHatGetAll } from "@/features/Hat/service/queries"

export default function HatPicker({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)

  const limit = 8

  const { data, isLoading } = useHatGetAll({
    page,
    limit,
  })

  const hats = useMemo(() => data?.data?.hats ?? [], [data?.data?.hats])

  const totalPages = data?.data?.totalPages ?? 1
  const total = data?.data?.total ?? 0

  useEffect(() => {
    if (value?.id || !hats.length) return

    const defaultHat = hats.find((hat) => hat.name?.startsWith("Miễn phí - "))

    if (defaultHat) {
      onChange(defaultHat)
    }
  }, [hats, value?.id, onChange])

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
        {value?.id ? "Đổi mũ" : "Chọn mũ"}
      </Button>

      <SelectCandleModal
        open={open}
        onClose={() => setOpen(false)}
        candles={hats}
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
