import { Box } from "@mui/material"

export default function HtmlRender({ htmlString, ...props }) {
  if (htmlString == "") return null
  return (
    <Box
      component={"div"}
      dangerouslySetInnerHTML={{ __html: htmlString }}
      {...props}
    />
  )
}
