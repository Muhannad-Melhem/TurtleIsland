"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { useReducedMotion } from "motion/react"

function Cloud() {
  const [y] = useState(() => Math.random() * 40)
  const [size] = useState(() => 1 + Math.random() * 1.5)
  const [duration] = useState(() => 15 + Math.random() * 20)
  const [startX] = useState(() => -(Math.random() * 100))

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: `${y}%`, left: `${startX}%` }}
      animate={{ x: [`${startX}%`, `${100 - startX}%`] }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <svg
        width={80 * size}
        height={50 * size}
        viewBox="0 0 80 50"
        fill="none"
        className="text-white/30"
      >
        <ellipse cx="40" cy="30" rx="35" ry="18" fill="currentColor" />
        <ellipse cx="25" cy="25" rx="18" ry="14" fill="currentColor" />
        <ellipse cx="55" cy="25" rx="18" ry="14" fill="currentColor" />
        <ellipse cx="40" cy="22" rx="22" ry="16" fill="currentColor" />
      </svg>
    </motion.div>
  )
}

function Bubble() {
  const [x] = useState(() => Math.random() * 100)
  const [size] = useState(() => 4 + Math.random() * 8)
  const [duration] = useState(() => 4 + Math.random() * 4)
  const [delay] = useState(() => Math.random() * -10)
  const [driftX] = useState(() => Math.random() > 0.5 ? 20 : -20)

  return (
    <motion.div
      className="absolute bottom-0 rounded-full border border-white/20 bg-white/10 pointer-events-none"
      style={{
        left: `${x}%`,
        width: size,
        height: size,
      }}
      animate={{
        y: [0, -500],
        x: [0, driftX],
        opacity: [0.6, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  )
}

function Sparkle() {
  const [x] = useState(() => Math.random() * 100)
  const [y] = useState(() => Math.random() * 100)
  const [delay] = useState(() => Math.random() * 3)
  const [size] = useState(() => 1.5 + Math.random() * 2)

  return (
    <motion.div
      className="absolute rounded-full bg-soft-yellow pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
      }}
      animate={{
        opacity: [0, 0.8, 0],
        scale: [0, 1.5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  )
}

type AmbientBackgroundProps = {
  showClouds?: boolean
  showBubbles?: boolean
  showSparkles?: boolean
  className?: string
}

export function AmbientBackground({
  showClouds = true,
  showBubbles = true,
  showSparkles = false,
  className = "",
}: AmbientBackgroundProps) {
  const reduced = useReducedMotion()

  if (reduced) return null

  return (
    <div className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${className}`}>
      {showClouds &&
        Array.from({ length: 5 }).map((_, i) => (
          <Cloud key={`cloud-${i}`} />
        ))}
      {showBubbles &&
        Array.from({ length: 8 }).map((_, i) => (
          <Bubble key={`bubble-${i}`} />
        ))}
      {showSparkles &&
        Array.from({ length: 12 }).map((_, i) => (
          <Sparkle key={`sparkle-${i}`} />
        ))}
    </div>
  )
}
