import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  AutocompleteField,
  Form,
  RHFCheckbox,
  RHFCheckboxGroup,
  RHFNumberField,
  RHFPasswordField,
  RHFSwitch,
  RHFTextarea,
} from "@/components/form"
import { userSchema } from "./userSchema"
import RHFSelect from "./fields/RHFSelect"
import RHFRadioGroup from "./fields/RHFRadioGroup"
import RHFTextField from "./fields/RHFTextField"

export default function UserForm() {
  const methods = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      level: "",
      permissions: [],
      roleIds: [],
    },
    mode: "all",
  })

  console.log("methods", methods.formState.errors)

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className="justify-center items-center flex h-screen">
      <Form
        methods={methods}
        onSubmit={onSubmit}
        className="w-1/3 bg-white p-4 rounded-lg shadow-md"
      >
        <Stack spacing={2}>
          <AutocompleteField
            name="roleIds"
            label="Roles"
            multiple
            options={[
              { value: 1, label: "Admin" },
              { value: 2, label: "User" },
            ]}
          />
          <RHFPasswordField
            name="password"
            label="Password"
          />

          <RHFTextarea
            name="description"
            label="Description"
          />

          <RHFNumberField
            name="age"
            label="Age"
          />
          <RHFTextField
            name="email"
            label="Email"
          />
          <RHFSelect
            name="label"
            label="Label"
            options={[
              { value: "admin", label: "Admin" },
              { value: "user", label: "User" },
              { value: "other", label: "Other" },
            ]}
          />
          <RHFRadioGroup
            name="gender"
            label="Gender"
            row
            options={[
              {
                value: "MALE",
                label: "Male",
              },
              {
                value: "FEMALE",
                label: "Female",
              },
            ]}
          />
          <RHFCheckbox
            name="rememberMe"
            label="Remember me"
          />
          <RHFSwitch
            name="published"
            label="Published"
          />
          <RHFCheckboxGroup
            name="permissions"
            label="Permissions"
            options={[
              {
                value: "READ",
                label: "Read",
              },
              {
                value: "WRITE",
                label: "Write",
              },
              {
                value: "UPDATE",
                label: "Update",
              },
              {
                value: "DELETE",
                label: "Delete",
              },
            ]}
          />
          <Button
            variant="contained"
            type="submit"
          >
            Save
          </Button>
        </Stack>
      </Form>
    </div>
  )
}
