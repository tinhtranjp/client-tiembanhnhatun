import { useTheme, useMediaQuery } from "@mui/material"

export function useBreakpoints() {
  const theme = useTheme()

  const xs = useMediaQuery(theme.breakpoints.only("xs"))
  const sm = useMediaQuery(theme.breakpoints.only("sm"))
  const md = useMediaQuery(theme.breakpoints.only("md"))
  const lg = useMediaQuery(theme.breakpoints.only("lg"))
  const xl = useMediaQuery(theme.breakpoints.only("xl"))

  return { xs, sm, md, lg, xl }
}
