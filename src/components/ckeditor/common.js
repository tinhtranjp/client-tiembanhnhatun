export const headings = {
  options: [
    { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
    { model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
    { model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
    { model: "heading3", view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
    { model: "heading4", view: "h4", title: "Heading 4", class: "ck-heading_heading4" },
  ],
}

export const styles = {
  definitions: [
    // Text styles
    {
      name: "Post Api",
      element: "span",
      classes: ["post-yahoo"],
    },
    {
      name: "Example meaning",
      element: "span",
      classes: ["jp-meaning"],
    },
    {
      name: "関",
      element: "span",
      classes: ["post_kan"],
    },
    {
      name: "連",
      element: "span",
      classes: ["post_ren"],
    },
    {
      name: "合",
      element: "span",
      classes: ["post_go"],
    },
    {
      name: "類",
      element: "span",
      classes: ["post_rui"],
    },
    {
      name: "対",
      element: "span",
      classes: ["post_tai"],
    },
    // {
    //   name: "Text đỏ",
    //   element: "span",
    //   classes: ["text-red"],
    // },
    // {
    //   name: "Text xanh",
    //   element: "span",
    //   classes: ["text-blue"],
    // },
    // {
    //   name: "Text vàng highlight",
    //   element: "span",
    //   classes: ["text-highlight", "bg-yellow"],
    // },
    // {
    //   name: "Text in đậm custom",
    //   element: "span",
    //   classes: ["font-bold", "text-dark"],
    // },

    // Paragraph styles
    // {
    //   name: "Đoạn văn nổi bật",
    //   element: "p",
    //   classes: ["lead-text", "mb-4"],
    // },
    // {
    //   name: "Đoạn văn nhỏ",
    //   element: "p",
    //   classes: ["small-text", "text-muted"],
    // },
    // {
    //   name: "Đoạn văn trung tâm",
    //   element: "p",
    //   classes: ["text-center", "py-3"],
    // },
    // {
    //   name: "Quote đặc biệt",
    //   element: "p",
    //   classes: ["quote-special", "border-left", "pl-4"],
    // },

    // Div containers
    {
      name: "Box Example",
      element: "p",
      classes: ["jp-examples"],
    },
    {
      name: "Box Info",
      element: "p",
      classes: ["jp-info"],
    },
    {
      name: "Box Note",
      element: "p",
      classes: ["jp-note"],
    },
    {
      name: "Ví dụ",
      element: "p",
      classes: ["jp-exp"],
    },
    // {
    //   name: "Box cảnh báo",
    //   element: "p",
    //   classes: ["alert", "alert-warning", "p-3"],
    // },
    // {
    //   name: "Box thông tin",
    //   element: "p",
    //   classes: ["info-box", "border", "p-4", "rounded"],
    // },
    // {
    //   name: "Box thành công",
    //   element: "p",
    //   classes: ["success-box", "bg-green-light", "p-3"],
    // },
  ],
}

export const colors = [
  // RED
  "#fef2f2",
  "#fee2e2",
  "#fecaca",
  "#fca5a5",
  "#f87171",
  "#ef4444",
  "#dc2626",
  "#b91c1c",
  "#991b1b",
  "#7f1d1d",

  // ORANGE
  "#fff7ed",
  "#ffedd5",
  "#fed7aa",
  "#fdba74",
  "#fb923c",
  "#f97316",
  "#ea580c",
  "#c2410c",
  "#9a3412",
  "#7c2d12",

  // AMBER
  "#fffbeb",
  "#fef3c7",
  "#fde68a",
  "#fcd34d",
  "#fbbf24",
  "#f59e0b",
  "#d97706",
  "#b45309",
  "#92400e",
  "#78350f",

  // YELLOW
  "#fefce8",
  "#fef9c3",
  "#fef08a",
  "#fde047",
  "#facc15",
  "#eab308",
  "#ca8a04",
  "#a16207",
  "#854d0e",
  "#713f12",

  // LIME
  "#f7fee7",
  "#ecfccb",
  "#d9f99d",
  "#bef264",
  "#a3e635",
  "#84cc16",
  "#65a30d",
  "#4d7c0f",
  "#3f6212",
  "#365314",

  // GREEN
  "#f0fdf4",
  "#dcfce7",
  "#bbf7d0",
  "#86efac",
  "#4ade80",
  "#22c55e",
  "#16a34a",
  "#15803d",
  "#166534",
  "#14532d",

  // EMERALD
  "#ecfdf5",
  "#d1fae5",
  "#a7f3d0",
  "#6ee7b7",
  "#34d399",
  "#10b981",
  "#059669",
  "#047857",
  "#065f46",
  "#064e3b",

  // TEAL
  "#f0fdfa",
  "#ccfbf1",
  "#99f6e4",
  "#5eead4",
  "#2dd4bf",
  "#14b8a6",
  "#0d9488",
  "#0f766e",
  "#115e59",
  "#134e4a",

  // CYAN
  "#ecfeff",
  "#cffafe",
  "#a5f3fc",
  "#67e8f9",
  "#22d3ee",
  "#06b6d4",
  "#0891b2",
  "#0e7490",
  "#155e75",
  "#164e63",

  // SKY
  "#f0f9ff",
  "#e0f2fe",
  "#bae6fd",
  "#7dd3fc",
  "#38bdf8",
  "#0ea5e9",
  "#0284c7",
  "#0369a1",
  "#075985",
  "#0c4a6e",

  // BLUE
  "#eff6ff",
  "#dbeafe",
  "#bfdbfe",
  "#93c5fd",
  "#60a5fa",
  "#3b82f6",
  "#2563eb",
  "#1d4ed8",
  "#1e40af",
  "#1e3a8a",

  // INDIGO
  "#eef2ff",
  "#e0e7ff",
  "#c7d2fe",
  "#a5b4fc",
  "#818cf8",
  "#6366f1",
  "#4f46e5",
  "#4338ca",
  "#3730a3",
  "#312e81",

  // VIOLET
  "#f5f3ff",
  "#ede9fe",
  "#ddd6fe",
  "#c4b5fd",
  "#a78bfa",
  "#8b5cf6",
  "#7c3aed",
  "#6d28d9",
  "#5b21b6",
  "#4c1d95",

  // PURPLE
  "#faf5ff",
  "#f3e8ff",
  "#e9d5ff",
  "#d8b4fe",
  "#c084fc",
  "#a855f7",
  "#9333ea",
  "#7e22ce",
  "#6b21a8",
  "#581c87",

  // FUCHSIA
  "#fdf4ff",
  "#fae8ff",
  "#f5d0fe",
  "#f0abfc",
  "#e879f9",
  "#d946ef",
  "#c026d3",
  "#a21caf",
  "#86198f",
  "#701a75",

  // PINK
  "#fdf2f8",
  "#fce7f3",
  "#fbcfe8",
  "#f9a8d4",
  "#f472b6",
  "#ec4899",
  "#db2777",
  "#be185d",
  "#9d174d",
  "#831843",

  // ROSE
  "#fff1f2",
  "#ffe4e6",
  "#fecdd3",
  "#fda4af",
  "#fb7185",
  "#f43f5e",
  "#e11d48",
  "#be123c",
  "#9f1239",
  "#881337",

  // SLATE
  "#f8fafc",
  "#f1f5f9",
  "#e2e8f0",
  "#cbd5e1",
  "#94a3b8",
  "#64748b",
  "#475569",
  "#334155",
  "#1e293b",
  "#0f172a",

  // GRAY
  "#f9fafb",
  "#f3f4f6",
  "#e5e7eb",
  "#d1d5db",
  "#9ca3af",
  "#6b7280",
  "#4b5563",
  "#374151",
  "#1f2937",
  "#111827",

  // ZINC
  "#fafafa",
  "#f4f4f5",
  "#e4e4e7",
  "#d4d4d8",
  "#a1a1aa",
  "#71717a",
  "#52525b",
  "#3f3f46",
  "#27272a",
  "#18181b",

  // NEUTRAL
  "#fafafa",
  "#f5f5f5",
  "#e5e5e5",
  "#d4d4d4",
  "#a3a3a3",
  "#737373",
  "#525252",
  "#404040",
  "#262626",
  "#171717",

  // STONE
  "#fafaf9",
  "#f5f5f4",
  "#e7e5e4",
  "#d6d3d1",
  "#a8a29e",
  "#78716c",
  "#57534e",
  "#44403c",
  "#292524",
  "#1c1917",

  // BLACK White
  "#000000",
  "#ffffff",
]
