import { NextRequest } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { getBody, getPlayerOrThrow } from "@/lib/api-helpers"
import { handleApiError } from "@/lib/errors"
import { unlockTurtleSchema } from "@/lib/validation"

export async function PUT(request: NextRequest) {
  try {
    const body = await getBody<{
      deviceId: string
      turtleId: string
    }>(request)

    const { deviceId, turtleId } = unlockTurtleSchema.parse(body)
    const player = await getPlayerOrThrow(deviceId)

    const existing = await prisma.collectedTurtle.findUnique({
      where: {
        playerId_turtleId: { playerId: player.id, turtleId },
      },
    })

    if (!existing) {
      await prisma.collectedTurtle.create({
        data: { playerId: player.id, turtleId },
      })
    }

    return Response.json({ success: true, newlyUnlocked: !existing })
  } catch (error) {
    return handleApiError(error)
  }
}
