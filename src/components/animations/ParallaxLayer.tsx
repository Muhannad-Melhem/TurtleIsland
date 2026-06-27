"use client"

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"
import { useRef } from "react"
import { cn } from "@/lib/utils"

type ParallaxLayerProps = {
  children: React.ReactNode
  className?: string
  speed?: number
  offset?: number[]
}

export function ParallaxLayer({
  children,
  className,
  speed = 0.5,
  offset,
}: ParallaxLayerProps) {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset ?? ["start end", "end start"],
  })

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [speed * 100, speed * -100],
  )

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  )
}
