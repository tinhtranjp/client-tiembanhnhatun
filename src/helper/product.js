export const mappedStringToObj = (status) => {
  if (!status) return []
  return status.map((s) => ({
    label: s.toLocaleUpperCase(),
    value: s.toLocaleUpperCase(),
  }))
}
