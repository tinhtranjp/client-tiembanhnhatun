import { tv } from "tailwind-variants"

export const titleBg = tv({
  base: "p-4 bg-green-300 !text-[#222] rounded-sm !font-medium !text-2xl",
  variants: {
    darkBg: {
      true: "bg-[#282c34] text-[#d0d2d6]",
    },
  },
  defaultVariants: {
    darkBg: false,
  },
})

export const title = tv({
  base: "text-xl lg:text-2xl font-medium",
})

export const lessonTitle = tv({
  base: "text-2xl font-medium text-[#333]",
})

export const hrBlock = tv({
  base: "my-16 lg:my-20",
})
