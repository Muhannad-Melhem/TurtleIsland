"use client"

import { useScroll, useTransform, type MotionValue } from "motion/react"
import { useRef } from "react"

type ParallaxOptions = {
  offset?: number[]
  inputRange?: number[]
  target?: MotionValue<number>
}

export function useParallax(
  outputRange: [number, number],
  options: ParallaxOptions = {},
) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: options.offset ?? ["start end", "end start"],
  })

  const motionValue = options.target ?? scrollYProgress
  const transform = useTransform(
    motionValue,
    options.inputRange ?? [0, 1],
    outputRange,
  )

  return { ref, transform, scrollYProgress: motionValue }
}
