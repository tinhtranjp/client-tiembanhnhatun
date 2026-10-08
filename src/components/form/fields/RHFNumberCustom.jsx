import { NumericFormat } from "react-number-format"
import TextField from "@mui/material/TextField"
import useFieldController from "../hooks/useFieldController"

function RHFNumberCustom({ name, label, ...rest }) {
  const { field, fieldState } = useFieldController({ name })
  return (
    <NumericFormat
      {...rest}
      customInput={TextField}
      label={label}
      value={field.value ?? ""}
      thousandSeparator="."
      decimalSeparator=","
      valueIsNumericString
      onValueChange={(values) => {
        field.onChange(values.value === "" ? "" : values.floatValue)
      }}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  )
}
export default RHFNumberCustom
