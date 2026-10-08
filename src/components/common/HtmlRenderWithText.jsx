import { exampleWithText } from "@/helper/postApi"
import { Box } from "@mui/material"

function HtmlRenderWithText({ htmlString, text, ...props }) {
  if (text == "") return null
  return (
    <Box
      component={"div"}
      dangerouslySetInnerHTML={{ __html: exampleWithText(htmlString, text) }}
      {...props}
    />
  )
}
export default HtmlRenderWithText
