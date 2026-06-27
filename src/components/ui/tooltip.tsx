"use client"

import {
  Provider,
  Root,
  Trigger,
  Content,
  type TooltipContentProps,
} from "@radix-ui/react-tooltip"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

const TooltipProvider = Provider

const Tooltip = Root

const TooltipTrigger = Trigger

const TooltipContent = forwardRef<
  React.ElementRef<typeof Content>,
  TooltipContentProps
>(({ className, sideOffset = 4, ...props }, ref) => (
  <Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-tooltip overflow-hidden rounded-xl bg-foreground px-3 py-1.5 text-xs text-background shadow-medium",
      "animate-in fade-in-0 zoom-in-95",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      "data-[side=bottom]:slide-in-from-top-1",
      "data-[side=left]:slide-in-from-right-1",
      "data-[side=right]:slide-in-from-left-1",
      "data-[side=top]:slide-in-from-bottom-1",
      className,
    )}
    {...props}
  />
))

TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
