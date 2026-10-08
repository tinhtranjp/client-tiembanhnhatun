import { Stack } from "@mui/material"
import TextNumber from "../input-common/TextNumber"

function RangePrice({ handleChangeMin, handleChangeMax, minPrice, maxPrice }) {
  return (
    <Stack
      alignItems="center"
      flexDirection="row"
      gap={2}
    >
      <TextNumber
        value={minPrice}
        onChangeValue={handleChangeMin}
        label="Giá thấp nhất"
        size="small"
      />
      <TextNumber
        value={maxPrice}
        onChangeValue={handleChangeMax}
        label="Giá cao nhất"
        size="small"
      />
    </Stack>
  )
}

export default RangePrice
