import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Rarity } from "@/lib/turtle-data"
import { turtleDefinitions } from "@/lib/turtle-data"

export type View =
  | "loading"
  | "world"
  | "turtle-village"
  | "dino-valley"
  | "heart-lake"
  | "flower-garden"
  | "cloud-observatory"
  | "treasure-cave"
  | "game-arcade"
  | "collection"
  | "dino-message"

export type CollectibleTurtle = {
  id: string
  name: string
  emoji: string
  unlocked: boolean
  unlockedAt?: number
}

export type Achievement = {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: number
}

export type GameProgress = {
  feedTheTurtle: { highScore: number }
  eggHatch: { totalHatched: number }
  bubblePop: { highScore: number }
}

type GameState = {
  loaded: boolean
  view: View
  visited: View[]
  stars: number
  soundEnabled: boolean
  turtles: CollectibleTurtle[]
  achievements: Achievement[]
  gameProgress: GameProgress
  recipientName: string

  collectionSearch: string
  collectionRarityFilter: Rarity | "all"
  collectionSort: "default" | "rarity" | "name" | "recent"
  recentlyUnlocked: string | null

  setLoaded: (v: boolean) => void
  navigate: (view: View) => void
  addStars: (n: number) => void
  toggleSound: () => void
  unlockTurtle: (id: string) => void
  clearRecentlyUnlocked: () => void
  unlockAchievement: (id: string) => void
  setRecipientName: (name: string) => void
  updateGameProgress: (partial: Partial<GameProgress>) => void
  setCollectionSearch: (q: string) => void
  setCollectionRarityFilter: (r: Rarity | "all") => void
  setCollectionSort: (s: "default" | "rarity" | "name" | "recent") => void
}

const defaultTurtles: CollectibleTurtle[] = turtleDefinitions.map((t) => ({
  id: t.id,
  name: t.name,
  emoji: t.emoji,
  unlocked: false,
}))

const defaultAchievements: Achievement[] = [
  { id: "first-visit", name: "First Visitor", description: "Visit Turtle Island", icon: "🌟", unlocked: false },
  { id: "explorer", name: "Explorer", description: "Visit 3 locations", icon: "🗺️", unlocked: false },
  { id: "turtle-friend", name: "Turtle Friend", description: "Find your first turtle", icon: "🐢", unlocked: false },
  { id: "dino-friend", name: "Dino Friend", description: "Visit Dino Valley", icon: "🦕", unlocked: false },
  { id: "flower-collector", name: "Flower Collector", description: "Visit the flower garden", icon: "🌸", unlocked: false },
  { id: "bubble-master", name: "Bubble Master", description: "Pop 50 bubbles", icon: "🫧", unlocked: false },
  { id: "ocean-explorer", name: "Ocean Explorer", description: "Visit Heart Lake", icon: "🌊", unlocked: false },
  { id: "egg-master", name: "Egg Master", description: "Hatch 5 turtles", icon: "🥚", unlocked: false },
  { id: "treasure-hunter", name: "Treasure Hunter", description: "Open the treasure cave", icon: "💎", unlocked: false },
  { id: "champion", name: "Champion", description: "Collect all turtles", icon: "🏆", unlocked: false },
]

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      loaded: false,
      view: "loading",
      visited: [],
      stars: 0,
      soundEnabled: true,
      turtles: defaultTurtles,
      achievements: defaultAchievements,
      gameProgress: {
        feedTheTurtle: { highScore: 0 },
        eggHatch: { totalHatched: 0 },
        bubblePop: { highScore: 0 },
      },
      recipientName: "You",

      collectionSearch: "",
      collectionRarityFilter: "all",
      collectionSort: "default",
      recentlyUnlocked: null,

      setLoaded: (v) => set({ loaded: v }),
      navigate: (view) => {
        const state = get()
        const newVisited = state.visited.includes(view)
          ? state.visited
          : [...state.visited, view]
        set({ view, visited: newVisited })

        if (newVisited.length >= 3) {
          const ach = state.achievements.find((a) => a.id === "explorer")
          if (ach && !ach.unlocked) get().unlockAchievement("explorer")
        }
        if (view === "dino-valley") {
          const ach = state.achievements.find((a) => a.id === "dino-friend")
          if (ach && !ach.unlocked) get().unlockAchievement("dino-friend")
        }
        if (view === "heart-lake") {
          const ach = state.achievements.find((a) => a.id === "ocean-explorer")
          if (ach && !ach.unlocked) get().unlockAchievement("ocean-explorer")
        }
        if (view === "flower-garden") {
          const ach = state.achievements.find((a) => a.id === "flower-collector")
          if (ach && !ach.unlocked) get().unlockAchievement("flower-collector")
        }
      },
      addStars: (n) => set((s) => ({ stars: s.stars + n })),
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      unlockTurtle: (id) =>
        set((s) => {
          const alreadyUnlocked = s.turtles.find((t) => t.id === id)?.unlocked
          if (alreadyUnlocked) return s
          return {
            turtles: s.turtles.map((t) =>
              t.id === id ? { ...t, unlocked: true, unlockedAt: Date.now() } : t,
            ),
            recentlyUnlocked: id,
          }
        }),
      clearRecentlyUnlocked: () => set({ recentlyUnlocked: null }),
      unlockAchievement: (id) =>
        set((s) => ({
          achievements: s.achievements.map((a) =>
            a.id === id && !a.unlocked
              ? { ...a, unlocked: true, unlockedAt: Date.now() }
              : a,
          ),
        })),
      setRecipientName: (name) => set({ recipientName: name }),
      updateGameProgress: (partial) =>
        set((s) => ({
          gameProgress: { ...s.gameProgress, ...partial },
        })),
      setCollectionSearch: (q) => set({ collectionSearch: q }),
      setCollectionRarityFilter: (r) => set({ collectionRarityFilter: r }),
      setCollectionSort: (s) => set({ collectionSort: s }),
    }),
    {
      name: "turtle-island",
      partialize: (state) => ({
        turtles: state.turtles,
        achievements: state.achievements,
        stars: state.stars,
        visited: state.visited,
        soundEnabled: state.soundEnabled,
        recipientName: state.recipientName,
        gameProgress: state.gameProgress,
      }),
    },
  ),
)
