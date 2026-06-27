"use client"

import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

type AnimatedListProps<T> = {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  keyExtractor: (item: T, index: number) => string | number
  className?: string
  itemClassName?: string
  staggerDelay?: number
}

export function AnimatedList<T>({
  items,
  renderItem,
  keyExtractor,
  className,
  itemClassName,
  staggerDelay = 0.05,
}: AnimatedListProps<T>) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return (
      <div className={className}>
        {items.map((item, i) => (
          <div key={keyExtractor(item, i)} className={itemClassName}>
            {renderItem(item, i)}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={className}>
      <AnimatePresence mode="popLayout">
        {items.map((item, i) => (
          <motion.div
            key={keyExtractor(item, i)}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{
              delay: i * staggerDelay,
              type: "spring",
              stiffness: 120,
              damping: 18,
            }}
            className={cn("will-change-transform", itemClassName)}
          >
            {renderItem(item, i)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
