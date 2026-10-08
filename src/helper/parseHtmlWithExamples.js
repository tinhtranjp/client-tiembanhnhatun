export const parseHtmlWithExamples = (html) => {
  if (!html) return []

  const container = document.createElement("div")
  container.innerHTML = html

  const nodes = []

  container.childNodes.forEach((child) => {
    if (child.nodeType === 1) {
      const el = child
      const isExample = el.classList.contains("jp-examples")

      let meaningHtml = ""
      if (isExample) {
        const meaningEl = el.querySelector(".jp-meaning")
        if (meaningEl) {
          meaningHtml = meaningEl.outerHTML
          meaningEl.remove() // loại bỏ khỏi HTML gốc
        }
      }

      nodes.push({
        html: el.outerHTML,
        isExample,
        meaningHtml,
      })
    } else if (child.nodeType === 3) {
      nodes.push({
        html: child.textContent || "",
        isExample: false,
        meaningHtml: "",
      })
    }
  })

  return nodes
}
