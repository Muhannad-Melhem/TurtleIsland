"use client"

import { Root, Track, Range, Thumb } from "@radix-ui/react-slider"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

type SliderProps = React.ComponentPropsWithoutRef<typeof Root>

const Slider = forwardRef<React.ElementRef<typeof Root>, SliderProps>(
  ({ className, ...props }, ref) => {
    return (
      <Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className,
        )}
        {...props}
      >
        <Track className="relative h-2 w-full grow rounded-full bg-muted">
          <Range className="absolute h-full rounded-full bg-primary" />
        </Track>
        <Thumb
          className={cn(
            "block h-5 w-5 rounded-full bg-white shadow-medium",
            "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
            "transition-transform duration-150 hover:scale-110",
            "disabled:pointer-events-none disabled:opacity-50",
          )}
        />
      </Root>
    )
  },
)

Slider.displayName = "Slider"

export { Slider }
