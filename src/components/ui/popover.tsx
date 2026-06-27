"use client"

import { Root, Trigger, Portal, Content } from "@radix-ui/react-popover"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

const Popover = Root
const PopoverTrigger = Trigger

const PopoverContent = forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <Portal>
    <Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-popover w-72 rounded-xl border border-border bg-card p-4 shadow-medium",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </Portal>
))

PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent }
