import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

type IconSize = "sm" | "md" | "lg" | "xl" | "2xl"

type IconWrapperProps = {
  icon: LucideIcon
  size?: IconSize
  className?: string
  animated?: boolean
  color?: string
}

const sizeMap: Record<IconSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  "2xl": 40,
}

const IconWrapper = forwardRef<SVGSVGElement, IconWrapperProps>(
  ({ icon: Icon, size = "md", className, animated, ...props }, ref) => {
    return (
      <Icon
        ref={ref}
        size={sizeMap[size]}
        className={cn(
          "flex-shrink-0",
          animated && "animate-float",
          className,
        )}
        {...props}
      />
    )
  },
)

IconWrapper.displayName = "IconWrapper"

export { IconWrapper, type IconWrapperProps, type IconSize }
