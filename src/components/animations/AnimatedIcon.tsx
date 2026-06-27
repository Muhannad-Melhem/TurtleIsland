"use client"

import { motion } from "motion/react"
import { useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { wiggle } from "@/lib/motion"

type AnimatedIconProps = {
  children: React.ReactNode
  className?: string
} & React.ComponentPropsWithoutRef<typeof motion.span>

function AnimatedIcon({ children, className, ...props }: AnimatedIconProps) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <span className={className}>{children}</span>
  }

  return (
    <motion.span
      variants={wiggle}
      animate="animate"
      whileHover={{ scale: 1.2, rotate: 0 }}
      whileTap={{ scale: 0.9 }}
      className={cn("inline-flex will-change-transform", className)}
      {...props}
    >
      {children}
    </motion.span>
  )
}

export { AnimatedIcon }
