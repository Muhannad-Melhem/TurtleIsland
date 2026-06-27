import { NextRequest } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { getBody, getPlayerOrThrow } from "@/lib/api-helpers"
import { handleApiError } from "@/lib/errors"
import { unlockAchievementSchema } from "@/lib/validation"

export async function PUT(request: NextRequest) {
  try {
    const body = await getBody<{
      deviceId: string
      achievementId: string
    }>(request)

    const { deviceId, achievementId } = unlockAchievementSchema.parse(body)
    const player = await getPlayerOrThrow(deviceId)

    const existing = await prisma.achievement.findUnique({
      where: {
        playerId_achievementId: {
          playerId: player.id,
          achievementId,
        },
      },
    })

    if (!existing) {
      await prisma.achievement.create({
        data: { playerId: player.id, achievementId },
      })
    }

    return Response.json({ success: true, newlyUnlocked: !existing })
  } catch (error) {
    return handleApiError(error)
  }
}
