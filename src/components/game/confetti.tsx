"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"

type ConfettiPiece = {
  id: number
  x: number
  color: string
  rotation: number
  scale: number
  delay: number
  driftX: number
  fallDuration: number
}

const colors = ["#FFA8A8", "#7FD8F7", "#B8F2D6", "#D8C8FF", "#FFE89C", "#FF6B6B", "#48D8B6"]

type ConfettiProps = {
  show: boolean
  count?: number
}

export function Confetti({ show, count = 30 }: ConfettiProps) {
  const [pieces] = useState<ConfettiPiece[]>(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 1,
      delay: Math.random() * 0.3,
      driftX: (Math.random() - 0.5) * 200,
      fallDuration: 1.5 + Math.random() * 1.5,
    })),
  )

  return (
    <AnimatePresence>
      {show && (
        <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
          {pieces.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute rounded-sm"
              style={{
                left: `${piece.x}%`,
                top: -20,
                width: 6 * piece.scale,
                height: 10 * piece.scale,
                backgroundColor: piece.color,
                rotate: piece.rotation,
              }}
              initial={{ y: -20, opacity: 1, rotate: 0 }}
              animate={{
                y: ["0vh", "100vh"],
                x: [0, piece.driftX],
                rotate: 360 + piece.rotation,
                opacity: [1, 1, 0],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: piece.fallDuration,
                delay: piece.delay,
                ease: [0.32, 0.72, 0, 1],
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}
