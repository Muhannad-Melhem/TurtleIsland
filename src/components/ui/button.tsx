"use client"

import { forwardRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "outline"
  | "ghost"
  | "glass"

type ButtonSize = "sm" | "md" | "lg" | "xl"

type ButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
  loading?: boolean
  icon?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-button hover:brightness-110 active:brightness-95",
  secondary:
    "bg-secondary text-secondary-foreground shadow-button hover:brightness-110 active:brightness-95",
  accent:
    "bg-accent text-accent-foreground shadow-button hover:brightness-110 active:brightness-95",
  outline:
    "border border-border bg-transparent hover:bg-muted active:bg-muted/80",
  ghost: "bg-transparent hover:bg-muted active:bg-muted/80",
  glass:
    "glass text-foreground shadow-glass hover:bg-white/30 dark:hover:bg-white/10",
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-[13px] gap-1.5",
  md: "h-10 px-4 text-[14px] gap-2",
  lg: "h-12 px-5 text-[15px] gap-2.5",
  xl: "h-14 px-6 text-[16px] gap-3",
}

const iconSizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 w-8 p-0",
  md: "h-10 w-10 p-0",
  lg: "h-12 w-12 p-0",
  xl: "h-14 w-14 p-0",
}

const iconSizes: Record<ButtonSize, number> = {
  sm: 16,
  md: 18,
  lg: 20,
  xl: 22,
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      asChild = false,
      loading = false,
      icon = false,
      className,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200",
          "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "select-none will-change-transform",
          variantStyles[variant],
          icon ? iconSizeStyles[size] : sizeStyles[size],
          className,
        )}
        {...props}
      >
        {loading ? (
          <Loader2 size={iconSizes[size]} className="animate-spin" />
        ) : (
          children
        )}
      </Comp>
    )
  },
)

Button.displayName = "Button"

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize }
