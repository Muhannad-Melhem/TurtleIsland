"use client"

import { motion, useReducedMotion } from "motion/react"
import { useMemo } from "react"
import { cn } from "@/lib/utils"

type Particle = {
  id: number
  x: number
  y: number
  size: number
  durationX: number
  durationY: number
  delay: number
  opacity: number
}

type FloatingParticlesProps = {
  count?: number
  className?: string
  color?: string
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    durationX: 6 + Math.random() * 8,
    durationY: 5 + Math.random() * 7,
    delay: Math.random() * -10,
    opacity: 0.15 + Math.random() * 0.35,
  }))
}

function Particle({ p, color }: { p: Particle; color: string }) {
  return (
    <motion.div
      className={cn("absolute rounded-full", color)}
      style={{
        left: `${p.x}%`,
        top: `${p.y}%`,
        width: p.size,
        height: p.size,
        opacity: p.opacity,
      }}
      animate={{
        x: [0, 30, 0, -20, 0],
        y: [0, -25, 15, -10, 0],
        scale: [1, 1.3, 0.8, 1.1, 1],
        opacity: [p.opacity, p.opacity * 1.5, p.opacity, p.opacity * 1.2, p.opacity],
      }}
      transition={{
        duration: p.durationX,
        repeat: Infinity,
        delay: p.delay,
        ease: "easeInOut",
      }}
    />
  )
}

export function FloatingParticles({
  count = 20,
  className,
  color = "bg-foreground",
}: FloatingParticlesProps) {
  const prefersReduced = useReducedMotion()
  const particles = useMemo(() => generateParticles(count), [count])

  if (prefersReduced) return null

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      aria-hidden
    >
      {particles.map((p) => (
        <Particle key={p.id} p={p} color={color} />
      ))}
    </div>
  )
}
