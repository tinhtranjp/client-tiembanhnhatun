export default function getErrorMessage(fieldState, helperText) {
  return fieldState.error?.message ?? helperText
}
