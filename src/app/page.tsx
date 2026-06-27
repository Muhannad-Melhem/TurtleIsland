"use client"

import { useEffect } from "react"
import { AnimatePresence } from "motion/react"
import { useGameStore } from "@/store/game-store"
import { LoadingScreen } from "@/components/game/loading-screen"
import { WorldMap } from "@/components/game/world-map"
import { TurtleVillage } from "@/components/game/turtle-village"
import { DinoValley } from "@/components/game/dino-valley"
import { HeartLake } from "@/components/game/heart-lake"
import { FlowerGarden } from "@/components/game/flower-garden"
import { CloudObservatory } from "@/components/game/cloud-observatory"
import { TreasureCave } from "@/components/game/treasure-cave"
import { GameArcade } from "@/components/game/game-arcade"
import { TurtleCollection } from "@/components/game/turtle-collection"
import { DinoMessage } from "@/components/game/dino-message"
import { UnlockAnimation } from "@/components/game/unlock-animation"
import { AmbientBackground } from "@/components/game/ambient-background"
import { TurtleCursor } from "@/components/game/turtle-cursor"

function ViewRenderer() {
  const view = useGameStore((s) => s.view)

  switch (view) {
    case "turtle-village":
      return <TurtleVillage />
    case "dino-valley":
      return <DinoValley />
    case "heart-lake":
      return <HeartLake />
    case "flower-garden":
      return <FlowerGarden />
    case "cloud-observatory":
      return <CloudObservatory />
    case "treasure-cave":
      return <TreasureCave />
    case "game-arcade":
      return <GameArcade />
    case "collection":
      return <TurtleCollection />
    case "dino-message":
      return <DinoMessage />
    default:
      return <WorldMap />
  }
}

export default function Home() {
  const view = useGameStore((s) => s.view)
  const loaded = useGameStore((s) => s.loaded)
  const navigate = useGameStore((s) => s.navigate)

  useEffect(() => {
    if (loaded && view === "loading") {
      navigate("world")
    }
  }, [loaded, view, navigate])

  return (
    <>
      <TurtleCursor />
      <UnlockAnimation />
      <AmbientBackground
        showClouds={view === "world" || view === "turtle-village" || view === "dino-valley"}
        showBubbles={view === "heart-lake" || view === "world"}
        showSparkles={view === "cloud-observatory" || view === "treasure-cave"}
      />

      <AnimatePresence mode="wait">
        {view === "loading" ? (
          <LoadingScreen key="loading" />
        ) : (
          <ViewRenderer key={view} />
        )}
      </AnimatePresence>
    </>
  )
}
