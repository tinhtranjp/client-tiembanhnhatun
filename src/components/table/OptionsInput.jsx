import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

function OptionsInput({ value, handleChangeStatus, label = "Status", lableId = "id", options, ...props }) {
  return (
    <FormControl
      sx={{ width: 180 }}
      size="small"
      {...props}
    >
      <InputLabel id={lableId}>{label}</InputLabel>

      <Select
        labelId={lableId}
        id={lableId}
        value={value}
        label={label}
        onChange={handleChangeStatus}
      >
        {options &&
          options.map((o) => (
            <MenuItem
              key={o.value}
              value={o.value}
            >
              {o.label}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  )
}

export default OptionsInput
