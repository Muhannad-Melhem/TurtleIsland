import { NextRequest } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { badRequest } from "@/lib/errors"

export function getBody<T>(request: NextRequest): Promise<T> {
  return request.json().catch(() => {
    throw badRequest("Invalid JSON body")
  })
}

export function getDeviceId(request: NextRequest): string | null {
  const deviceId = request.nextUrl.searchParams.get("deviceId")
  if (!deviceId) return null
  return deviceId
}

export async function getOrCreatePlayer(deviceId: string) {
  let player = await prisma.player.findUnique({ where: { deviceId } })
  if (!player) {
    player = await prisma.player.create({
      data: { deviceId, name: "Player" },
    })
    await prisma.setting.create({
      data: { playerId: player.id },
    })
    await prisma.playerProgress.create({
      data: { playerId: player.id },
    })
  }
  return player
}

export async function getPlayerOrThrow(deviceId: string) {
  const player = await prisma.player.findUnique({ where: { deviceId } })
  if (!player) throw badRequest("Player not found. Provide a valid deviceId.")
  return player
}
