import TextField from "@mui/material/TextField"
import useFieldController from "../hooks/useFieldController"
import getErrorMessage from "../utils/getErrorMessage"

function RHFTextField({ name, label, helperText, fullWidth = true, ...rest }) {
  const { field, fieldState } = useFieldController({ name })

  const ref = (element) => {
    field.ref(element)
  }
  return (
    <TextField
      {...field}
      {...rest}
      inputRef={ref}
      label={label}
      fullWidth={fullWidth}
      value={field.value ?? ""}
      error={fieldState.invalid}
      helperText={getErrorMessage(fieldState, helperText)}
    />
  )
}

export default RHFTextField
