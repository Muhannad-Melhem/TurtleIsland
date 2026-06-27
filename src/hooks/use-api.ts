"use client"

import { useCallback, useEffect, useRef } from "react"
import { api } from "@/lib/api-client"
import { useGameStore } from "@/store/game-store"

export function useApiSync() {
  const initialized = useRef(false)
  const navigate = useGameStore((s) => s.navigate)
  const addStars = useGameStore((s) => s.addStars)
  const unlockTurtle = useGameStore((s) => s.unlockTurtle)
  const unlockAchievement = useGameStore((s) => s.unlockAchievement)
  const updateGameProgress = useGameStore((s) => s.updateGameProgress)
  const setRecipientName = useGameStore((s) => s.setRecipientName)
  const toggleSound = useGameStore((s) => s.toggleSound)
  const stars = useGameStore((s) => s.stars)
  const soundEnabled = useGameStore((s) => s.soundEnabled)

  const syncProgress = useCallback(
    async (visited?: string[], starCount?: number) => {
      try {
        await api.updateProgress({
          visitedIslands: visited,
          stars: starCount,
        })
      } catch {
        // silently fail — state is always persisted locally
      }
    },
    [],
  )

  const syncTurtle = useCallback(
    async (turtleId: string) => {
      try {
        await api.unlockTurtle(turtleId)
      } catch {
        // silent
      }
    },
    [],
  )

  const syncAchievement = useCallback(
    async (achievementId: string) => {
      try {
        await api.unlockAchievement(achievementId)
      } catch {
        // silent
      }
    },
    [],
  )

  const syncScore = useCallback(
    async (gameType: string, score: number) => {
      try {
        await api.saveScore(gameType, score)
      } catch {
        // silent
      }
    },
    [],
  )

  const syncSettings = useCallback(
    async (data: {
      theme?: string
      soundEnabled?: boolean
      audioEnabled?: boolean
    }) => {
      try {
        await api.updateSettings(data)
      } catch {
        // silent
      }
    },
    [],
  )

  return {
    syncProgress,
    syncTurtle,
    syncAchievement,
    syncScore,
    syncSettings,
  }
}
