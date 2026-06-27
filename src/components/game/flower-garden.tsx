"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { useGameStore } from "@/store/game-store"
import { useSound } from "@/hooks/use-sound"

type Flower = {
  id: number
  x: number
  y: number
  emoji: string
  scale: number
  delay: number
}

const flowerEmojis = ["🌷", "🌹", "🌻", "🌸", "🌺", "🌼", "🌿", "🌱"]

function generateFlowers(): Flower[] {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 95,
    y: Math.random() * 80 + 10,
    emoji: flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)],
    scale: 0.8 + Math.random() * 0.8,
    delay: Math.random() * 3,
  }))
}

function Butterfly() {
  const [x] = useState(() => Math.random() * 90)
  const [y] = useState(() => Math.random() * 70)
  const [duration] = useState(() => 6 + Math.random() * 6)
  return (
    <motion.div
      className="absolute text-xl pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        x: [0, 80, 160, 80, 0],
        y: [0, -30, 10, -40, 0],
        rotate: [0, 5, -5, 3, 0],
      }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      🦋
    </motion.div>
  )
}

function Bee() {
  const [x] = useState(() => Math.random() * 90)
  const [y] = useState(() => Math.random() * 70)
  const [duration] = useState(() => 3 + Math.random() * 3)
  return (
    <motion.div
      className="absolute text-lg pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        x: [0, 30, -20, 40, 0],
        y: [0, -15, 10, -20, 0],
      }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      🐝
    </motion.div>
  )
}

function FloatingPetal() {
  const [x] = useState(() => Math.random() * 100)
  const [delay] = useState(() => Math.random() * 5)
  const [size] = useState(() => 1 + Math.random() * 1.5)
  const [driftX] = useState(() => Math.random() > 0.5 ? 40 : -40)
  const [animDuration] = useState(() => 6 + Math.random() * 4)
  return (
    <motion.div
      className="absolute text-sm pointer-events-none"
      style={{ left: `${x}%`, top: -10 }}
      animate={{
        y: [0, 400],
        x: [0, driftX],
        rotate: [0, 360],
        opacity: [0, 0.7, 0],
      }}
      transition={{ duration: animDuration, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <span style={{ fontSize: `${size}rem` }}>🌸</span>
    </motion.div>
  )
}

export function FlowerGarden() {
  const navigate = useGameStore((s) => s.navigate)
  const { play } = useSound()
  const [flowers] = useState(() => generateFlowers())

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-lavender/20 via-coral/5 to-soft-yellow/10"
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
          🌸 Flower Garden
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-body text-muted-foreground"
        >
          A blooming paradise
        </motion.p>
      </div>

      <Butterfly />
      <Butterfly />
      <Bee />
      <Bee />
      <FloatingPetal />
      <FloatingPetal />

      <div className="relative mx-auto h-[500px] w-full max-w-4xl">
        {flowers.map((flower) => (
          <motion.div
            key={flower.id}
            className="absolute cursor-pointer"
            style={{ left: `${flower.x}%`, top: `${flower.y}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: flower.scale }}
            transition={{ delay: flower.delay, type: "spring", stiffness: 120, damping: 18 }}
            whileHover={{ scale: flower.scale * 1.3, rotate: [0, -10, 10, 0] }}
          >
            <motion.div
              animate={{
                rotate: [0, 3, -3, 3, 0],
                y: [0, -2, 2, -2, 0],
              }}
              transition={{ duration: 4 + flower.id % 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-3xl sm:text-4xl">{flower.emoji}</span>
            </motion.div>
          </motion.div>
        ))}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sage/10 to-transparent" />
      </div>

      <div className="flex flex-wrap justify-center gap-8 px-4 pb-16 pt-8">
        {[
          { icon: "🌳", name: "Cherry Tree", desc: "Blooming pink" },
          { icon: "🌿", name: "Fern Patch", desc: "Shady and cool" },
          { icon: "🍯", name: "Bee Hive", desc: "Buzzing softly" },
          { icon: "🌞", name: "Sunflower Field", desc: "Golden glow" },
        ].map((spot, i) => (
          <motion.div
            key={spot.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 120, damping: 18 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="flex flex-col items-center gap-2 rounded-2xl bg-white/60 p-4 shadow-card backdrop-blur-sm"
          >
            <span className="text-3xl">{spot.icon}</span>
            <span className="text-small font-semibold">{spot.name}</span>
            <span className="text-caption text-muted-foreground">{spot.desc}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
