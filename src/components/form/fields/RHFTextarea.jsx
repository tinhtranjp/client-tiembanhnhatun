import TextField from "@mui/material/TextField"

import useFieldController from "../hooks/useFieldController"
import getErrorMessage from "../utils/getErrorMessage"

function RHFTextarea({ name, label, rows = 4, helperText, disabled, shouldUnregister, fullWidth = true, ...rest }) {
  const { field, fieldState } = useFieldController({ name })

  return (
    <TextField
      {...field}
      {...rest}
      multiline
      rows={rows}
      fullWidth={fullWidth}
      label={label}
      value={field.value ?? ""}
      error={fieldState.invalid}
      helperText={getErrorMessage(fieldState, helperText)}
    />
  )
}

export default RHFTextarea
