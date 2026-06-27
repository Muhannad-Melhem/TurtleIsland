"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

type ChipProps = {
  label: string
  onRemove?: () => void
  variant?: "primary" | "secondary" | "accent" | "muted"
  size?: "sm" | "md"
  className?: string
}

const variantStyles = {
  primary: "bg-primary/15 text-primary border-primary/20",
  secondary: "bg-secondary/15 text-secondary-foreground border-secondary/20",
  accent: "bg-accent/15 text-accent-foreground border-accent/20",
  muted: "bg-muted text-muted-foreground border-border",
}

const sizeStyles = {
  sm: "h-6 px-2 text-[11px] gap-1",
  md: "h-7 px-2.5 text-[12px] gap-1.5",
}

const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  ({ label, onRemove, variant = "primary", size = "md", className }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border font-medium whitespace-nowrap",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
      >
        {label}
        {onRemove && (
          <button
            onClick={onRemove}
            className="ml-0.5 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            aria-label={`Remove ${label}`}
          >
            <X size={size === "sm" ? 10 : 12} />
          </button>
        )}
      </span>
    )
  },
)

Chip.displayName = "Chip"

export { Chip }
