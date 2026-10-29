import { Alert, Box, Button, Card, CardContent, Chip, Skeleton, Stack, Typography } from "@mui/material"
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined"
import { useGetCakeBaseSummary } from "./service/queries"
import useOnBackPage from "@/hook/useOnBackPage"

export default function CakeBaseSummary() {
  const { data, isPending, isError } = useGetCakeBaseSummary()

  const items = data?.data ?? data ?? []

  const onBackPage = useOnBackPage("/order/list")
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <RocketLaunchOutlinedIcon color="primary" />
            <Typography
              variant="h6"
              fontWeight={500}
            >
              Bánh cần chuẩn bị hôm nay
            </Typography>
          </Stack>

          <Button
            sx={{ maxWidth: "90px" }}
            variant="contained"
            size="small"
            onClick={onBackPage}
          >
            Quay lại
          </Button>
        </Stack>

        {isPending && (
          <Stack spacing={1}>
            {[1, 2, 3].map((item) => (
              <Skeleton
                key={item}
                height={48}
                variant="rounded"
              />
            ))}
          </Stack>
        )}

        {isError && <Alert severity="error">Không thể tải danh sách bánh hôm nay.</Alert>}

        {!isPending && !isError && items.length === 0 && (
          <Box
            py={3}
            textAlign="center"
          >
            <Typography color="text.secondary">Hôm nay chưa có bánh cần chuẩn bị.</Typography>
          </Box>
        )}

        {!isPending && !isError && items.length > 0 && (
          <Stack spacing={1}>
            {items.map((item) => (
              <Box
                key={`${item.cakeBase}-${item.size}`}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: "action.hover",
                }}
              >
                <Box minWidth={0}>
                  <Typography fontWeight={400}>
                    {String(item.cakeBase ?? "")
                      .toLowerCase()
                      .replace(/^./, (char) => char.toUpperCase())}{" "}
                    x {item.size}
                  </Typography>
                </Box>

                <Chip
                  label={`${Number(item.quantity)} bánh`}
                  color="success"
                  sx={{ fontWeight: 500 }}
                />
              </Box>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  )
}
