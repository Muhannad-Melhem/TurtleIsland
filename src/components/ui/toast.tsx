"use client"

import {
  Provider,
  Viewport,
  Root,
  Title,
  Description,
  Close,
  type ToastProps as RadixToastProps,
} from "@radix-ui/react-toast"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

const ToastProvider = Provider

const ToastViewport = forwardRef<
  React.ElementRef<typeof Viewport>,
  React.ComponentPropsWithoutRef<typeof Viewport>
>(({ className, ...props }, ref) => (
  <Viewport
    ref={ref}
    className={cn(
      "fixed bottom-0 right-0 z-toast flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:max-w-[420px]",
      className,
    )}
    {...props}
  />
))

ToastViewport.displayName = "ToastViewport"

type ToastProps = RadixToastProps & {
  variant?: "default" | "success" | "warning" | "danger"
}

const Toast = forwardRef<React.ElementRef<typeof Root>, ToastProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variantStyles = {
      default: "bg-card border-border",
      success: "bg-success/10 border-success/30",
      warning: "bg-warning/10 border-warning/30",
      danger: "bg-danger/10 border-danger/30",
    }
    return (
      <Root
        ref={ref}
        className={cn(
          "group pointer-events-auto relative flex w-full items-center justify-between gap-3 rounded-xl border p-4 shadow-medium",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-right-full",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-right-full",
          "data-[swipe=end]:animate-out data-[swipe=end]:fade-out-0 data-[swipe=end]:slide-out-to-right-full",
          "transition-all duration-200",
          variantStyles[variant],
          className,
        )}
        {...props}
      />
    )
  },
)

Toast.displayName = "Toast"

const ToastTitle = forwardRef<
  React.ElementRef<typeof Title>,
  React.ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, ref) => (
  <Title
    ref={ref}
    className={cn("text-small font-semibold", className)}
    {...props}
  />
))

ToastTitle.displayName = "ToastTitle"

const ToastDescription = forwardRef<
  React.ElementRef<typeof Description>,
  React.ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => (
  <Description
    ref={ref}
    className={cn("text-caption text-muted-foreground", className)}
    {...props}
  />
))

ToastDescription.displayName = "ToastDescription"

const ToastClose = forwardRef<
  React.ElementRef<typeof Close>,
  React.ComponentPropsWithoutRef<typeof Close>
>(({ className, ...props }, ref) => (
  <Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors",
      className,
    )}
    toast-close=""
    {...props}
  >
    <X size={14} />
  </Close>
))

ToastClose.displayName = "ToastClose"

export {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
  type ToastProps,
}
