import { cn } from "@/lib/utils"
import { glass } from "@/styles/glass"

type FloatingPanelProps = {
  children: React.ReactNode
  className?: string
  offset?: "top" | "bottom" | "left" | "right"
}

const offsetStyles = {
  top: "-translate-y-2",
  bottom: "translate-y-2",
  left: "-translate-x-2",
  right: "translate-x-2",
}

function FloatingPanel({
  children,
  className,
  offset = "top",
}: FloatingPanelProps) {
  return (
    <div
      className={cn(
        glass("lg"),
        "rounded-2xl p-6 shadow-floating",
        offsetStyles[offset],
        className,
      )}
    >
      {children}
    </div>
  )
}

export { FloatingPanel }
