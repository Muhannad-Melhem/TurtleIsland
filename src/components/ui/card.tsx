"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

type CardVariant = "basic" | "glass" | "elevated" | "interactive"

type CardProps = {
  variant?: CardVariant
  asChild?: boolean
} & React.HTMLAttributes<HTMLDivElement>

const variantStyles: Record<CardVariant, string> = {
  basic:
    "rounded-xl border border-border bg-card text-card-foreground shadow-card",
  glass:
    "glass rounded-xl text-foreground",
  elevated:
    "rounded-xl bg-card text-card-foreground shadow-floating border border-border/50",
  interactive:
    "rounded-xl border border-border bg-card text-card-foreground shadow-card hover:shadow-hover hover:-translate-y-0.5 cursor-pointer transition-all duration-300",
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "basic", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "will-change-transform",
          variantStyles[variant],
          className,
        )}
        {...props}
      />
    )
  },
)

Card.displayName = "Card"

const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1.5 p-5 pb-0", className)}
    {...props}
  />
))

CardHeader.displayName = "CardHeader"

const CardTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-h4 font-semibold leading-tight", className)}
    {...props}
  />
))

CardTitle.displayName = "CardTitle"

const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-small text-muted-foreground", className)}
    {...props}
  />
))

CardDescription.displayName = "CardDescription"

const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-5", className)} {...props} />
))

CardContent.displayName = "CardContent"

const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2 p-5 pt-0", className)}
    {...props}
  />
))

CardFooter.displayName = "CardFooter"

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  type CardProps,
  type CardVariant,
}
