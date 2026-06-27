"use client"

import { motion } from "motion/react"

type EggStage = "idle" | "crack" | "hatch" | "wave"

export function EggIcon({ stage }: { stage: EggStage }) {
  const cracks = stage === "crack" || stage === "hatch"
  return (
    <svg width="120" height="150" viewBox="0 0 120 150" fill="none">
      <motion.ellipse
        cx="60"
        cy="85"
        rx="45"
        ry="55"
        fill="#FFF8ED"
        stroke="#D8C8FF"
        strokeWidth="3"
        animate={
          stage === "crack"
            ? { pathLength: [1, 0.99] }
            : stage === "hatch"
              ? { scale: [1, 1.1], opacity: [1, 0] }
              : {}
        }
        transition={{ duration: 0.5 }}
      />
      {cracks && (
        <>
          <motion.path
            d="M40 60 L50 80 L42 100"
            stroke="#2F3640"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.path
            d="M80 55 L72 75 L78 95"
            stroke="#2F3640"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          />
          <motion.path
            d="M55 45 L60 65 L58 50"
            stroke="#2F3640"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          />
        </>
      )}
    </svg>
  )
}

export function TurtleIcon({
  waving,
  size = 80,
}: {
  waving?: boolean
  size?: number
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      animate={
        waving
          ? {
              rotate: [0, -10, 10, -10, 0],
              transition: { duration: 0.6, repeat: Infinity, repeatDelay: 1.5 },
            }
          : { y: [0, -2, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } }
      }
    >
      <ellipse cx="40" cy="50" rx="28" ry="18" fill="#7FD8F7" />
      <ellipse cx="40" cy="48" rx="22" ry="14" fill="#B8F2D6" opacity="0.5" />
      <circle cx="30" cy="40" r="4" fill="#2F3640" />
      <circle cx="50" cy="40" r="4" fill="#2F3640" />
      <circle cx="31" cy="39" r="1.5" fill="white" />
      <circle cx="51" cy="39" r="1.5" fill="white" />
      <motion.path
        d="M38 46 Q40 50 42 46"
        stroke="#2F3640"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        animate={{ scaleY: [1, 0.3, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <circle cx="32" cy="56" r="5" fill="#6BCF9A" />
      <circle cx="48" cy="56" r="5" fill="#6BCF9A" />
      <circle cx="28" cy="38" r="2" fill="#FFA8A8" />
      <circle cx="52" cy="38" r="2" fill="#FFA8A8" />
      {waving && (
        <motion.path
          d="M58 28 Q65 24 62 18"
          stroke="#7FD8F7"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          animate={{ rotate: [0, -20, 0], originX: 58, originY: 28 }}
          transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 1 }}
        />
      )}
    </motion.svg>
  )
}
