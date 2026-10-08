import { useState } from "react"

import TextField from "@mui/material/TextField"

import IconButton from "@mui/material/IconButton"

import InputAdornment from "@mui/material/InputAdornment"

import Visibility from "@mui/icons-material/Visibility"

import VisibilityOff from "@mui/icons-material/VisibilityOff"

import useFieldController from "../hooks/useFieldController"
import getErrorMessage from "../utils/getErrorMessage"

function RHFPasswordField({ name, label, helperText, disabled, shouldUnregister, fullWidth = true, ...rest }) {
  const [showPassword, setShowPassword] = useState(false)

  const { field, fieldState } = useFieldController({ name })

  return (
    <TextField
      {...field}
      {...rest}
      fullWidth={fullWidth}
      type={showPassword ? "text" : "password"}
      label={label}
      value={field.value ?? ""}
      error={fieldState.invalid}
      helperText={getErrorMessage(fieldState, helperText)}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  )
}

export default RHFPasswordField
