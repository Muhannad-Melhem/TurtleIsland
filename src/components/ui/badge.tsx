import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import type { Variant } from "@/types"

type BadgeVariant = Variant | "success" | "warning" | "danger" | "info"

type BadgeSize = "sm" | "md" | "lg"

type BadgeProps = {
  variant?: BadgeVariant
  size?: BadgeSize
  dot?: boolean
} & React.HTMLAttributes<HTMLSpanElement>

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-primary/15 text-primary",
  secondary: "bg-secondary/15 text-secondary-foreground",
  accent: "bg-accent/15 text-accent-foreground",
  outline: "border border-border text-muted-foreground",
  ghost: "bg-muted text-muted-foreground",
  glass: "glass text-foreground",
  success: "bg-success/20 text-success-foreground",
  warning: "bg-warning/20 text-warning-foreground",
  danger: "bg-danger/20 text-danger-foreground",
  info: "bg-info/20 text-info-foreground",
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: "h-5 px-2 text-[11px] gap-1",
  md: "h-6 px-2.5 text-[12px] gap-1.5",
  lg: "h-7 px-3 text-[13px] gap-1.5",
}

const dotColors: Record<BadgeVariant, string> = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  outline: "bg-muted-foreground",
  ghost: "bg-muted-foreground",
  glass: "bg-foreground",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "primary", size = "md", dot, className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full font-medium whitespace-nowrap",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {dot && (
          <span className={cn("h-1.5 w-1.5 rounded-full", dotColors[variant])} />
        )}
        {children}
      </span>
    )
  },
)

Badge.displayName = "Badge"

export { Badge, type BadgeProps }
