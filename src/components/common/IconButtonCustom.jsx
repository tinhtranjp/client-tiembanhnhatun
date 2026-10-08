import { IconButton } from "@mui/material"

function IconButtonCustom({ onClick, Icon }) {
  return (
    <IconButton
      sx={{
        color: "#555", // màu mặc định
        transition: "color 0.2s ease",
        "&:hover": {
          color: "primary.main", // đổi màu khi hover
        },
      }}
      onClick={onClick}
    >
      <Icon />
    </IconButton>
  )
}

export default IconButtonCustom
