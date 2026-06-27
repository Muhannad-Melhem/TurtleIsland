import { cn } from "@/lib/utils"
import { Sparkles } from "lucide-react"

type SparkleDecorationProps = {
  className?: string
  size?: number
  color?: string
}

function SparkleDecoration({
  className,
  size = 16,
  color,
}: SparkleDecorationProps) {
  return (
    <span
      className={cn("inline-flex animate-sparkle", className)}
      aria-hidden
    >
      <Sparkles
        size={size}
        className={color || "text-soft-yellow"}
      />
    </span>
  )
}

export { SparkleDecoration }
