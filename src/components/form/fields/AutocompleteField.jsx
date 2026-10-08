import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import { useMemo } from "react"
import useFieldController from "../hooks/useFieldController"

function AutocompleteField({ name, label, helperText, options = [], multiple = false, fullWidth = true, ...rest }) {
  const { field, fieldState } = useFieldController({ name })

  const selectedValue = useMemo(() => {
    if (multiple) {
      const values = field.value ?? []
      return options.filter((option) => values.includes(option.value))
    }

    return options.find((option) => option.value === field.value) ?? null
  }, [multiple, options, field.value])

  const handleChange = (_, value) => {
    if (multiple) {
      field.onChange(value.map((item) => item.value))
      return
    }

    field.onChange(value?.value ?? null)
  }

  return (
    <Autocomplete
      {...rest}
      multiple={multiple}
      fullWidth={fullWidth}
      options={options}
      value={selectedValue}
      onChange={handleChange}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={fieldState.invalid}
          helperText={fieldState.error?.message ?? helperText}
        />
      )}
    />
  )
}

export default AutocompleteField
