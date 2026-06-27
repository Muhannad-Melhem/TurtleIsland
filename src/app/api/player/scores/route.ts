import { NextRequest } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { getBody, getPlayerOrThrow } from "@/lib/api-helpers"
import { handleApiError, badRequest } from "@/lib/errors"
import { scoreSchema } from "@/lib/validation"

export async function POST(request: NextRequest) {
  try {
    const body = await getBody<{
      deviceId: string
      gameType: string
      score: number
    }>(request)

    const { deviceId, gameType, score } = scoreSchema.parse(body)
    const player = await getPlayerOrThrow(deviceId)

    const existing = await prisma.gameScore.findUnique({
      where: {
        playerId_gameType: { playerId: player.id, gameType },
      },
    })

    if (existing) {
      if (score > existing.highScore) {
        await prisma.gameScore.update({
          where: { id: existing.id },
          data: { score, highScore: score },
        })
      } else {
        await prisma.gameScore.update({
          where: { id: existing.id },
          data: { score },
        })
      }
    } else {
      await prisma.gameScore.create({
        data: {
          playerId: player.id,
          gameType,
          score,
          highScore: score,
        },
      })
    }

    return Response.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
