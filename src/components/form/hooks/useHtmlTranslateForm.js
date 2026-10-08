import { useValuePostApi } from "@/features/Vocab/service/vocabMutations"
import { cleanHtmlBeforeSubmit, isCallPostApiValue } from "@/helper/postApi"
import { useState } from "react"

function useHtmlTranslateForm() {
  const [step, setStep] = useState(1)

  const mutation = useValuePostApi()

  const translateHtml = async (html) => {
    if (!isCallPostApiValue(html)) {
      return html
    }

    const res = await mutation.mutateAsync({
      htmlString: html,
    })

    return res?.data?.htmlString || html
  }

  const cleanHtml = (ref) => {
    return cleanHtmlBeforeSubmit(ref.current?.innerHTML || "")
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const resetStep = () => {
    setStep(1)
  }

  return {
    step,
    setStep,
    translateHtml,
    cleanHtml,
    nextStep,
    prevStep,
    resetStep,
    isTranslating: mutation.isPending,
  }
}

export default useHtmlTranslateForm
