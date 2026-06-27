"use client"

import { motion, type Variants } from "motion/react"
import { useReducedMotion } from "motion/react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { cardHover, fadeUp } from "@/lib/motion"

type AnimatedCardProps = {
  children: React.ReactNode
  className?: string
  variants?: Variants
  once?: boolean
  amount?: number | "some" | "all"
  enableTilt?: boolean
} & React.ComponentPropsWithoutRef<typeof motion.div>

const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  (
    {
      children,
      className,
      variants = fadeUp,
      once = true,
      amount = 0.2,
      enableTilt = true,
      ...props
    },
    ref,
  ) => {
    const prefersReduced = useReducedMotion()

    if (prefersReduced) {
      return (
        <div ref={ref} className={className}>
          {children}
        </div>
      )
    }

    const interactionProps = enableTilt ? cardHover : {}

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount }}
        variants={variants}
        layout
        {...interactionProps}
        className={cn("will-change-transform", className)}
        {...props}
      >
        {children}
      </motion.div>
    )
  },
)

AnimatedCard.displayName = "AnimatedCard"

export { AnimatedCard }
