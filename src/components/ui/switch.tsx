"use client"

import { Root, Thumb } from "@radix-ui/react-switch"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

type SwitchProps = React.ComponentPropsWithoutRef<typeof Root>

const Switch = forwardRef<React.ElementRef<typeof Root>, SwitchProps>(
  ({ className, ...props }, ref) => {
    return (
      <Root
        ref={ref}
        className={cn(
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
          "transition-colors duration-200",
          "data-[state=checked]:bg-primary",
          "data-[state=unchecked]:bg-muted-foreground/30",
          "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        <Thumb
          className={cn(
            "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-soft",
            "transition-transform duration-200",
            "data-[state=checked]:translate-x-5",
            "data-[state=unchecked]:translate-x-0",
          )}
        />
      </Root>
    )
  },
)

Switch.displayName = "Switch"

export { Switch }
