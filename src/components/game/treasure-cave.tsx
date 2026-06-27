"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useGameStore } from "@/store/game-store"
import { useSound } from "@/hooks/use-sound"

const starCost = 5

function Crystal({ index: _index }: { index: number }) {
  const [x] = useState(() => Math.random() * 90)
  const [y] = useState(() => Math.random() * 70 + 15)
  const crystals = ["💎", "🔮", "💠", "✨"]
  const [emoji] = useState(() => crystals[Math.floor(Math.random() * crystals.length)])
  const [delay] = useState(() => Math.random() * 2)

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 0.6, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 120, damping: 18 }}
    >
      <motion.span
        className="text-2xl"
        style={{ filter: "brightness(1.2)" }}
        animate={{
          opacity: [0.4, 0.8, 0.4],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 2 + _index, repeat: Infinity, delay, ease: "easeInOut" }}
      >
        {emoji}
      </motion.span>
    </motion.div>
  )
}

export function TreasureCave() {
  const navigate = useGameStore((s) => s.navigate)
  const stars = useGameStore((s) => s.stars)
  const addStars = useGameStore((s) => s.addStars)
  const unlockTurtle = useGameStore((s) => s.unlockTurtle)
  const turtles = useGameStore((s) => s.turtles)
  const { play } = useSound()
  const [opened, setOpened] = useState(false)
  const [hasGolden, setHasGolden] = useState(false)

  const goldenTurtle = turtles.find((t) => t.id === "rainbow")
  const alreadyGotGolden = goldenTurtle?.unlocked

  const canOpen = stars >= starCost

  const handleOpen = () => {
    if (!canOpen || opened) return
    play("unlock")
    addStars(-starCost)
    setOpened(true)
    setTimeout(() => {
      setHasGolden(true)
      unlockTurtle("rainbow")
      play("achievement")
    }, 1000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#1a0a2e] via-[#2d1b4e] to-[#0d0221]"
    >
      <button
        onClick={() => { play("click"); navigate("world") }}
        className="fixed left-4 top-4 z-20 flex items-center gap-2 rounded-2xl glass px-4 py-2 text-small font-medium text-white shadow-soft transition-all hover:shadow-medium cursor-pointer"
      >
        ← Back
      </button>

      <div className="flex flex-col items-center px-4 pt-16 pb-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-h1 font-bold text-white"
        >
          💎 Treasure Cave
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-body text-white/70"
        >
          Something sparkly awaits...
        </motion.p>
      </div>

      <div className="relative mx-auto flex h-[400px] w-full max-w-4xl flex-col items-center justify-center gap-8">
        {!opened && !alreadyGotGolden && (
          <>
            <motion.div
              className="text-8xl"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              🚪
            </motion.div>

            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-body text-white/60">
                This door needs {starCost} ⭐ to open
              </p>
              <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-sm">
                <span className="text-lg">⭐</span>
                <span className="font-semibold text-white">{stars} / {starCost}</span>
              </div>
              <motion.button
                whileHover={canOpen ? { scale: 1.05 } : {}}
                whileTap={canOpen ? { scale: 0.95 } : {}}
                onClick={handleOpen}
                disabled={!canOpen}
                className={`rounded-2xl px-8 py-3 text-body font-semibold transition-all ${
                  canOpen
                    ? "bg-gradient-to-r from-ocean to-lavender text-white shadow-floating hover:shadow-hover cursor-pointer"
                    : "bg-white/10 text-white/40 cursor-not-allowed"
                }`}
              >
                {canOpen ? "Open the Door" : "Not enough stars"}
              </motion.button>
            </motion.div>
          </>
        )}

        <AnimatePresence>
          {opened && !hasGolden && (
            <motion.div
              key="opening"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                className="text-6xl"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                🗝️
              </motion.div>
              <p className="text-body text-white/60">The door creaks open...</p>
            </motion.div>
          )}

          {hasGolden && (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                className="text-8xl"
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                🌈
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-h3 font-bold text-white"
              >
                Rainbow Turtle found!
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-body text-soft-yellow"
              >
                A rare turtle sparkles in the cave light...
              </motion.p>
            </motion.div>
          )}

          {alreadyGotGolden && (
            <motion.div
              key="already"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.div
                className="text-8xl"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                🌈
              </motion.div>
              <p className="text-h3 font-bold text-white">
                Rainbow Turtle is already with you!
              </p>
              <p className="text-body text-white/60">
                The cave glows warmly in your presence.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {!opened && (
          <>
            <Crystal index={0} />
            <Crystal index={1} />
            <Crystal index={2} />
            <Crystal index={3} />
          </>
        )}
      </div>
    </motion.div>
  )
}
