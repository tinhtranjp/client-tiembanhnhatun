import { Box, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

function HeaderForm({
  url,
  title,
  marginTop = 0,
  marginBottom = 4,
  isBack = false,
  btnSize = "medium",
  titleColor = "#222",
  sx,
  showBack = true,
}) {
  const navigate = useNavigate()
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop,
        marginBottom,
        ...sx,
      }}
    >
      <Typography
        variant="h5"
        color={titleColor}
      >
        {title}
      </Typography>
      {showBack && (
        <Button
          variant="contained"
          size={btnSize}
          onClick={() => {
            if (isBack) {
              navigate(-1)
            } else {
              navigate(url)
            }
          }}
        >
          Quay lại
        </Button>
      )}
    </Box>
  )
}

export default HeaderForm
