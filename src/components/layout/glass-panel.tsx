import { cn } from "@/lib/utils"
import { glass } from "@/styles/glass"
import type { GlassVariant } from "@/styles/glass"

type GlassPanelProps = {
  children: React.ReactNode
  className?: string
  blur?: GlassVariant
  as?: "div" | "section" | "article" | "aside"
}

function GlassPanel({
  children,
  className,
  blur = "md",
  as: Tag = "div",
}: GlassPanelProps) {
  return (
    <Tag className={cn(glass(blur), "rounded-2xl p-6", className)}>
      {children}
    </Tag>
  )
}

export { GlassPanel }
