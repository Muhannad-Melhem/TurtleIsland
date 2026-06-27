"use client"

import { motion } from "motion/react"
import { useReducedMotion } from "motion/react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { buttonHover, fadeUp } from "@/lib/motion"

type AnimatedButtonProps = {
  children: React.ReactNode
  className?: string
} & React.ComponentPropsWithoutRef<typeof motion.button>

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, className, ...props }, ref) => {
    const prefersReduced = useReducedMotion()

    if (prefersReduced) {
      return (
        <button ref={ref} className={className}>
          {children}
        </button>
      )
    }

    return (
      <motion.button
        ref={ref}
        initial="hidden"
        whileInView="visible"
        variants={fadeUp}
        viewport={{ once: true }}
        {...buttonHover}
        onFocus={(e) => {
          e.currentTarget.style.outline = "2px solid rgba(255,255,255,0.5)"
          e.currentTarget.style.outlineOffset = "2px"
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = ""
          e.currentTarget.style.outlineOffset = ""
        }}
        className={cn("will-change-transform", className)}
        {...props}
      >
        {children}
      </motion.button>
    )
  },
)

AnimatedButton.displayName = "AnimatedButton"

export { AnimatedButton }
