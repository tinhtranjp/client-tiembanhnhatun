export const typeVocabOptions = [
  { id: 0, value: "Chưa xác định", alias: "Chưa xác định", ja: "", sub: "" },
  { id: 1, value: "Danh từ", alias: "N", ja: "名詞", sub: "めいし" },
  {
    id: 2,
    value: "Tính từ đuôi い",
    alias: "A・い",
    ja: "イ・形容詞",
    sub: "い・けいようし",
  },
  {
    id: 3,
    value: "Tính từ đuôi な",
    alias: "A・な",
    ja: "ナ・形容詞",
    sub: "な・けいようし",
  },
  {
    id: 4,
    value: "Động từ nhóm I",
    alias: "V (I)",
    ja: "動詞 グループ１",
    sub: "（どうし）グループ１",
  },
  {
    id: 5,
    value: "Động từ nhóm II",
    alias: "V (II)",
    ja: "動詞 グループ２",
    sub: "（どうし）グループ２",
  },
  {
    id: 6,
    value: "Động từ nhóm III",
    alias: "V (III)",
    ja: "動詞 グループ３",
    sub: "（どうし）グループ３",
  },
  {
    id: 7,
    value: "Danh động từ",
    alias: "N ／ N + する",
    ja: "動名詞",
    sub: "どうめいし",
  },

  { id: 8, value: "Hậu tố", alias: "H", ja: "接尾語", sub: "せつびご" },
  { id: 9, value: "Tiền tố", alias: "T", ja: "接頭語", sub: "せっとうご" },
  { id: 10, value: "Cụm câu", alias: "C", ja: "句", sub: "く" },
  { id: 11, value: "Phó từ", alias: "P", ja: "副詞", sub: "ふくし" },
  { id: 12, value: "Liên từ", alias: "L", ja: "接続詞", sub: "せつぞくし" },
  { id: 13, value: "Từ nối", alias: "TN", ja: "助詞", sub: "じょし" },
  {
    id: 14,
    value: "Danh từ, Aな",
    alias: "N-Aな",
    ja: "名詞 - な・形容詞",
    sub: "",
  },
]

export const actionType = [
  { id: 0, value: "Không chọn", alias: "---" },
  { id: 1, value: "Tha động từ　（他）", alias: "他" },
  { id: 2, value: "Tự động từ　（自）", alias: "自" },
  { id: 3, value: "Tự động từ　（自）và Tha động từ　（他）", alias: "自 & 他" },
]

export const getAliasTypeFromVocab = (type) => {
  const item = typeVocabOptions.find((item) => item.value.toLocaleLowerCase() === type.toLocaleLowerCase())
  return item?.alias ? item.alias : ""
}

export const level = ["N5", "N4", "N3", "N2", "N1"]

export const resetExample = (html) => {
  const tempDiv = document.createElement("div")
  tempDiv.innerHTML = html

  const rubyElements = tempDiv.querySelectorAll("ruby")

  rubyElements.forEach((ruby) => {
    const surfaceContent = Array.from(ruby.childNodes)
      .filter((node) => node.nodeName !== "RT")
      .map((node) => node.textContent)
      .join("")

    ruby.replaceWith(surfaceContent)
  })

  return tempDiv.textContent || ""
}

export const hiddenTagRtByExample = (html) => {
  const tempDiv = document.createElement("div")
  tempDiv.innerHTML = html

  const rubyElements = tempDiv.querySelectorAll("ruby")

  rubyElements.forEach((ruby) => {
    const rtElements = ruby.querySelectorAll("rt")
    rtElements.forEach((rt) => {
      rt.style.visibility = "hidden"
      rt.style.marginTop = "24px"
      rt.style.marginBottom = "10px"
      rt.style.fontSize = "12px"
    })
  })

  return tempDiv.innerHTML
}

export const displayTagQuestion = (html) => {
  const tempDiv = document.createElement("div")
  tempDiv.innerHTML = html

  const rubyElements = tempDiv.querySelectorAll("ruby")

  rubyElements.forEach((ruby) => {
    const rtElements = ruby.querySelectorAll("rt")
    rtElements.forEach((rt) => {
      rt.style.visibility = "visible"
      rt.style.marginBottom = "5px"
      rt.style.fontSize = "10px"
    })
  })

  return tempDiv.innerHTML
}

export const displayTagQuestionJoshi = (html) => {
  const tempDiv = document.createElement("div")
  tempDiv.innerHTML = html

  const rubyElements = tempDiv.querySelectorAll("ruby")

  rubyElements.forEach((ruby) => {
    const rtElements = ruby.querySelectorAll("rt")
    rtElements.forEach((rt) => {
      rt.style.visibility = "visible"
      rt.style.marginBottom = "5px"
      rt.style.marginTop = "15px"
      rt.style.fontSize = "10px"
    })
  })

  return tempDiv.innerHTML
}

export const displayTagRtByExample = (html) => {
  const tempDiv = document.createElement("div")
  tempDiv.innerHTML = html

  const rubyElements = tempDiv.querySelectorAll("ruby")

  rubyElements.forEach((ruby) => {
    const rtElements = ruby.querySelectorAll("rt")
    rtElements.forEach((rt) => {
      rt.style.visibility = "visible"
      rt.style.marginTop = "24px"
      rt.style.marginBottom = "10px"
      rt.style.fontSize = "12px"
    })
  })

  return tempDiv.innerHTML
}

export const displayTagRtVocabDetail = (html) => {
  const tempDiv = document.createElement("div")
  tempDiv.innerHTML = html

  const rubyElements = tempDiv.querySelectorAll("ruby")
  const marks = tempDiv.querySelectorAll("mark")

  rubyElements.forEach((ruby) => {
    const rtElements = ruby.querySelectorAll("rt")
    rtElements.forEach((rt) => {
      rt.style.visibility = "visible"
      rt.style.marginTop = "24px"
      rt.style.marginBottom = "4px"
      rt.style.fontSize = "12px"
    })

    marks.forEach((m) => {
      m.style.color = "white"
      m.style.borderRadius = "6px"
      m.style.fontSize = "14px"
      m.style.padding = "4px"
    })
  })

  return tempDiv.innerHTML
}

export const removeRubyAndRt = (html) => {
  const tempDiv = document.createElement("div")
  tempDiv.innerHTML = html

  const rubyElements = tempDiv.querySelectorAll("ruby")

  rubyElements.forEach((ruby) => {
    const surfaceContent = Array.from(ruby.childNodes)
      .filter((node) => node.nodeName !== "RT")
      .map((node) => node.textContent)
      .join("")

    const textNode = document.createTextNode(surfaceContent)
    if (ruby.parentNode) {
      ruby.parentNode.replaceChild(textNode, ruby)
    }
  })

  return tempDiv.innerHTML
}

export const cleanHtmlBeforeSubmit = (html) => {
  if (!html) return ""
  const div = document.createElement("div")
  div.innerHTML = html

  div.querySelectorAll("[contenteditable]").forEach((el) => {
    el.removeAttribute("contenteditable")
  })

  div.querySelectorAll(".editable-rt").forEach((el) => {
    el.classList.remove("editable-rt")
  })

  div.querySelectorAll("[class]").forEach((el) => {
    if (!el.className.trim()) {
      el.removeAttribute("class")
    }
  })

  return div.innerHTML
}

export const enhanceHtml = (html) => {
  if (!html) return ""
  const div = document.createElement("div")
  div.innerHTML = html

  div.querySelectorAll("rt").forEach((rt) => {
    rt.setAttribute("contentEditable", "true")
    rt.classList.add("editable-rt")
  })

  return div.innerHTML
}

export const renderKanOn = (text) => {
  return (
    text
      .split(" ")
      .map((i) => i.charAt(0).toUpperCase() + i.slice(1).toLowerCase())
      .join(" ") || ""
  )
}

export const renderVocabType = (value) => {
  const type = typeVocabOptions.find((i) => i.id === value)
  return type?.alias
}

export const exampleWithText = (htmlString, text) => {
  return htmlString.replace(/^<p>/, `<p>${text} `)
}

export const firstTextToUpper = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export const isCallPostApiValue = (text) => {
  return text !== "" && text !== `<p></p>` && text !== undefined
}

export const renderOptionName = (index) => {
  switch (index) {
    case 0:
      return "A"
    case 1:
      return "B"
    case 2:
      return "C"
    case 3:
      return "D"
    default:
      break
  }
}
