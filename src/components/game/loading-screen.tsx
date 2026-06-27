"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useGameStore } from "@/store/game-store"
import { useSound } from "@/hooks/use-sound"
import { EggIcon, TurtleIcon } from "./turtle-icons"

const loadingMessages = [
  "Building Turtle Island...",
  "Preparing tiny turtles...",
  "Growing flowers...",
  "Feeding dinosaurs...",
  "Collecting seashells...",
  "Polishing stars...",
  "Warming up the sun...",
  "Planting palm trees...",
  "Painting rainbows...",
]

function LoadingBar({ progress }: { progress: number }) {
  return (
    <div className="relative h-2 w-48 overflow-hidden rounded-full bg-white/20 sm:w-64">
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-ocean via-mint to-lavender"
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  )
}

function HatchingEgg({ onHatch, show }: { onHatch: () => void; show: boolean }) {
  const [stage, setStage] = useState<"idle" | "crack" | "hatch" | "wave">("idle")

  useEffect(() => {
    if (!show) return
    const t1 = setTimeout(() => setStage("crack"), 800)
    const t2 = setTimeout(() => setStage("hatch"), 2000)
    const t3 = setTimeout(() => {
      setStage("wave")
      onHatch()
    }, 3200)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [show, onHatch])

  if (!show) return null

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={
          stage === "idle"
            ? { scale: 1, rotate: 0 }
            : stage === "crack"
              ? { scale: 1, rotate: 0 }
              : stage === "hatch"
                ? { scale: 1.2, opacity: 0 }
                : { scale: 0, opacity: 0 }
        }
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
      >
        <EggIcon stage={stage} />
      </motion.div>

      <AnimatePresence>
        {stage === "wave" && (
          <motion.div
            initial={{ scale: 0, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="absolute"
          >
            <TurtleIcon waving />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function LoadingScreen() {
  const [showEgg, setShowEgg] = useState(false)
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  const [hatched, setHatched] = useState(false)
  const { play } = useSound()
  const setLoaded = useGameStore((s) => s.setLoaded)

  const onHatch = useCallback(() => {
    setHatched(true)
    play("hatch")
  }, [play])

  useEffect(() => {
    const t = setTimeout(() => setShowEgg(true), 400)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (progress >= 100) return
    const interval = setInterval(() => {
      setProgress((p) => {
        const inc = Math.random() * 12 + 3
        const next = Math.min(p + inc, 100)
        if (next >= 100) {
          setTimeout(() => setLoaded(true), 600)
        }
        return next
      })
    }, 400)
    return () => clearInterval(interval)
  }, [progress, setLoaded])

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((i) => (i + 1) % loadingMessages.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-16 bg-gradient-to-b from-ocean/10 via-cream to-cream"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
    >
      <div className="flex flex-col items-center gap-8">
        <HatchingEgg show={showEgg} onHatch={onHatch} />
        {hatched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 120, damping: 18 }}
            className="text-center"
          >
            <h1 className="text-display font-bold tracking-tight text-foreground">
              Turtle Island
            </h1>
            <p className="mt-2 text-body text-muted-foreground">
              A cozy adventure awaits...
            </p>
          </motion.div>
        )}
      </div>

      <div className="flex flex-col items-center gap-3">
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="text-small font-medium text-muted-foreground"
          >
            {loadingMessages[messageIndex]}
          </motion.p>
        </AnimatePresence>
        <LoadingBar progress={progress} />
        <p className="text-caption text-muted-foreground/60">
          {Math.round(progress)}%
        </p>
      </div>
    </motion.div>
  )
}
