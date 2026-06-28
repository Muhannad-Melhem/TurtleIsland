"use client"

import { useCallback, useRef } from "react"
import { useGameStore } from "@/store/game-store"

type SoundName =
  | "click"
  | "hatch"
  | "splash"
  | "pop"
  | "achievement"
  | "unlock"
  | "ambient"

let audioContext: AudioContext | null = null
if (typeof AudioContext !== "undefined") {
  try {
    audioContext = new AudioContext()
    if (audioContext.state === "suspended") {
      const resume = () => {
        audioContext?.resume()
        document.removeEventListener("touchstart", resume)
        document.removeEventListener("click", resume)
      }
      document.addEventListener("touchstart", resume, { once: true })
      document.addEventListener("click", resume, { once: true })
    }
  } catch {
    audioContext = null
  }
}

function playTone(
  ctx: AudioContext,
  frequency: number,
  duration: number,
  type: OscillatorType = "sine",
  gain = 0.15,
) {
  const osc = ctx.createOscillator()
  const gainNode = ctx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(frequency, ctx.currentTime)
  gainNode.gain.setValueAtTime(gain, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
  osc.connect(gainNode)
  gainNode.connect(ctx.destination)
  osc.start()
  osc.stop(ctx.currentTime + duration)
}

function playSound(name: SoundName) {
  if (!audioContext) return
  const ctx = audioContext

  switch (name) {
    case "click":
      playTone(ctx, 800, 0.08, "sine", 0.08)
      break
    case "hatch":
      playTone(ctx, 400, 0.15, "triangle", 0.12)
      setTimeout(() => playTone(ctx, 600, 0.15, "triangle", 0.1), 150)
      setTimeout(() => playTone(ctx, 800, 0.2, "triangle", 0.1), 300)
      break
    case "splash":
      playTone(ctx, 200, 0.3, "sine", 0.08)
      playTone(ctx, 100, 0.4, "triangle", 0.04)
      break
    case "pop":
      playTone(ctx, 600, 0.1, "sine", 0.1)
      break
    case "achievement":
      playTone(ctx, 523, 0.15, "sine", 0.12)
      setTimeout(() => playTone(ctx, 659, 0.15, "sine", 0.12), 100)
      setTimeout(() => playTone(ctx, 784, 0.2, "sine", 0.12), 200)
      setTimeout(() => playTone(ctx, 1047, 0.3, "sine", 0.12), 300)
      break
    case "unlock":
      playTone(ctx, 440, 0.12, "triangle", 0.1)
      setTimeout(() => playTone(ctx, 660, 0.12, "triangle", 0.1), 80)
      setTimeout(() => playTone(ctx, 880, 0.2, "triangle", 0.1), 160)
      break
    case "ambient":
      break
  }
}

export function useSound() {
  const soundEnabled = useGameStore((s) => s.soundEnabled)
  const lastPlayed = useRef<Record<string, number>>({})

  const play = useCallback(
    (name: SoundName) => {
      if (!soundEnabled) return

      const now = Date.now()
      const last = lastPlayed.current[name] || 0
      if (now - last < 50) return
      lastPlayed.current[name] = now

      playSound(name)
    },
    [soundEnabled],
  )

  return { play }
}
