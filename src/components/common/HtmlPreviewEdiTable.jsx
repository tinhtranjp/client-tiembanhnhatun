import React, { forwardRef } from "react"
import "@/assets/styles/HtmlPreviewEdiTable.css"

const HtmlPreviewEdiTable = forwardRef(({ title, content, ...props }, ref) => {
  return (
    <div>
      {title && <p className="font-medium mb-1">{title}:</p>}
      <div
        ref={ref}
        {...props}
        style={{
          padding: "16px",
          marginBottom: "16px",
          marginTop: "16px",
          border: "1px solid #333",
          fontSize: "18px",
          borderRadius: "10px",
        }}
        className="html-preview"
        dangerouslySetInnerHTML={{ __html: content || "" }}
      />
    </div>
  )
})

export default HtmlPreviewEdiTable
