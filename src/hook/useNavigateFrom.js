import { useLocation, useNavigate } from "react-router-dom"

export function useNavigateForm() {
  const navigate = useNavigate()
  const location = useLocation()

  return (to) => {
    navigate(to, {
      state: {
        from: location.pathname + location.search,
      },
    })
  }
}
