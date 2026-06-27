"use client"

import { useState } from "react"
import { motion } from "motion/react"
import type { CollectibleTurtle } from "@/store/game-store"
import { getTurtleDef, rarityColors, rarityLabels } from "@/lib/turtle-data"

type TurtleCardProps = {
  turtle: CollectibleTurtle
  index: number
}

export function TurtleCard({ turtle, index }: TurtleCardProps) {
  const [tooltip, setTooltip] = useState(false)
  const def = getTurtleDef(turtle.id)
  if (!def) return null

  const borderColor = turtle.unlocked ? rarityColors[def.rarity] : "#374151"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.04, type: "spring", stiffness: 120, damping: 18 }}
      className="relative"
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}
    >
      <motion.div
        whileHover={turtle.unlocked ? { y: -4, scale: 1.03 } : { scale: 1.01 }}
        whileTap={{ scale: 0.97 }}
        className={`group relative flex flex-col items-center gap-2 rounded-2xl p-4 transition-colors cursor-pointer ${
          turtle.unlocked
            ? "bg-white/80 shadow-card backdrop-blur-sm"
            : "bg-white/20 shadow-sm backdrop-blur-sm"
        }`}
        style={{ border: `1px solid ${borderColor}40` }}
      >
        {turtle.unlocked ? (
          <motion.div
            className="relative flex h-20 w-20 items-center justify-center"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.1 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full opacity-30"
              style={{ backgroundColor: borderColor }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="relative text-4xl">{turtle.emoji}</span>
          </motion.div>
        ) : (
          <div className="flex h-20 w-20 items-center justify-center">
            <svg width="72" height="72" viewBox="0 0 80 80" fill="none" className="opacity-40">
              <ellipse cx="40" cy="50" rx="28" ry="18" fill="#374151" />
              <ellipse cx="40" cy="48" rx="22" ry="14" fill="#4B5563" opacity="0.5" />
              <circle cx="30" cy="40" r="4" fill="#4B5563" />
              <circle cx="50" cy="40" r="4" fill="#4B5563" />
              <path d="M38 46 Q40 50 42 46" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              <text x="40" y="30" textAnchor="middle" fill="#6B7280" fontSize="10">?</text>
            </svg>
          </div>
        )}

        <div className="text-center">
          <p
            className={`text-small font-semibold leading-tight ${
              turtle.unlocked ? "text-foreground" : "text-muted-foreground/50"
            }`}
          >
            {turtle.unlocked ? turtle.name : "???"}
          </p>
          <span
            className="text-caption font-medium"
            style={{ color: rarityColors[def.rarity] }}
          >
            {rarityLabels[def.rarity]}
          </span>
        </div>
      </motion.div>

      {tooltip && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute -top-2 left-1/2 z-10 w-56 -translate-x-1/2 -translate-y-full"
        >
          <div
            className={`rounded-xl p-3 text-center text-small shadow-lg backdrop-blur-md ${
              turtle.unlocked ? "bg-white/95" : "bg-gray-800/95"
            }`}
          >
            <p
              className={`font-semibold ${
                turtle.unlocked ? "text-foreground" : "text-gray-400"
              }`}
            >
              {turtle.unlocked ? turtle.name : "???"}
            </p>
            <p
              className={`mt-1 text-caption ${
                turtle.unlocked ? "text-muted-foreground" : "text-gray-500"
              }`}
            >
              {turtle.unlocked
                ? def.description
                : def.unlockHint}
            </p>
            <div className="mt-1 flex items-center justify-center gap-1">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: rarityColors[def.rarity] }}
              />
              <span className="text-caption" style={{ color: rarityColors[def.rarity] }}>
                {rarityLabels[def.rarity]}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
