import { FormProvider } from "react-hook-form"

function Form({ methods, onSubmit, children, ...props }) {
  return (
    <FormProvider {...methods}>
      <form
        noValidate
        onSubmit={methods.handleSubmit(onSubmit)}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  )
}

export default Form
