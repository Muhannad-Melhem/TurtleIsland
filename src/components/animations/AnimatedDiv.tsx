"use client"

import { motion, type Variants } from "motion/react"
import { useReducedMotion } from "motion/react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { fadeUp } from "@/lib/motion"

type AnimatedDivProps = {
  children: React.ReactNode
  className?: string
  variants?: Variants
  once?: boolean
  amount?: number | "some" | "all"
} & React.ComponentPropsWithoutRef<typeof motion.div>

const AnimatedDiv = forwardRef<HTMLDivElement, AnimatedDivProps>(
  (
    {
      children,
      className,
      variants = fadeUp,
      once = true,
      amount = 0.2,
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

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount }}
        variants={variants}
        className={cn("will-change-transform", className)}
        {...props}
      >
        {children}
      </motion.div>
    )
  },
)

AnimatedDiv.displayName = "AnimatedDiv"

export { AnimatedDiv }
