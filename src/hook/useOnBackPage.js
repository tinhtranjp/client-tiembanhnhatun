import { useLocation, useNavigate } from "react-router-dom"

export default function useOnBackPage(fallback) {
  const navigate = useNavigate()
  const location = useLocation()

  const onBackPage = () => {
    navigate(location.state?.from ?? fallback)
  }

  return onBackPage
}
