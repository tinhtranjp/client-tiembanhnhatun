import CkeditorCustom from "@/components/ckeditor/CkeditorCustom"
import getErrorMessage from "../utils/getErrorMessage"
import useFieldController from "../hooks/useFieldController"
import { forwardRef } from "react"

const RHFCkeditor = forwardRef(function RHFCkeditor(
  {
    name,
    label,
    height,
    folder,
    relatedType,
    relatedId = null,
    imageType,
    helperText,
    scrollable,
    fullWidth = true,
    ...rest
  },
  ref,
) {
  const { field, fieldState } = useFieldController({ name })

  return (
    <CkeditorCustom
      ref={ref}
      {...rest}
      value={field.value ?? ""}
      folder={folder}
      relatedType={relatedType}
      relatedId={relatedId}
      imageType={imageType}
      onChange={field.onChange}
      label={label}
      messError={getErrorMessage(fieldState, helperText)}
      height={height}
      scrollable={scrollable}
      fullWidth={fullWidth}
    />
  )
})

export default RHFCkeditor
