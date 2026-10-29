import { useForm } from "react-hook-form"
import { AutocompleteField, Form, RHFTextarea, RHFTextField } from "../../../components/form"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button"
import { createProductSchema } from "../service/schema"
import RHFNumberCustom from "@/components/form/fields/RHFNumberCustom"
import RHFCkeditor from "@/components/form/fields/RHFCkeditor"
import { useThemeGetAll } from "@/features/Theme/service/queries"
import { sizeCakes, layers, cakeBaseOptions } from "../helper"
import { Box } from "@mui/material"

import { useState } from "react"
import ProductImageUpload from "./ProductImageUpload"
import { useRef } from "react"
import { useMediaDiff } from "@/hook/useMediaDiff"
function FormProduct({ onSubmit }) {
  const [images, setImages] = useState([])
  const { data: themes } = useThemeGetAll()

  const editorRef = useRef(null)

  const { getMediaDiff } = useMediaDiff()

  const themeOptions = themes?.data.map((item) => ({
    value: Number(item.id),
    label: item.name,
  }))

  const methods = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      minPrice: undefined,
      maxPrice: undefined,
      currentPrice: undefined,
      size: "10cm",
      layers: "1 tầng",
      embeddingText: "",
      themeIds: [],
    },
  })

  const onSubmitForm = async (data) => {
    const uploadMedia = editorRef.current?.getUploadMedia() ?? []
    const { activeImageIds, deleteImageIds } = getMediaDiff(data.description, uploadMedia)
    await onSubmit({
      ...data,
      embeddingText: `${data.name}, ${data.embeddingText}`,
      activeImageIds,
      deleteImageIds,
      files: images,
    })
  }

  return (
    <Form
      methods={methods}
      onSubmit={onSubmitForm}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <ProductImageUpload
          value={images}
          onChange={setImages}
        />
        <RHFTextField
          name="name"
          label="Tên bánh"
        />
        <AutocompleteField
          name={"themeIds"}
          label={"Chủ đề"}
          options={themeOptions}
          multiple
        />
        <AutocompleteField
          name={"layers"}
          label={"Số tầng"}
          options={layers}
        />
        <AutocompleteField
          name={"size"}
          label={"Size bánh"}
          options={sizeCakes}
        />
        <RHFNumberCustom
          name="minPrice"
          label="Giá thấp nhất"
        />
        <RHFNumberCustom
          name="maxPrice"
          label="Giá cao nhất"
        />
        <RHFNumberCustom
          name="currentPrice"
          label="Giá của size hiện tại"
        />
        <RHFCkeditor
          ref={editorRef}
          name="description"
          label="Mô tả"
          folder="products"
          relatedType="product"
          imageType="description"
        />
        <RHFTextarea
          name={"embeddingText"}
          label={"Từ khóa tìm kiếm"}
        />
      </Box>
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        type="submit"
        loading={methods.formState.isSubmitting}
        loadingIndicator="Loading…"
      >
        Submit
      </Button>
    </Form>
  )
}

export default FormProduct
