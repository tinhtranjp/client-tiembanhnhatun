import { useSearchParams } from "react-router-dom"

function useSearchParamsFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const updateParams = (newParams) => {
    setSearchParams(
      (prev) => {
        const current = Object.fromEntries(prev.entries())
        return { ...current, ...newParams }
      },
      { replace: true },
    )
  }

  const setOrRemoveParam = (key, value) => {
    setSearchParams(
      (prev) => {
        const newParams = Object.fromEntries(prev.entries())

        if (key !== "page") {
          newParams.page = "0"
        }

        if (value == null || value === "") {
          delete newParams[key]
        } else {
          newParams[key] = String(value)
        }

        return newParams
      },
      { replace: true },
    )
  }

  const getParam = (key) => searchParams.get(key)
  const getAllParams = () => Object.fromEntries(searchParams.entries())

  return {
    searchParams,
    getParam,
    getAllParams,
    setOrRemoveParam,
    updateParams,
  }
}

export default useSearchParamsFilters
