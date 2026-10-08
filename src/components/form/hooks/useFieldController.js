import { useController, useFormContext } from "react-hook-form"

export default function useFieldController({ name, disabled, shouldUnregister }) {
  const { control } = useFormContext()

  return useController({
    name,

    control,

    disabled,

    shouldUnregister,
  })
}
