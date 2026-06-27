"use client"

import { motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

type RevealTextProps = {
  text: string
  className?: string
  delay?: number
  staggerDelay?: number
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
}

function splitText(text: string): string[] {
  return text.split("").map((char) => (char === " " ? "\u00A0" : char))
}

export function RevealText({
  text,
  className,
  delay = 0,
  staggerDelay = 0.03,
  as: Tag = "span",
}: RevealTextProps) {
  const prefersReduced = useReducedMotion()
  const chars = splitText(text)

  if (prefersReduced) {
    return <Tag className={className}>{text}</Tag>
  }

  return (
    <Tag className={cn("inline-flex flex-wrap", className)} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0, y: 20, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: delay + i * staggerDelay,
            type: "spring",
            stiffness: 120,
            damping: 18,
          }}
          className="inline-block"
          aria-hidden
        >
          {char}
        </motion.span>
      ))}
    </Tag>
  )
}
