"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { useGameStore } from "@/store/game-store"
import { useSound } from "@/hooks/use-sound"

type Dino = {
  id: number
  x: number
  y: number
  emoji: string
  name: string
  scale: number
}

const dinos: Dino[] = [
  { id: 1, x: 10, y: 60, emoji: "🦖", name: "Baby T-Rex", scale: 2 },
  { id: 2, x: 35, y: 70, emoji: "🦕", name: "Triceratops", scale: 1.8 },
  { id: 3, x: 60, y: 55, emoji: "🦕", name: "Stegosaurus", scale: 1.6 },
  { id: 4, x: 80, y: 65, emoji: "🦕", name: "Long Neck", scale: 2.2 },
  { id: 5, x: 50, y: 40, emoji: "🦜", name: "Pterodactyl", scale: 1.4 },
  { id: 6, x: 20, y: 35, emoji: "🦖", name: "Baby Spike", scale: 1.3 },
  { id: 7, x: 70, y: 30, emoji: "🦕", name: "Dottie", scale: 1.5 },
  { id: 8, x: 45, y: 80, emoji: "🦕", name: "Minty", scale: 1.7 },
]

function DinoCharacter({ dino }: { dino: Dino }) {
  const [idleAnimation] = useState(() => {
    const animations = [
      { y: [0, -4, 0], rotate: [0, 2, -2, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const } },
      { y: [0, -2, 0], scaleY: [1, 1.02, 1], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const } },
      { rotate: [0, -5, 5, -5, 0], transition: { duration: 1.5, repeat: Infinity } },
      { x: [0, 10, 0, -5, 0], transition: { duration: 5, repeat: Infinity, ease: "easeInOut" as const } },
    ]
    return animations[Math.floor(Math.random() * animations.length)]
  })

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ left: `${dino.x}%`, top: `${dino.y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: dino.scale }}
      transition={{ delay: dino.id * 0.15, type: "spring", stiffness: 120, damping: 18 }}
      whileHover={{ scale: dino.scale * 1.2, rotate: [0, -10, 10, 0] }}
    >
      <motion.div
        animate={idleAnimation}
        className="flex flex-col items-center"
      >
        <span className="text-4xl sm:text-5xl">{dino.emoji}</span>
        <span className="mt-1 whitespace-nowrap rounded-full bg-white/70 px-2 py-0.5 text-[10px] font-medium text-foreground/70 backdrop-blur-sm">
          {dino.name}
        </span>
      </motion.div>
    </motion.div>
  )
}

function Volcano() {
  return (
    <motion.div
      className="absolute right-[15%] top-[15%]"
      animate={{ y: [0, -2, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="relative">
        <div className="text-6xl">🌋</div>
        <motion.div
          className="absolute -top-2 left-1/2 -translate-x-1/2 text-2xl"
          animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          💨
        </motion.div>
      </div>
    </motion.div>
  )
}

function Butterfly() {
  const [x] = useState(() => 10 + Math.random() * 80)
  const [y] = useState(() => 10 + Math.random() * 60)
  return (
    <motion.div
      className="absolute text-lg pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        x: [0, 50, 100, 50, 0],
        y: [0, -20, 10, -30, 0],
        scale: [1, 1.2, 1, 1.1, 1],
      }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      🦋
    </motion.div>
  )
}

export function DinoValley() {
  const navigate = useGameStore((s) => s.navigate)
  const { play } = useSound()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-seafoam/20 via-sage/10 to-cream"
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
          🦕 Dino Valley
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-body text-muted-foreground"
        >
          Pastel friends are waiting!
        </motion.p>
      </div>

      <Volcano />
      <Butterfly />

      <div className="relative mx-auto h-[500px] w-full max-w-4xl">
        {dinos.map((dino) => (
          <DinoCharacter key={dino.id} dino={dino} />
        ))}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-sage/10 to-transparent" />
      </div>
    </motion.div>
  )
}
