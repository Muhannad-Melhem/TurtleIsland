"use client"

import { Root, Trigger, Portal, Overlay, Content, Title, Description, Close } from "@radix-ui/react-dialog"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import type { Side } from "@/types"

const Drawer = Root
const DrawerTrigger = Trigger
const DrawerPortal = Portal
const DrawerClose = Close

const sideStyles: Record<Side, string> = {
  top: "inset-x-0 top-0 rounded-b-2xl max-h-[80vh]",
  right: "inset-y-0 right-0 rounded-l-2xl max-w-[400px] h-full",
  bottom: "inset-x-0 bottom-0 rounded-t-2xl max-h-[80vh]",
  left: "inset-y-0 left-0 rounded-r-2xl max-w-[400px] h-full",
}

const slideIn: Record<Side, string> = {
  top: "data-[state=open]:slide-in-from-top",
  right: "data-[state=open]:slide-in-from-right",
  bottom: "data-[state=open]:slide-in-from-bottom",
  left: "data-[state=open]:slide-in-from-left",
}

const slideOut: Record<Side, string> = {
  top: "data-[state=closed]:slide-out-to-top",
  right: "data-[state=closed]:slide-out-to-right",
  bottom: "data-[state=closed]:slide-out-to-bottom",
  left: "data-[state=closed]:slide-out-to-left",
}

const DrawerOverlay = forwardRef<
  React.ElementRef<typeof Overlay>,
  React.ComponentPropsWithoutRef<typeof Overlay>
>(({ className, ...props }, ref) => (
  <Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-overlay bg-overlay/60",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      className,
    )}
    {...props}
  />
))

DrawerOverlay.displayName = "DrawerOverlay"

const DrawerContent = forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content> & { side?: Side }
>(({ side = "right", className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <Content
      ref={ref}
      className={cn(
        "fixed z-modal bg-card border border-border shadow-modal p-6",
        "data-[state=open]:animate-in data-[state=open]:fade-in-0",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
        "duration-200",
        sideStyles[side],
        slideIn[side],
        slideOut[side],
        className,
      )}
      {...props}
    >
      {children}
      <Close className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
        <X size={18} />
      </Close>
    </Content>
  </DrawerPortal>
))

DrawerContent.displayName = "DrawerContent"

const DrawerTitle = forwardRef<
  React.ElementRef<typeof Title>,
  React.ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, ref) => (
  <Title
    ref={ref}
    className={cn("text-h4 font-semibold", className)}
    {...props}
  />
))

DrawerTitle.displayName = "DrawerTitle"

const DrawerDescription = forwardRef<
  React.ElementRef<typeof Description>,
  React.ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => (
  <Description
    ref={ref}
    className={cn("text-small text-muted-foreground", className)}
    {...props}
  />
))

DrawerDescription.displayName = "DrawerDescription"

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
}
