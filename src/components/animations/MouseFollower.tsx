"use client"

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react"
import { useEffect } from "react"
import { cn } from "@/lib/utils"

type MouseFollowerProps = {
  className?: string
  stiffness?: number
  damping?: number
  size?: number
  children?: React.ReactNode
}

export function MouseFollower({
  className,
  stiffness = 80,
  damping = 20,
  size = 24,
  children,
}: MouseFollowerProps) {
  const prefersReduced = useReducedMotion()

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springX = useSpring(mouseX, { stiffness, damping })
  const springY = useSpring(mouseY, { stiffness, damping })

  useEffect(() => {
    if (prefersReduced) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - size / 2)
      mouseY.set(e.clientY - size / 2)
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY, size, prefersReduced])

  if (prefersReduced) return null

  return (
    <motion.div
      className={cn(
        "pointer-events-none fixed z-[9999] flex items-center justify-center",
        className,
      )}
      style={{
        left: springX,
        top: springY,
        width: size,
        height: size,
      }}
      aria-hidden
    >
      {children}
    </motion.div>
  )
}
