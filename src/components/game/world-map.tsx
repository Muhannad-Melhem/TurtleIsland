"use client"

import { motion } from "motion/react"
import { useGameStore, type View } from "@/store/game-store"
import { useSound } from "@/hooks/use-sound"

type Island = {
  id: View
  name: string
  subtitle: string
  gradient: string
  icon: string
  x: number
  y: number
}

const islands: Island[] = [
  { id: "turtle-village", name: "Turtle Village", subtitle: "Cozy town center", gradient: "from-ocean via-mint to-cream", icon: "🏘️", x: 10, y: 25 },
  { id: "heart-lake", name: "Heart Lake", subtitle: "Peaceful waters", gradient: "from-ocean via-lavender to-mint", icon: "💙", x: 55, y: 15 },
  { id: "dino-valley", name: "Dino Valley", subtitle: "Pastel dinosaur land", gradient: "from-seafoam via-sage to-mint", icon: "🦕", x: 35, y: 50 },
  { id: "flower-garden", name: "Flower Garden", subtitle: "Blooming paradise", gradient: "from-lavender via-coral to-soft-yellow", icon: "🌸", x: 75, y: 45 },
  { id: "game-arcade", name: "Game Arcade", subtitle: "Fun mini games", gradient: "from-coral via-soft-yellow to-lavender", icon: "🎮", x: 15, y: 65 },
  { id: "cloud-observatory", name: "Cloud Observatory", subtitle: "Sky among stars", gradient: "from-lavender via-ocean to-cream", icon: "☁️", x: 60, y: 70 },
  { id: "treasure-cave", name: "Treasure Cave", subtitle: "Locked mystery", gradient: "from-sage via-ocean to-lavender", icon: "💎", x: 85, y: 25 },
  { id: "dino-message", name: "Dino Message", subtitle: "A special message 💌", gradient: "from-coral via-soft-yellow to-lavender", icon: "💕", x: 50, y: 85 },
]

export function WorldMap() {
  const navigate = useGameStore((s) => s.navigate)
  const stars = useGameStore((s) => s.stars)
  const turtles = useGameStore((s) => s.turtles)
  const { play } = useSound()
  const unlockedCount = turtles.filter((t) => t.unlocked).length
  const totalCount = turtles.length

  const handleClick = (island: Island) => {
    play("click")
    navigate(island.id)
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-ocean/5 via-cream to-mint/10" />

      <div className="relative z-10 flex flex-col items-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-center"
        >
          <h2 className="text-h1 font-bold tracking-tight">Turtle Island</h2>
          <p className="mt-2 text-body text-muted-foreground">
            Choose your destination
          </p>
        </motion.div>

        <motion.div className="mb-6 flex items-center gap-3">
          <motion.div className="flex items-center gap-2 rounded-2xl glass px-4 py-2">
            <span className="text-lg">⭐</span>
            <span className="font-semibold">{stars} stars</span>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { play("click"); navigate("collection") }}
            className="flex items-center gap-2 rounded-2xl glass px-4 py-2 text-small font-medium text-foreground shadow-soft transition-all hover:shadow-medium cursor-pointer"
          >
            <span className="text-lg">🐢</span>
            <span className="font-semibold">{unlockedCount}/{totalCount}</span>
          </motion.button>
        </motion.div>

        <div className="relative w-full max-w-5xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {islands.map((island, i) => (
              <motion.button
                key={island.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, type: "spring", stiffness: 120, damping: 18 }}
                whileHover={{ y: -6, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleClick(island)}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${island.gradient} p-6 text-left shadow-card transition-shadow hover:shadow-hover cursor-pointer`}
              >
                <div className="absolute -right-6 -top-6 text-6xl opacity-20 group-hover:opacity-30 transition-opacity">
                  {island.icon}
                </div>
                <div className="relative">
                  <div className="mb-2 text-2xl">{island.icon}</div>
                  <h3 className="text-h5 font-bold text-foreground">{island.name}</h3>
                  <p className="text-small text-muted-foreground">{island.subtitle}</p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-caption text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>→</span>
                  <span>Explore</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
