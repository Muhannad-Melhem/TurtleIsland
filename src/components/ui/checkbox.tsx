"use client"

import { Root, Indicator } from "@radix-ui/react-checkbox"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

type CheckboxProps = React.ComponentPropsWithoutRef<typeof Root>

const Checkbox = forwardRef<React.ElementRef<typeof Root>, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <Root
        ref={ref}
        className={cn(
          "peer h-5 w-5 shrink-0 rounded-md border border-border bg-surface",
          "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
          "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "transition-all duration-200",
          className,
        )}
        {...props}
      >
        <Indicator className="flex items-center justify-center text-current">
          <Check size={14} strokeWidth={3} />
        </Indicator>
      </Root>
    )
  },
)

Checkbox.displayName = "Checkbox"

export { Checkbox }
