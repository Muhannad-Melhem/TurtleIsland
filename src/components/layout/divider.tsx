import { cn } from "@/lib/utils"

type DividerProps = {
  className?: string
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
}

function Divider({
  className,
  orientation = "horizontal",
  decorative = true,
}: DividerProps) {
  return (
    <hr
      role={decorative ? "presentation" : "separator"}
      aria-orientation={orientation}
      className={cn(
        "border-border",
        orientation === "horizontal" ? "w-full border-t" : "h-full border-l",
        className,
      )}
    />
  )
}

export { Divider }
