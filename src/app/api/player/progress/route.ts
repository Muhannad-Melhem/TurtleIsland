import { NextRequest } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { getBody, getPlayerOrThrow } from "@/lib/api-helpers"
import { handleApiError } from "@/lib/errors"
import { progressSchema } from "@/lib/validation"

export async function PUT(request: NextRequest) {
  try {
    const body = await getBody<{
      deviceId: string
      visitedIslands?: string[]
      totalRipples?: number
      treasureUnlocked?: boolean
      stars?: number
    }>(request)

    const { deviceId, visitedIslands, totalRipples, treasureUnlocked, stars } =
      progressSchema.parse(body)

    const player = await getPlayerOrThrow(deviceId)

    const updateData: Record<string, unknown> = {}
    if (visitedIslands !== undefined) {
      updateData.visitedIslands = JSON.stringify(visitedIslands)
    }
    if (totalRipples !== undefined) {
      updateData.totalRipples = totalRipples
    }
    if (treasureUnlocked !== undefined) {
      updateData.treasureUnlocked = treasureUnlocked
    }

    await Promise.all([
      Object.keys(updateData).length > 0
        ? prisma.playerProgress.update({
            where: { playerId: player.id },
            data: updateData,
          })
        : Promise.resolve(),
      stars !== undefined
        ? prisma.player.update({
            where: { id: player.id },
            data: { stars },
          })
        : Promise.resolve(),
    ])

    return Response.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
