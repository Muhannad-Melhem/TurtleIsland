import type { PlayerResponse } from "@/types/api"

const BASE_URL = "/api"

function getDeviceId(): string {
  if (typeof window === "undefined") return "server"
  let id = localStorage.getItem("turtle-device-id")
  if (!id) {
    id = crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)
    localStorage.setItem("turtle-device-id", id)
  }
  return id
}

async function request<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message ?? `Request failed with status ${res.status}`)
  }

  return res.json()
}

export const api = {
  getPlayer: () =>
    request<PlayerResponse>(`/player?deviceId=${getDeviceId()}`),

  createPlayer: () =>
    request<{ player: { id: string; deviceId: string; name: string; stars: number } }>(
      "/player",
      {
        method: "POST",
        body: JSON.stringify({ deviceId: getDeviceId() }),
      },
    ),

  updateProgress: (data: {
    visitedIslands?: string[]
    totalRipples?: number
    treasureUnlocked?: boolean
    stars?: number
  }) =>
    request<{ success: boolean }>("/player/progress", {
      method: "PUT",
      body: JSON.stringify({ deviceId: getDeviceId(), ...data }),
    }),

  unlockTurtle: (turtleId: string) =>
    request<{ success: boolean; newlyUnlocked: boolean }>("/player/turtles", {
      method: "PUT",
      body: JSON.stringify({ deviceId: getDeviceId(), turtleId }),
    }),

  unlockAchievement: (achievementId: string) =>
    request<{ success: boolean; newlyUnlocked: boolean }>(
      "/player/achievements",
      {
        method: "PUT",
        body: JSON.stringify({ deviceId: getDeviceId(), achievementId }),
      },
    ),

  saveScore: (gameType: string, score: number) =>
    request<{ success: boolean }>("/player/scores", {
      method: "POST",
      body: JSON.stringify({ deviceId: getDeviceId(), gameType, score }),
    }),

  updateSettings: (data: {
    theme?: string
    audioEnabled?: boolean
    soundEnabled?: boolean
  }) =>
    request<{ success: boolean }>("/player/settings", {
      method: "PUT",
      body: JSON.stringify({ deviceId: getDeviceId(), ...data }),
    }),

  visitIsland: (island: string) =>
    request<{ success: boolean; visited: string[] }>("/player/visited", {
      method: "PUT",
      body: JSON.stringify({ deviceId: getDeviceId(), island }),
    }),
}
