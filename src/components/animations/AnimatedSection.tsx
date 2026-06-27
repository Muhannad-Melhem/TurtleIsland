"use client"

import { motion, type Variants } from "motion/react"
import { useReducedMotion } from "motion/react"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { fadeUp } from "@/lib/motion"

type AnimatedSectionProps = {
  children: React.ReactNode
  className?: string
  variants?: Variants
  once?: boolean
  amount?: number | "some" | "all"
} & React.ComponentPropsWithoutRef<typeof motion.section>

const AnimatedSection = forwardRef<HTMLElement, AnimatedSectionProps>(
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
        <section ref={ref} className={className}>
          {children}
        </section>
      )
    }

    return (
      <motion.section
        ref={ref}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount }}
        variants={variants}
        className={cn("will-change-transform", className)}
        {...props}
      >
        {children}
      </motion.section>
    )
  },
)

AnimatedSection.displayName = "AnimatedSection"

export { AnimatedSection }
