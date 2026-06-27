"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { useGameStore } from "@/store/game-store"
import { useSound } from "@/hooks/use-sound"

function FloatingHeart({ index }: { index: number }) {
  const [x] = useState(() => 5 + Math.random() * 90)
  const [duration] = useState(() => 3 + Math.random() * 4)
  const [delay] = useState(() => Math.random() * 5)
  const [size] = useState(() => 1 + Math.random() * 1.5)
  const [yOffset] = useState(() => -200 - Math.random() * 300)
  const [xDrift] = useState(() => (Math.random() - 0.5) * 100)

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: "100%", fontSize: `${size}rem` }}
      animate={{
        y: [0, yOffset],
        x: [0, xDrift],
        opacity: [0, 1, 1, 0],
        scale: [0, size * 0.5, size, 0],
      }}
      transition={{ duration, repeat: Infinity, delay, ease: "easeOut" }}
    >
      {["❤️", "💕", "💖", "💗", "💜", "🧡"][index % 6]}
    </motion.div>
  )
}

function FloatingFlower({ index }: { index: number }) {
  const [x] = useState(() => 10 + Math.random() * 80)
  const [duration] = useState(() => 6 + Math.random() * 4)
  const [delay] = useState(() => Math.random() * 6)
  const [size] = useState(() => 1 + Math.random() * 1.2)
  const [rotateStart] = useState(() => Math.random() * 360)
  const [xDrift] = useState(() => (Math.random() - 0.5) * 80)
  const [rotateAmount] = useState(() => 180 + Math.random() * 180)

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: "-5%", fontSize: `${size}rem`, rotate: `${rotateStart}deg` }}
      animate={{
        y: [0, typeof window !== "undefined" ? window.innerHeight + 100 : 900],
        x: [0, xDrift],
        rotate: [0, rotateAmount],
        opacity: [0, 1, 1, 0],
      }}
      transition={{ duration, repeat: Infinity, delay, ease: "linear" }}
    >
      {["🌸", "🌺", "🌷", "🌹", "🌻", "🌼"][index % 6]}
    </motion.div>
  )
}

export function DinoMessage() {
  const navigate = useGameStore((s) => s.navigate)
  const { play } = useSound()
  const [hearts] = useState(() => Array.from({ length: 12 }, (_, i) => i))
  const [flowers] = useState(() => Array.from({ length: 8 }, (_, i) => i))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-coral/10 via-soft-yellow/10 to-lavender/10"
    >
      {hearts.map((i) => (
        <FloatingHeart key={`heart-${i}`} index={i} />
      ))}
      {flowers.map((i) => (
        <FloatingFlower key={`flower-${i}`} index={i} />
      ))}

      <button
        onClick={() => { play("click"); navigate("world") }}
        className="fixed left-4 top-4 z-20 flex items-center gap-2 rounded-2xl glass px-4 py-2 text-small font-medium text-foreground shadow-soft transition-all hover:shadow-medium cursor-pointer"
      >
        ← Back
      </button>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 pt-16 pb-8">
        <div className="relative mb-6 flex flex-col items-center">
          <motion.div
            className="text-8xl sm:text-9xl"
            animate={{
              y: [0, -8, 0],
              rotate: [0, -3, 3, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            🦕
          </motion.div>

          <motion.div
            className="absolute -top-6 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, type: "spring", stiffness: 200, damping: 12 }}
          >
            <motion.div
              className="relative rounded-3xl bg-white/90 px-8 py-4 shadow-floating backdrop-blur-sm"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.p
                className="whitespace-nowrap text-h3 font-bold"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.5, type: "spring", stiffness: 200, damping: 12 }}
              >
                I love you! 💕
              </motion.p>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rotate-45 h-4 w-4 bg-white/90" />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
        >
          <motion.p
            className="text-body-lg text-muted-foreground"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            You make every day brighter! 🌟
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  )
}
