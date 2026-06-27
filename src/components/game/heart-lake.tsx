"use client"

import { useState, useCallback, useRef } from "react"
import { motion } from "motion/react"
import { useGameStore } from "@/store/game-store"
import { useSound } from "@/hooks/use-sound"

type Ripple = {
  id: number
  x: number
  y: number
}

function LilyPad({ index }: { index: number }) {
  const [x] = useState(() => 10 + Math.random() * 80)
  const [y] = useState(() => 20 + Math.random() * 60)
  return (
    <motion.div
      className="absolute text-3xl pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        x: [0, 10, 0, -5, 0],
        rotate: [0, 5, -3, 2, 0],
      }}
      transition={{
        duration: 6 + index,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.5,
      }}
    >
      🪷
    </motion.div>
  )
}

export function HeartLake() {
  const navigate = useGameStore((s) => s.navigate)
  const { play } = useSound()
  const [ripples, setRipples] = useState<Ripple[]>([])
  const idRef = useRef(0)

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest("button")) return
      const rect = e.currentTarget.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      const id = idRef.current++
      setRipples((prev) => [...prev, { id, x, y }])
      play("splash")
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id))
      }, 1500)
    },
    [play],
  )

  const fish = [
    { x: 20, y: 40, delay: 0 },
    { x: 50, y: 60, delay: 1 },
    { x: 75, y: 35, delay: 2 },
    { x: 35, y: 70, delay: 0.5 },
    { x: 65, y: 50, delay: 1.5 },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-ocean/10 via-lavender/10 to-mint/10"
    >
      <button
        onClick={() => { play("click"); navigate("world") }}
        className="fixed left-4 top-4 z-20 flex items-center gap-2 rounded-2xl glass px-4 py-2 text-small font-medium text-foreground shadow-soft transition-all hover:shadow-medium cursor-pointer"
      >
        ← Back
      </button>

      <div className="flex flex-col items-center px-4 pt-16 pb-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-h1 font-bold"
        >
          💙 Heart Lake
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-body text-muted-foreground"
        >
          Touch the water to make ripples
        </motion.p>
      </div>

      <div
        onClick={handleClick}
        className="relative mx-auto h-[400px] w-full max-w-4xl cursor-pointer rounded-3xl"
      >
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lake-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7FD8F7" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#7FD8F7" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#B8F2D6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <motion.ellipse
            cx="200" cy="100" rx="190" ry="90"
            fill="url(#lake-grad)"
            animate={{ ry: [90, 92, 90], rx: [190, 192, 190] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>

        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="absolute aspect-square rounded-full border-2 border-ocean/30"
            style={{
              left: `${ripple.x}%`,
              top: `${ripple.y}%`,
              width: 10,
            }}
            initial={{ scale: 0, opacity: 0.6, width: 10 }}
            animate={{ scale: 15, opacity: 0, width: 10 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        ))}

        {fish.map((f, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl pointer-events-none"
            style={{ left: `${f.x}%`, top: `${f.y}%` }}
            animate={{
              x: [0, 30, 60, 30, 0],
              y: [0, -10, 5, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: f.delay,
            }}
          >
            🐟
          </motion.div>
        ))}

        {Array.from({ length: 4 }).map((_, i) => (
          <LilyPad key={i} index={i} />
        ))}
      </div>
    </motion.div>
  )
}
