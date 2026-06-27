import { z } from "zod"

export const playerIdSchema = z.object({
  deviceId: z.string().min(1, "deviceId is required").max(256),
})

export const starsSchema = z.object({
  delta: z.number().int().min(-1000).max(1000),
})

export const unlockTurtleSchema = z.object({
  deviceId: z.string().min(1),
  turtleId: z.string().min(1, "turtleId is required"),
})

export const unlockAchievementSchema = z.object({
  deviceId: z.string().min(1),
  achievementId: z.string().min(1, "achievementId is required"),
})

export const scoreSchema = z.object({
  deviceId: z.string().min(1),
  gameType: z.enum(["feed-the-turtle", "bubble-pop", "egg-hatch"]),
  score: z.number().int().min(0),
})

export const progressSchema = z.object({
  deviceId: z.string().min(1),
  visitedIslands: z.array(z.string()).optional(),
  totalRipples: z.number().int().min(0).optional(),
  treasureUnlocked: z.boolean().optional(),
  stars: z.number().int().min(0).optional(),
})

export const settingsSchema = z.object({
  deviceId: z.string().min(1),
  theme: z.enum(["light", "dark", "system"]).optional(),
  audioEnabled: z.boolean().optional(),
  soundEnabled: z.boolean().optional(),
})

export const visitedIslandsSchema = z.object({
  deviceId: z.string().min(1),
  island: z.string().min(1),
})
