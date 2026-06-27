"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useGameStore } from "@/store/game-store"
import { useSound } from "@/hooks/use-sound"
import { getTurtleDef } from "@/lib/turtle-data"
import { EggIcon } from "./turtle-icons"
import { Confetti } from "./confetti"

export function UnlockAnimation() {
  const recentlyUnlocked = useGameStore((s) => s.recentlyUnlocked)
  const clearRecentlyUnlocked = useGameStore((s) => s.clearRecentlyUnlocked)
  const { play } = useSound()
  const [stage, setStage] = useState<"idle" | "egg" | "crack" | "hatch" | "reveal" | "done">("idle")

  const turtle = recentlyUnlocked ? getTurtleDef(recentlyUnlocked) : null

  const dismiss = useCallback(() => {
    setStage("done")
    setTimeout(() => {
      clearRecentlyUnlocked()
      setStage("idle")
    }, 300)
  }, [clearRecentlyUnlocked])

  useEffect(() => {
    if (!recentlyUnlocked || !turtle) return

    const t0 = setTimeout(() => setStage("egg"), 50)
    const t1 = setTimeout(() => {
      setStage("crack")
      play("hatch")
    }, 600)
    const t2 = setTimeout(() => {
      setStage("hatch")
      play("unlock")
    }, 1600)
    const t3 = setTimeout(() => {
      setStage("reveal")
      play("achievement")
    }, 2400)
    const t4 = setTimeout(dismiss, 5000)

    return () => {
      clearTimeout(t0)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [recentlyUnlocked, turtle, play, dismiss])

  return (
    <AnimatePresence>
      {stage !== "idle" && stage !== "done" && turtle && (
        <motion.div
          key="unlock-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={dismiss}
        >
          <Confetti show={stage === "reveal"} />

          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
            onClick={(e) => e.stopPropagation()}
          >
            {stage === "egg" && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
              >
                <EggIcon stage="idle" />
              </motion.div>
            )}

            {stage === "crack" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, -3, 3, 0] }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
              >
                <EggIcon stage="crack" />
              </motion.div>
            )}

            {stage === "hatch" && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: 1,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <EggIcon stage="hatch" />
              </motion.div>
            )}

            {stage === "reveal" && (
              <>
                <motion.div
                  initial={{ scale: 0, y: 30, rotate: -180 }}
                  animate={{ scale: 1, y: 0, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 140, damping: 14 }}
                  className="flex flex-col items-center gap-4"
                >
                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                      rotate: [0, 3, -3, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-7xl sm:text-8xl"
                  >
                    {turtle.emoji}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                  >
                    <p className="text-small font-medium text-soft-yellow uppercase tracking-wider">
                      New Turtle Discovered!
                    </p>
                    <h3 className="mt-1 text-h3 font-bold text-white">
                      {turtle.name}
                    </h3>
                    <p className="mt-1 max-w-xs text-small text-white/70">
                      {turtle.description}
                    </p>
                  </motion.div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-caption text-white/40"
                >
                  Tap anywhere to continue
                </motion.p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
