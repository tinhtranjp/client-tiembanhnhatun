import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from "@mui/material"
import useFieldController from "../hooks/useFieldController"
import getErrorMessage from "../utils/getErrorMessage"

function RHFRadioGroup({
  name,

  label,

  options = [],

  row = false,

  helperText,

  disabled,

  shouldUnregister,

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
        value={field.value ?? ""}
      >
        {options.map((item) => (
          <FormControlLabel
            key={item.value}
            value={item.value}
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

export default RHFRadioGroup
