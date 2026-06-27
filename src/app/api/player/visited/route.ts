import { NextRequest } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { getBody, getPlayerOrThrow } from "@/lib/api-helpers"
import { handleApiError } from "@/lib/errors"
import { visitedIslandsSchema } from "@/lib/validation"

export async function PUT(request: NextRequest) {
  try {
    const body = await getBody<{ deviceId: string; island: string }>(request)
    const { deviceId, island } = visitedIslandsSchema.parse(body)
    const player = await getPlayerOrThrow(deviceId)

    const progress = await prisma.playerProgress.findUnique({
      where: { playerId: player.id },
    })

    const visited: string[] = progress?.visitedIslands
      ? JSON.parse(progress.visitedIslands)
      : []

    if (!visited.includes(island)) {
      visited.push(island)
      await prisma.playerProgress.update({
        where: { playerId: player.id },
        data: { visitedIslands: JSON.stringify(visited) },
      })
    }

    return Response.json({ success: true, visited })
  } catch (error) {
    return handleApiError(error)
  }
}
