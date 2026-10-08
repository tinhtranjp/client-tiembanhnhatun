import { FormControl, FormControlLabel, FormHelperText, Switch } from "@mui/material"

import useFieldController from "../hooks/useFieldController"
import getErrorMessage from "../utils/getErrorMessage"

function RHFSwitch({ name, label, helperText, disabled, shouldUnregister, ...rest }) {
  const { field, fieldState } = useFieldController({ name })

  return (
    <FormControl
      error={fieldState.invalid}
      disabled={disabled}
    >
      <FormControlLabel
        label={label}
        control={
          <Switch
            {...rest}
            inputRef={field.ref}
            checked={Boolean(field.value)}
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

export default RHFSwitch
