"use client"

import { Root, List, Trigger, Content } from "@radix-ui/react-tabs"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

const Tabs = Root

const TabsList = forwardRef<
  React.ElementRef<typeof List>,
  React.ComponentPropsWithoutRef<typeof List>
>(({ className, ...props }, ref) => (
  <List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center gap-1 rounded-xl bg-muted p-1",
      className,
    )}
    {...props}
  />
))

TabsList.displayName = "TabsList"

const TabsTrigger = forwardRef<
  React.ElementRef<typeof Trigger>,
  React.ComponentPropsWithoutRef<typeof Trigger>
>(({ className, ...props }, ref) => (
  <Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium",
      "transition-all duration-200",
      "data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-soft",
      "text-muted-foreground hover:text-foreground",
      "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  />
))

TabsTrigger.displayName = "TabsTrigger"

const TabsContent = forwardRef<
  React.ElementRef<typeof Content>,
  React.ComponentPropsWithoutRef<typeof Content>
>(({ className, ...props }, ref) => (
  <Content
    ref={ref}
    className={cn(
      "mt-2 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
      className,
    )}
    {...props}
  />
))

TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
