import { Stack } from "@mui/material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

function RangeDate({ onChangeStartDate, onChangeEndDate, startDate, endDate, width = "180px" }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
        direction="row"
        spacing={2}
      >
        <DatePicker
          sx={{ width }}
          value={startDate}
          onChange={(newValue) => onChangeStartDate(newValue)}
          label="Từ ngày"
          slotProps={{
            textField: {
              size: "small",
            },
          }}
        />
        <DatePicker
          sx={{ width }}
          value={endDate}
          onChange={(newValue) => onChangeEndDate(newValue)}
          label="Đến ngày"
          slotProps={{
            textField: {
              size: "small",
            },
          }}
        />
      </Stack>
    </LocalizationProvider>
  )
}

export default RangeDate
