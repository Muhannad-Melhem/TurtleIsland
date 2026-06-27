"use client"

import { motion } from "motion/react"
import { useGameStore } from "@/store/game-store"
import { useSound } from "@/hooks/use-sound"
import { CollectionProgress, SearchBar, FilterBar, CollectionGrid } from "./collection-ui"

export function TurtleCollection() {
  const navigate = useGameStore((s) => s.navigate)
  const { play } = useSound()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-lavender/10 via-cream to-mint/10"
    >
      <button
        onClick={() => { play("click"); navigate("world") }}
        className="fixed left-4 top-4 z-20 flex items-center gap-2 rounded-2xl glass px-4 py-2 text-small font-medium text-foreground shadow-soft transition-all hover:shadow-medium cursor-pointer"
      >
        ← Back
      </button>

      <div className="flex flex-col items-center px-4 pt-16 pb-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-h1 font-bold"
        >
          🐢 Turtle Collection
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-body text-muted-foreground"
        >
          Discover all the turtles of Turtle Island
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-8 flex flex-col items-center gap-6 px-4"
      >
        <CollectionProgress />
        <div className="flex w-full max-w-4xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <SearchBar />
          <FilterBar />
        </div>
      </motion.div>

      <div className="mx-auto max-w-6xl px-4 pb-16">
        <CollectionGrid />
      </div>
    </motion.div>
  )
}
