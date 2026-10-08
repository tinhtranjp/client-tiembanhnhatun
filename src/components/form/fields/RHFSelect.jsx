import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from "@mui/material"

import useFieldController from "../hooks/useFieldController"
import getErrorMessage from "../utils/getErrorMessage"

function RHFSelect({
  name,

  label,

  options = [],

  valueKey = "value",

  labelKey = "label",

  placeholder = "Select...",

  helperText,

  fullWidth = true,

  disabled,

  shouldUnregister,

  ...rest
}) {
  const { field, fieldState } = useFieldController({ name })
  const ref = (element) => {
    field.ref(element)
  }
  return (
    <FormControl
      fullWidth={fullWidth}
      error={fieldState.invalid}
    >
      {label && <InputLabel>{label}</InputLabel>}

      <Select
        {...field}
        {...rest}
        label={label}
        value={field.value ?? ""}
        inputRef={ref}
      >
        {options.map((item) => (
          <MenuItem
            key={item[valueKey]}
            value={item[valueKey]}
          >
            {item[labelKey]}
          </MenuItem>
        ))}
      </Select>

      <FormHelperText>{getErrorMessage(fieldState, helperText)}</FormHelperText>
    </FormControl>
  )
}

export default RHFSelect
