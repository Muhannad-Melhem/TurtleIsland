"use client"

import { Root } from "@radix-ui/react-separator"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

type SeparatorProps = React.ComponentPropsWithoutRef<typeof Root>

const Separator = forwardRef<
  React.ElementRef<typeof Root>,
  SeparatorProps
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
      className,
    )}
    {...props}
  />
))

Separator.displayName = "Separator"

export { Separator }
