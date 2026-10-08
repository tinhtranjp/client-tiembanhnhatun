import { Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel } from "@mui/material"
import useFieldController from "../hooks/useFieldController"
import getErrorMessage from "../utils/getErrorMessage"

function RHFCheckboxGroup({ name, label, options = [], row = false, helperText, ...rest }) {
  const { field, fieldState } = useFieldController({ name })

  const values = field.value ?? []

  const handleChange = (value) => {
    if (values.includes(value)) {
      field.onChange(values.filter((item) => item !== value))
      return
    }

    field.onChange([...values, value])
  }

  return (
    <FormControl error={fieldState.invalid}>
      {label && <FormLabel>{label}</FormLabel>}

      <FormGroup row={row}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            label={option.label}
            control={
              <Checkbox
                checked={values.includes(option.value)}
                onChange={() => handleChange(option.value)}
                disabled={option.disabled}
                {...rest}
              />
            }
          />
        ))}
      </FormGroup>

      <FormHelperText>{getErrorMessage(fieldState, helperText)}</FormHelperText>
    </FormControl>
  )
}

export default RHFCheckboxGroup
