import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from "@mui/material"
import useFieldController from "../hooks/useFieldController"
import getErrorMessage from "../utils/getErrorMessage"

export default function RHFRadioGroup({
  name,
  label,
  options = [],
  row = false,
  helperText,
  disabled,
  booleanValue = false,
  ...rest
}) {
  const { field, fieldState } = useFieldController({ name })

  return (
    <FormControl
      error={fieldState.invalid}
      disabled={disabled}
    >
      {label && <FormLabel>{label}</FormLabel>}

      <RadioGroup
        {...field}
        {...rest}
        row={row}
        value={field.value == null ? "" : String(field.value)}
        onChange={(_, value) => field.onChange(booleanValue ? value === "true" : value)}
      >
        {options.map((item) => (
          <FormControlLabel
            key={String(item.value)}
            value={String(item.value)}
            label={item.label}
            disabled={item.disabled}
            control={<Radio />}
          />
        ))}
      </RadioGroup>

      <FormHelperText>{getErrorMessage(fieldState, helperText)}</FormHelperText>
    </FormControl>
  )
}
