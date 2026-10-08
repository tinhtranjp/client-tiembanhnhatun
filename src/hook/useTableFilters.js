import { useSearchParams } from "react-router-dom"
import useSearchParamsFilters from "./useSearchParamsFilters"
import { useEffect, useState } from "react"
import { useBreakpoints } from "./useBreakpoints"

export const useTableFilters = () => {
  const [searchParams] = useSearchParams()
  const { updateParams, getParam } = useSearchParamsFilters()
  const { lg } = useBreakpoints()

  // Default value
  const keyword = getParam("keyword") ?? ""
  const rawLessonId = getParam("lessonId") ?? "-1"
  const rawLevelId = getParam("levelId") ?? "-1"
  const rawPage = getParam("page") ?? "0"
  const rawLimit = getParam("limit") ?? (lg ? "8" : "5")
  const sort = getParam("sort") ?? "id-desc"
  const rawType = getParam("type") ?? "-1"

  const lessonId = parseInt(rawLessonId)
  const levelId = parseInt(rawLevelId)
  const page = parseInt(rawPage)
  const limit = parseInt(rawLimit)
  const type = parseInt(rawType)

  const [order, setOrder] = useState(sort.split("-")[1] || "desc")
  const [orderBy, setOrderBy] = useState(sort.split("-")[0] || "id")
  const [selected, setSelected] = useState([])

  // Set default params
  useEffect(() => {
    if (!searchParams.has("page") || !searchParams.has("limit")) {
      updateParams({ page: "0", limit: lg ? "8" : "5" })
    }
  }, [])

  // Handlers
  const handleChangeKeyword = (value) => updateParams({ keyword: value })
  const handleChangeLevelId = (value) => updateParams({ levelId: value, lessonId: -1, type: -1 })
  const handleChangeLessonId = (value) => updateParams({ lessonId: value, page: 0 })
  const handleChangePage = (_, newPage) => updateParams({ page: newPage })
  const handleChangeRowsPerPage = (e) => updateParams({ page: 0, limit: parseInt(e.target.value, 10) })
  const handleChangeType = (value) => updateParams({ type: value, page: 0 })

  const handleRequestSort = (_, property) => {
    const isAsc = orderBy === property && order === "asc"
    const sortValue = isAsc ? "desc" : "asc"
    setOrder(sortValue)
    setOrderBy(property)
    updateParams({ sort: `${property}-${sortValue}`, page: 0 })
  }

  const handleSelectAllClick = (event, rows) => {
    if (event.target.checked) {
      setSelected(rows.map((n) => n.id))
    } else {
      setSelected([])
    }
  }

  const handleClick = (id) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]))
  }
  return {
    keyword,
    levelId,
    lessonId,
    page,
    limit,
    sort,
    order,
    type,
    orderBy,
    selected,
    handleChangeKeyword,
    handleChangePage,
    handleChangeLevelId,
    handleChangeLessonId,
    handleChangeRowsPerPage,
    handleRequestSort,
    handleSelectAllClick,
    handleClick,
    setSelected,
    handleChangeType,
  }
}
