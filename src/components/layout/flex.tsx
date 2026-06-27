import { cn } from "@/lib/utils"

type FlexProps = {
  children: React.ReactNode
  className?: string
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
  align?: "start" | "center" | "end" | "stretch" | "baseline"
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly"
  wrap?: boolean
  direction?: "row" | "col"
  as?: "div" | "section" | "article" | "aside" | "main" | "nav"
}

const alignMap = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
} as const

const justifyMap = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
} as const

const gapMap = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
} as const

function Flex({
  children,
  className,
  gap = 4,
  align = "start",
  justify = "start",
  wrap = false,
  direction = "row",
  as: Tag = "div",
}: FlexProps) {
  return (
    <Tag
      className={cn(
        "flex",
        direction === "col" && "flex-col",
        alignMap[align],
        justifyMap[justify],
        gapMap[gap],
        wrap && "flex-wrap",
        className,
      )}
    >
      {children}
    </Tag>
  )
}

export { Flex }
