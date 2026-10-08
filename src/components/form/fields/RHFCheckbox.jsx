import { Checkbox, FormControl, FormControlLabel, FormHelperText } from "@mui/material"

import useFieldController from "../hooks/useFieldController"
import getErrorMessage from "../utils/getErrorMessage"

function RHFCheckbox({ name, label, helperText, disabled, shouldUnregister, ...rest }) {
  const { field, fieldState } = useFieldController({ name })

  return (
    <FormControl
      error={fieldState.invalid}
      disabled={disabled}
    >
      <FormControlLabel
        label={label}
        control={
          <Checkbox
            {...rest}
            inputRef={field.ref}
            checked={!!field.value}
            onChange={(event) => field.onChange(event.target.checked)}
            onBlur={field.onBlur}
            name={field.name}
          />
        }
      />

      <FormHelperText>{getErrorMessage(fieldState, helperText)}</FormHelperText>
    </FormControl>
  )
}
export default RHFCheckbox
