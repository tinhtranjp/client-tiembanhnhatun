import React from "react"
import JpText from "./JpText"
import { Stack } from "@mui/material"
import { parseHtmlWithExamples } from "@/helper/parseHtmlWithExamples"
import MeaningText from "./MeaningText"
import "@/components/ckeditor/ckeditor-content.css"

export default function HtmlContent({ html }) {
  const nodes = parseHtmlWithExamples(html)

  return (
    <Stack spacing={1}>
      {nodes.map((node, idx) =>
        node.isExample ? (
          <React.Fragment key={idx}>
            <JpText html={node.html} />
            {node.meaningHtml && <MeaningText html={node.meaningHtml} />}
          </React.Fragment>
        ) : (
          <div
            key={idx}
            className="normal-html"
            dangerouslySetInnerHTML={{ __html: node.html }}
          />
        ),
      )}
    </Stack>
  )
}
