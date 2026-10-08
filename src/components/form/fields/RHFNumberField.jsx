import TextField from "@mui/material/TextField"

import useFieldController from "../hooks/useFieldController"
import getErrorMessage from "../utils/getErrorMessage"

function RHFNumberField({ name, label, helperText, shouldUnregister, fullWidth = true, ...rest }) {
  const { field, fieldState } = useFieldController({ name })

  const handleChange = (event) => {
    const value = event.target.value.replace(/[^\d]/g, "")

    field.onChange(value)
  }

  return (
    <TextField
      {...field}
      {...rest}
      type="text"
      inputMode="numeric"
      fullWidth={fullWidth}
      label={label}
      value={field.value ?? ""}
      onChange={handleChange}
      error={fieldState.invalid}
      helperText={getErrorMessage(fieldState, helperText)}
    />
  )
}

export default RHFNumberField
