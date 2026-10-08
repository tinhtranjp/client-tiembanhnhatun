export const ModeCategory = {
  VOCAB: 1,
  GRAMMAR: 2,
  KANJI: 3,
  QUIZ: 4,
}

export const modeCategoryOptions = [
  { label: "Từ vựng", value: 1 },
  { label: "Ngữ pháp", value: 2 },
  { label: "Kanji", value: 3 },
  { label: "Bài tập", value: 4 },
]

export const levelOptionsIgnoreAll = [
  { label: "N1", value: 1 },
  { label: "N2", value: 2 },
  { label: "N3", value: 3 },
  { label: "N4", value: 4 },
  { label: "N5", value: 5 },
]
export const levelOptions = [
  { label: "Tất cả", value: -1 },
  { label: "N1", value: 1 },
  { label: "N2", value: 2 },
  { label: "N3", value: 3 },
  { label: "N4", value: 4 },
  { label: "N5", value: 5 },
]

export const questionType = [
  { label: "Chọn đáp án", value: 1 },
  { label: "Viết", value: 2 },
  { label: "Sắp xếp", value: 3 },
  { label: "Điền trợ từ", value: 4 },
  { label: "Đọc văn & trả lời", value: 5 },
  { label: "Sắp xếp nhiều", value: 6 },
  { label: "Kaiwa", value: 7 },
  { label: "Dịch", value: 8 },
  { label: "Làm theo mẫu", value: 9 },
]

export const questionTypeText = [
  { label: "Chọn đáp án", value: "multiple_choice" },
  { label: "Làm theo mẫu", value: "mode" },
  { label: "Viết", value: "write" },
  { label: "Sắp xếp", value: "matching" },
  { label: "Điền trợ từ", value: "write_joshi" },
  { label: "Đọc văn & trả lời", value: "bun_1" },
  { label: "Sắp xếp nhiều", value: "multiple_matching" },
  { label: "Kaiwa", value: "kaiwa" },
  { label: "Dịch", value: "dich" },
]

export const countryCode = [
  { label: "Việt Nam", value: 1 },
  { label: "Nhật Bản", value: 2 },
  { label: "Khác", value: 3 },
]

export const renderCateType = (value) => {
  const mode = modeCategoryOptions.find((i) => i.value === value)
  return mode?.label
}

export const renderCountryType = (value) => {
  const mode = countryCode.find((i) => i.value === value)
  return mode?.label
}

export const isValidUrl = (fileURL) => {
  return typeof fileURL === "string" && fileURL.startsWith("http")
}
