import { NextRequest } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { getBody, getPlayerOrThrow } from "@/lib/api-helpers"
import { handleApiError } from "@/lib/errors"
import { settingsSchema } from "@/lib/validation"

export async function PUT(request: NextRequest) {
  try {
    const body = await getBody<{
      deviceId: string
      theme?: string
      audioEnabled?: boolean
      soundEnabled?: boolean
    }>(request)

    const { deviceId, theme, audioEnabled, soundEnabled } =
      settingsSchema.parse(body)

    const player = await getPlayerOrThrow(deviceId)

    const updateData: Record<string, unknown> = {}
    if (theme !== undefined) updateData.theme = theme
    if (audioEnabled !== undefined) updateData.audioEnabled = audioEnabled
    if (soundEnabled !== undefined) updateData.soundEnabled = soundEnabled

    await prisma.setting.update({
      where: { playerId: player.id },
      data: updateData,
    })

    return Response.json({ success: true })
  } catch (error) {
    return handleApiError(error)
  }
}
