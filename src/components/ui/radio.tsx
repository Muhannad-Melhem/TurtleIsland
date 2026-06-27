"use client"

import { Item, Indicator } from "@radix-ui/react-radio-group"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

type RadioItemProps = React.ComponentPropsWithoutRef<typeof Item>

const RadioItem = forwardRef<React.ElementRef<typeof Item>, RadioItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <Item
        ref={ref}
        className={cn(
          "peer h-5 w-5 shrink-0 rounded-full border border-border bg-surface",
          "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
          "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "transition-all duration-200",
          className,
        )}
        {...props}
      >
        <Indicator className="flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-white" />
        </Indicator>
      </Item>
    )
  },
)

RadioItem.displayName = "RadioItem"

type RadioGroupProps = {
  children: React.ReactNode
  className?: string
} & React.ComponentPropsWithoutRef<"div">

function RadioGroup({ children, className, ...props }: RadioGroupProps) {
  return (
    <div
      role="radiogroup"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { RadioGroup, RadioItem }
