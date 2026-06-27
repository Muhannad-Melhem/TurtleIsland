"use client"

import { motion } from "motion/react"
import { useReducedMotion } from "motion/react"
import { staggerContainer } from "@/lib/motion"

type StaggerChildrenProps = {
  children: React.ReactNode
  className?: string
} & React.ComponentPropsWithoutRef<typeof motion.div>

function StaggerChildren({ children, className, ...props }: StaggerChildrenProps) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerContainer}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export { StaggerChildren }
