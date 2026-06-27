"use client"

import { useState } from "react"
import { motion, type TargetAndTransition } from "motion/react"
import { useGameStore } from "@/store/game-store"
import { useSound } from "@/hooks/use-sound"
import { TurtleIcon } from "./turtle-icons"

type TurtleState = {
  id: number
  x: number
  y: number
  action: "walk" | "sit" | "sleep" | "wave" | "dance" | "hide" | "eat"
  rotation: number
  scale: number
  delay: number
}

function randomAction(): TurtleState["action"] {
  const actions: TurtleState["action"][] = [
    "walk", "walk", "sit", "sleep", "wave", "dance", "hide", "eat",
  ]
  return actions[Math.floor(Math.random() * actions.length)]
}

function generateTurtles(): TurtleState[] {
  return Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: 5 + Math.random() * 90,
    y: 10 + Math.random() * 75,
    action: randomAction(),
    rotation: Math.random() > 0.5 ? 1 : -1,
    scale: 0.7 + Math.random() * 0.6,
    delay: Math.random() * 2,
  }))
}

const actionVariants: Record<string, TargetAndTransition> = {
  walk: {
    x: [0, 40, 0, -30, 0],
    y: [0, -5, 5, -3, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
  sit: {
    y: [0, -1, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
  sleep: {
    scaleY: [1, 1.02, 1],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
  wave: {
    rotate: [0, -8, 8, -8, 0],
    transition: { duration: 0.6, repeat: Infinity, repeatDelay: 2 },
  },
  dance: {
    rotate: [0, -12, 12, -12, 0],
    scale: [1, 1.1, 1, 1.1, 1],
    transition: { duration: 0.4, repeat: Infinity },
  },
  hide: {
    scale: [1, 0.3, 0.3, 1],
    y: [0, 15, 15, 0],
    transition: { duration: 3, repeat: Infinity, repeatDelay: 2 },
  },
  eat: {
    scaleY: [1, 0.95, 1],
    rotate: [0, -3, 3, 0],
    transition: { duration: 1, repeat: Infinity },
  },
}

function TurtleCharacter({ turtle }: { turtle: TurtleState }) {
  const [hovered, setHovered] = useState(false)

  const [hoverAction] = useState(() => {
    const actions: Array<"wave" | "spin" | "jump" | "hide"> = ["wave", "spin", "jump", "hide"]
    return actions[Math.floor(Math.random() * actions.length)]
  })

  const hoverVariants: Record<string, TargetAndTransition> = {
    wave: { rotate: [0, -15, 15, -15, 0], scale: [1, 1.1, 1] },
    spin: { rotate: [0, 360], scale: [1, 1.2, 1] },
    jump: { y: [0, -20, 0], scale: [1, 1.1, 1] },
    hide: { scale: [1, 0.2, 1], y: [0, 20, 0] },
  }

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${turtle.x}%`,
        top: `${turtle.y}%`,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: turtle.scale }}
      transition={{ delay: turtle.delay, type: "spring", stiffness: 120, damping: 18 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        animate={hovered ? hoverVariants[hoverAction] : actionVariants[turtle.action]}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <TurtleIcon size={48} waving={hovered} />
      </motion.div>
    </motion.div>
  )
}

export function TurtleVillage() {
  const navigate = useGameStore((s) => s.navigate)
  const { play } = useSound()
  const [turtles] = useState(generateTurtles)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-cream via-ocean/5 to-mint/10"
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
          🏘️ Turtle Village
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-body text-muted-foreground"
        >
          Say hello to the villagers!
        </motion.p>
      </div>

      <div className="relative mx-auto h-[500px] w-full max-w-4xl">
        {turtles.map((turtle) => (
          <TurtleCharacter key={turtle.id} turtle={turtle} />
        ))}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-mint/20 to-transparent" />
      </div>

      <div className="flex flex-wrap justify-center gap-8 px-4 pb-16 pt-8">
        {[
          { icon: "🏠", name: "Tiny Houses", desc: "Village homes" },
          { icon: "🌸", name: "Flower Shop", desc: "Fresh blooms" },
          { icon: "🥖", name: "Bakery", desc: "Tiny bread" },
          { icon: "🌿", name: "Garden", desc: "Peaceful green" },
          { icon: "🌉", name: "Bridge", desc: "Over the pond" },
          { icon: "🌬️", name: "Windmill", desc: "Spinning gently" },
        ].map((building, i) => (
          <motion.div
            key={building.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 120, damping: 18 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="flex flex-col items-center gap-2 rounded-2xl bg-white/60 p-4 shadow-card backdrop-blur-sm"
          >
            <span className="text-3xl">{building.icon}</span>
            <span className="text-small font-semibold">{building.name}</span>
            <span className="text-caption text-muted-foreground">{building.desc}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
