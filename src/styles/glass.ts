import { type ClassValue } from "clsx"
import { cn } from "@/lib/utils"

export type GlassVariant = "sm" | "md" | "lg"

const glassClasses: Record<GlassVariant, string> = {
  sm: "glass-sm",
  md: "glass",
  lg: "glass-lg",
}

export function glass(
  variant: GlassVariant = "md",
  extraClasses?: ClassValue,
) {
  return cn(glassClasses[variant], extraClasses)
}

export const glassStyles: Record<GlassVariant, React.CSSProperties> = {
  sm: {
    background: "var(--color-glass)",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    border: "1px solid var(--color-glass-border)",
  },
  md: {
    background: "var(--color-glass)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid var(--color-glass-border)",
  },
  lg: {
    background: "var(--color-glass)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "1px solid var(--color-glass-border)",
  },
}
