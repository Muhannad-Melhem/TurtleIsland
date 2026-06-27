import { type Variants, type Transition } from "motion/react"

export const cozySpring = {
  type: "spring",
  stiffness: 120,
  damping: 18,
  mass: 1,
} satisfies Transition

export const transitions = {
  fast: { duration: 0.2, ease: [0.32, 0.72, 0, 1] } satisfies Transition,
  medium: { duration: 0.4, ease: [0.32, 0.72, 0, 1] } satisfies Transition,
  slow: { duration: 0.7, ease: [0.32, 0.72, 0, 1] } satisfies Transition,
  spring: cozySpring,
  bouncy: {
    type: "spring",
    stiffness: 200,
    damping: 10,
    mass: 0.8,
  } satisfies Transition,
  gentle: {
    type: "spring",
    stiffness: 80,
    damping: 16,
    mass: 1,
  } satisfies Transition,
  elastic: {
    type: "spring",
    stiffness: 180,
    damping: 7,
    mass: 0.6,
  } satisfies Transition,
} as const

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.medium },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitions.spring },
}

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: { opacity: 1, y: 0, transition: transitions.spring },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: transitions.spring },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: transitions.spring },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
}

export const staggerChildren: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: transitions.spring },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: transitions.spring },
}

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 14 },
  },
}

export const floating: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
  },
}

export const slowFloat: Variants = {
  animate: {
    y: [0, -12, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
}

export const wiggle: Variants = {
  animate: {
    rotate: [0, -4, 4, -4, 0],
    transition: { duration: 0.6, repeat: Infinity, repeatDelay: 3 },
  },
}

export const rotateIn: Variants = {
  hidden: { opacity: 0, rotate: -180, scale: 0.5 },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 140, damping: 16 },
  },
}

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 16, scale: 0.97, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: transitions.medium,
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.97,
    filter: "blur(4px)",
    transition: transitions.fast,
  },
}

export const bubbleFloat: Variants = {
  animate: {
    y: [0, -35, 0],
    x: [0, 4, -4, 0],
    scale: [1, 1.04, 1],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  },
}

export const cloudFloat: Variants = {
  animate: {
    x: [0, 25, 0],
    transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
  },
}

export const turtleIdle: Variants = {
  animate: {
    y: [0, -2.5, 0],
    rotate: [0, 0.8, -0.8, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
}

export const dinosaurIdle: Variants = {
  animate: {
    scaleY: [1, 1.015, 1],
    y: [0, -1.5, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
}

export const shimmer: Variants = {
  animate: {
    x: ["-100%", "100%"],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
}

export const sparkle: Variants = {
  animate: {
    scale: [0, 1.2, 0],
    opacity: [0, 0.8, 0],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
}

export const ripple: Variants = {
  animate: {
    scale: [1, 2.5],
    opacity: [0.4, 0],
    transition: { duration: 2, repeat: Infinity, ease: "easeOut" },
  },
}

export const breathing: Variants = {
  animate: {
    scale: [1, 1.03, 1],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
}

export const gentleFloat: Variants = {
  animate: {
    y: [0, -5, 0],
    rotate: [0, 1, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
}

export const softFade: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: transitions.gentle,
  },
}

export const magicalAppear: Variants = {
  hidden: { opacity: 0, scale: 0.9, filter: "blur(8px)", y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
}

export const hoverLift = {
  whileHover: { y: -3, transition: transitions.spring },
  whileTap: { y: 0, transition: transitions.fast },
}

export const buttonHover = {
  whileHover: {
    scale: 1.04,
    boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
    transition: transitions.spring,
  },
  whileTap: { scale: 0.97, transition: transitions.fast },
}

export const cardHover = {
  whileHover: {
    y: -4,
    rotateX: 2,
    rotateY: -1,
    boxShadow: "0 24px 48px rgba(0,0,0,0.1)",
    transition: transitions.spring,
  },
  whileTap: { scale: 0.99, transition: transitions.fast },
}

export const magneticPull = {
  whileHover: { scale: 1.06, transition: transitions.spring },
  whileTap: { scale: 0.95, transition: transitions.fast },
}

export const pageSlide = (direction: 1 | -1 = 1): Variants => ({
  initial: {
    opacity: 0,
    x: direction * 60,
    filter: "blur(6px)",
  },
  animate: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 22 },
  },
  exit: {
    opacity: 0,
    x: direction * -60,
    filter: "blur(6px)",
    transition: { duration: 0.25, ease: [0.32, 0.72, 0, 1] },
  },
})
