"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { useGameStore } from "@/store/game-store"
import { useSound } from "@/hooks/use-sound"

function DriftingCloud() {
  const [y] = useState(() => Math.random() * 50)
  const [size] = useState(() => 0.8 + Math.random() * 1.5)
  const [duration] = useState(() => 20 + Math.random() * 20)
  const [startX] = useState(() => -(Math.random() * 100))

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: `${y}%`, left: `${startX}%`, fontSize: `${size}rem` }}
      animate={{ x: [`${startX}%`, `${100 - startX}%`] }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      ☁️
    </motion.div>
  )
}

function Star() {
  const [x] = useState(() => Math.random() * 100)
  const [y] = useState(() => Math.random() * 60)
  const [delay] = useState(() => Math.random() * 4)
  const [size] = useState(() => 0.6 + Math.random() * 0.8)
  const [animDuration] = useState(() => 2 + Math.random() * 2)

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, fontSize: `${size}rem` }}
      animate={{
        opacity: [0, 1, 0.3, 1, 0],
        scale: [0.5, 1.2, 0.8, 1.5, 0.5],
      }}
      transition={{ duration: animDuration, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      ✨
    </motion.div>
  )
}

function ShootingStar() {
  const [delay] = useState(() => Math.random() * 15)
  return (
    <motion.div
      className="absolute text-lg pointer-events-none"
      style={{ top: "5%", left: "80%" }}
      animate={{
        x: [-100, 200],
        y: [0, 80],
        opacity: [0, 1, 0],
        rotate: -30,
      }}
      transition={{ duration: 2, repeat: Infinity, delay, ease: "easeOut" }}
    >
      ⭐
    </motion.div>
  )
}

function Rainbow() {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: "20%", left: "50%" }}
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 0.4, scaleX: 1 }}
      transition={{ duration: 2, delay: 1, ease: "easeOut" }}
    >
      🌈
    </motion.div>
  )
}

function Constellation() {
  const [stars] = useState(() => {
    const positions = [
      { x: 60, y: 20 }, { x: 68, y: 24 }, { x: 65, y: 32 },
      { x: 55, y: 28 }, { x: 72, y: 30 },
    ]
    return positions.map((p, i) => ({
      ...p,
      delay: i * 0.3,
      size: 0.8 + Math.random() * 0.4,
    }))
  })

  return (
    <div className="absolute left-0 top-0 h-full w-full pointer-events-none">
      <svg className="absolute left-[50%] top-[18%] h-40 w-40 -translate-x-1/2" viewBox="0 0 100 100">
        <line x1="60" y1="20" x2="68" y2="24" stroke="rgba(255,232,156,0.3)" strokeWidth="1" />
        <line x1="68" y1="24" x2="65" y2="32" stroke="rgba(255,232,156,0.3)" strokeWidth="1" />
        <line x1="65" y1="32" x2="55" y2="28" stroke="rgba(255,232,156,0.3)" strokeWidth="1" />
        <line x1="55" y1="28" x2="60" y2="20" stroke="rgba(255,232,156,0.3)" strokeWidth="1" />
        <line x1="68" y1="24" x2="72" y2="30" stroke="rgba(255,232,156,0.3)" strokeWidth="1" />
      </svg>
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className="absolute text-soft-yellow"
          style={{ left: `${50 + (s.x - 60)}%`, top: `${18 + s.y - 20}%`, fontSize: `${s.size}rem` }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
        >
          ✦
        </motion.div>
      ))}
    </div>
  )
}

export function CloudObservatory() {
  const navigate = useGameStore((s) => s.navigate)
  const { play } = useSound()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460]"
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
          ☁️ Cloud Observatory
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-body text-white/70"
        >
          Gaze at the stars
        </motion.p>
      </div>

      <DriftingCloud />
      <DriftingCloud />
      <DriftingCloud />

      {Array.from({ length: 8 }).map((_, i) => (
          <Star key={i} />
      ))}

      <ShootingStar />

      <div className="relative mx-auto mt-8 h-[400px] w-full max-w-4xl">
        <Constellation />
        <Rainbow />
      </div>

      <div className="flex flex-wrap justify-center gap-8 px-4 pb-16 pt-8">
        {[
          { icon: "🔭", name: "Telescope", desc: "View the cosmos" },
          { icon: "🌙", name: "Crescent Moon", desc: "Softly glowing" },
          { icon: "🌌", name: "Milky Way", desc: "Star river" },
          { icon: "📡", name: "Radio Dish", desc: "Listening to space" },
        ].map((spot, i) => (
          <motion.div
            key={spot.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 120, damping: 18 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="flex flex-col items-center gap-2 rounded-2xl bg-white/10 p-4 shadow-card backdrop-blur-sm"
          >
            <span className="text-3xl">{spot.icon}</span>
            <span className="text-small font-semibold text-white">{spot.name}</span>
            <span className="text-caption text-white/60">{spot.desc}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
