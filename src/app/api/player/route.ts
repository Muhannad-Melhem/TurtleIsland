import { NextRequest } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { getBody, getDeviceId, getOrCreatePlayer } from "@/lib/api-helpers"
import { handleApiError, badRequest } from "@/lib/errors"
import { playerIdSchema } from "@/lib/validation"

export async function GET(request: NextRequest) {
  try {
    const deviceId = getDeviceId(request)
    if (!deviceId) throw badRequest("deviceId query parameter is required")

    const player = await getOrCreatePlayer(deviceId)

    const [turtles, achievements, scores, progress, settings] =
      await Promise.all([
        prisma.collectedTurtle.findMany({
          where: { playerId: player.id },
          select: { turtleId: true, unlockedAt: true },
        }),
        prisma.achievement.findMany({
          where: { playerId: player.id },
          select: { achievementId: true, unlockedAt: true },
        }),
        prisma.gameScore.findMany({
          where: { playerId: player.id },
          select: { gameType: true, highScore: true, score: true },
        }),
        prisma.playerProgress.findUnique({
          where: { playerId: player.id },
        }),
        prisma.setting.findUnique({
          where: { playerId: player.id },
        }),
      ])

    const parsedIslands = progress?.visitedIslands
      ? JSON.parse(progress.visitedIslands)
      : []

    return Response.json({
      player: {
        id: player.id,
        deviceId: player.deviceId,
        name: player.name,
        stars: player.stars,
      },
      turtles: turtles.map((t) => ({
        id: t.turtleId,
        unlockedAt: t.unlockedAt.toISOString(),
      })),
      achievements: achievements.map((a) => ({
        id: a.achievementId,
        unlockedAt: a.unlockedAt.toISOString(),
      })),
      scores: scores.reduce(
        (acc, s) => {
          acc[s.gameType] = { highScore: s.highScore, lastScore: s.score }
          return acc
        },
        {} as Record<string, { highScore: number; lastScore: number }>,
      ),
      progress: {
        visitedIslands: parsedIslands,
        totalRipples: progress?.totalRipples ?? 0,
        treasureUnlocked: progress?.treasureUnlocked ?? false,
      },
      settings: settings
        ? {
            theme: settings.theme,
            audioEnabled: settings.audioEnabled,
            soundEnabled: settings.soundEnabled,
          }
        : { theme: "system", audioEnabled: true, soundEnabled: true },
    })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await getBody<{ deviceId: string }>(request)
    const { deviceId } = playerIdSchema.parse(body)
    const player = await getOrCreatePlayer(deviceId)
    return Response.json({
      player: {
        id: player.id,
        deviceId: player.deviceId,
        name: player.name,
        stars: player.stars,
      },
    })
  } catch (error) {
    return handleApiError(error)
  }
}
