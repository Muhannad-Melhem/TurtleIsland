export type PlayerResponse = {
  player: {
    id: string
    deviceId: string
    name: string
    stars: number
  }
  turtles: Array<{
    id: string
    unlockedAt: string
  }>
  achievements: Array<{
    id: string
    unlockedAt: string
  }>
  scores: Record<
    string,
    {
      highScore: number
      lastScore: number
    }
  >
  progress: {
    visitedIslands: string[]
    totalRipples: number
    treasureUnlocked: boolean
  }
  settings: {
    theme: string
    audioEnabled: boolean
    soundEnabled: boolean
  }
}

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string; message: string }

export type ApiSuccess = {
  success: boolean
  newlyUnlocked?: boolean
  visited?: string[]
}
