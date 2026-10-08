import { Box } from "@mui/material"

export default function TableImage({ src, alt, width = 100, height = 100 }) {
  return src ? (
    <Box
      component="img"
      src={src}
      alt={alt}
      onError={(e) => {
        e.currentTarget.onerror = null
        e.currentTarget.src = "/no_image.jpeg"
      }}
      sx={{
        width,
        height,
        borderRadius: 2,
        objectFit: "cover",
        boxShadow: 3,
      }}
    />
  ) : (
    <Box
      component="img"
      src="/no_image.jpeg"
      alt={alt}
      sx={{
        width,
        height,
        borderRadius: 2,
        objectFit: "cover",
        boxShadow: 3,
      }}
    />
  )
}
