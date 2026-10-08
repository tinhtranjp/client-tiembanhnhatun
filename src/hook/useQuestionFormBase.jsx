import { Controller } from "react-hook-form"
import CustomSelect from "@/components/input-common/CustomSelect"
import { levelOptionsIgnoreAll, modeCategoryOptions } from "@/helper/common"
import { useUnitGetByCateIdAndType } from "@/service/unit/queries"
import CkeditorCustom from "@/components/ckeditor/CkeditorCustom"

export function useQuestionFormBase({ control, watch }) {
  const watchCate = watch("category")
  const watchType = watch("lessonType")

  const { data: lessonList, isLoading: lessonLoading } = useUnitGetByCateIdAndType({
    categoryId: watchCate,
    type: watchType,
  })

  const CategoryField = (
    <Controller
      name="category"
      control={control}
      render={({ field }) => (
        <CustomSelect
          label="Level"
          value={field.value}
          onChange={field.onChange}
          options={levelOptionsIgnoreAll}
        />
      )}
    />
  )

  const TypeField = (
    <Controller
      name="lessonType"
      control={control}
      render={({ field }) => (
        <CustomSelect
          label="Kiểu"
          value={field.value}
          onChange={field.onChange}
          options={modeCategoryOptions}
        />
      )}
    />
  )

  const LessonField = lessonList && lessonList.length > 0 && (
    <Controller
      name="lessonId"
      control={control}
      render={({ field }) => (
        <CustomSelect
          label="Bài học"
          value={field.value}
          onChange={field.onChange}
          options={lessonList.map((l) => ({ value: l.id, label: l.name }))}
        />
      )}
    />
  )

  const ContentField = (
    <Controller
      name="content"
      control={control}
      render={({ field, fieldState }) => (
        <CkeditorCustom
          value={field.value}
          folder="question/content"
          onChange={(value) => field.onChange(value)}
          label="Câu hỏi"
          messError={fieldState?.error?.message}
        />
      )}
    />
  )

  const ExplanationField = (
    <Controller
      name="explanation"
      control={control}
      render={({ field, fieldState }) => (
        <CkeditorCustom
          value={field.value}
          folder="question/explanation"
          onChange={(value) => field.onChange(value)}
          label="Giải thích"
          messError={fieldState?.error?.message}
        />
      )}
    />
  )

  return {
    CategoryField,
    TypeField,
    LessonField,
    lessonLoading,
    ContentField,
    ExplanationField,
  }
}
