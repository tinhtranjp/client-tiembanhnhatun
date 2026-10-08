import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Button from "@mui/material/Button"
import { Box } from "@mui/material"

import { AutocompleteField, Form, RHFTextarea, RHFTextField } from "../../../components/form"

import { createProductSchema } from "../service/schema"
import RHFNumberCustom from "@/components/form/fields/RHFNumberCustom"
import RHFCkeditor from "@/components/form/fields/RHFCkeditor"

import { useCategoryGetAll } from "@/features/Category/service/queries"
import { useThemeGetAll } from "@/features/Theme/service/queries"

import { sizeCake, layers } from "../helper"

import ProductImageUpload from "./ProductImageUpload"
import { useMediaDiff } from "@/hook/useMediaDiff"

function UpdateFormProduct({ productDetail, onSubmit }) {
  const [images, setImages] = useState([])

  const { data: categories } = useCategoryGetAll()
  const { data: themes } = useThemeGetAll()

  const editorRef = useRef(null)

  const categoryOptions = categories?.data.map((item) => ({
    value: Number(item.id),
    label: item.name,
  }))

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
      categoryIds: [],
      themeIds: [],
    },
  })

  useEffect(() => {
    if (!productDetail) return

    methods.reset({
      name: productDetail.name ?? "",
      description: productDetail.description ?? "",
      minPrice: productDetail.minPrice ?? undefined,
      maxPrice: productDetail.maxPrice ?? undefined,
      currentPrice: productDetail.currentPrice ?? undefined,
      size: productDetail.size ?? "10cm",
      layers: productDetail.layers ?? "1 tầng",
      embeddingText: productDetail.embeddingText ?? "",
      categoryIds: productDetail.categoryIds ?? [],
      themeIds: productDetail.themeIds ?? [],
    })

    setImages(
      (productDetail.medias ?? []).map((media) => ({
        id: media.id,
        secureUrl: media.secureUrl,
        resourceType: media.resourceType,
        displayOrder: media.displayOrder,
        type: "existing",
      })),
    )
  }, [productDetail, methods])
  const { getMediaDiff } = useMediaDiff()

  const onSubmitForm = async (data) => {
    const uploadMedia = editorRef.current?.getUploadMedia() ?? []

    const { activeImageIds, deleteImageIds } = getMediaDiff(data.description, uploadMedia)

    const formData = new FormData()

    const imageMetadata = []
    const newFiles = []

    images.forEach((image) => {
      if (image.type === "existing") {
        imageMetadata.push({
          type: "existing",
          id: Number(image.id),
        })

        return
      }

      const fileIndex = newFiles.length

      newFiles.push(image.file)

      imageMetadata.push({
        type: "new",
        fileIndex,
      })
    })

    formData.append(
      "data",
      JSON.stringify({
        ...data,
        images: imageMetadata,
        activeImageIds: activeImageIds.map(Number),
        deleteImageIds: deleteImageIds.map(Number),
      }),
    )

    newFiles.forEach((file) => {
      formData.append("files", file)
    })

    await onSubmit(formData)
  }

  return (
    <Form
      methods={methods}
      onSubmit={onSubmitForm}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <ProductImageUpload
          value={images}
          onChange={setImages}
        />

        <RHFTextField
          name="name"
          label="Tên bánh"
        />

        <AutocompleteField
          name="categoryIds"
          label="Thể loại"
          options={categoryOptions}
          multiple
        />

        <AutocompleteField
          name="themeIds"
          label="Chủ đề"
          options={themeOptions}
          multiple
        />

        <AutocompleteField
          name="layers"
          label="Số tầng"
          options={layers}
        />

        <AutocompleteField
          name="size"
          label="Size bánh"
          options={sizeCake}
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
          name="embeddingText"
          label="Từ khóa tìm kiếm"
        />
      </Box>

      <Button
        sx={{ mt: 2 }}
        variant="contained"
        type="submit"
        loading={methods.formState.isSubmitting}
        loadingIndicator="Loading…"
      >
        Cập nhật
      </Button>
    </Form>
  )
}

export default UpdateFormProduct
