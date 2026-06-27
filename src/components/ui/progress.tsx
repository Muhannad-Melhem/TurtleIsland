"use client"

import { Root, Indicator } from "@radix-ui/react-progress"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

type ProgressProps = React.ComponentPropsWithoutRef<typeof Root> & {
  value?: number
  variant?: "default" | "success" | "warning" | "danger"
}

const indicatorColors = {
  default: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
}

const Progress = forwardRef<React.ElementRef<typeof Root>, ProgressProps>(
  ({ className, value = 0, variant = "default", ...props }, ref) => {
    return (
      <Root
        ref={ref}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-muted",
          className,
        )}
        {...props}
      >
        <Indicator
          className={cn(
            "h-full w-full flex-1 rounded-full transition-all duration-500 ease-out",
            indicatorColors[variant],
          )}
          style={{ transform: `translateX(-${100 - value}%)` }}
        />
      </Root>
    )
  },
)

Progress.displayName = "Progress"

export { Progress }
