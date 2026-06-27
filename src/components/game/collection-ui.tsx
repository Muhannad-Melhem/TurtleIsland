"use client"

import { useMemo } from "react"
import { motion } from "motion/react"
import { useGameStore } from "@/store/game-store"
import { turtleDefinitions, rarityColors, rarityLabels, rarityOrder, type Rarity } from "@/lib/turtle-data"
import { TurtleCard } from "./turtle-card"

export function CollectionProgress() {
  const turtles = useGameStore((s) => s.turtles)
  const unlocked = turtles.filter((t) => t.unlocked).length
  const total = turtles.length
  const percent = Math.round((unlocked / total) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-2"
    >
      <p className="text-small font-medium text-muted-foreground">
        {unlocked} / {total} turtles found
      </p>
      <div className="relative h-3 w-64 overflow-hidden rounded-full bg-white/30 sm:w-80">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-ocean via-lavender to-soft-yellow"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-bold text-foreground/80">
            {percent}%
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export function SearchBar() {
  const search = useGameStore((s) => s.collectionSearch)
  const setSearch = useGameStore((s) => s.setCollectionSearch)

  return (
    <div className="relative w-full max-w-xs">
      <svg
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search turtles..."
        className="w-full rounded-2xl bg-white/60 py-2 pl-10 pr-4 text-small text-foreground shadow-soft backdrop-blur-sm outline-none ring-ocean transition-all placeholder:text-muted-foreground/50 focus:ring-2"
      />
    </div>
  )
}

export function FilterBar() {
  const rarityFilter = useGameStore((s) => s.collectionRarityFilter)
  const sort = useGameStore((s) => s.collectionSort)
  const setRarityFilter = useGameStore((s) => s.setCollectionRarityFilter)
  const setSort = useGameStore((s) => s.setCollectionSort)

  const rarities: Array<"all" | Rarity> = ["all", "common", "uncommon", "rare", "epic", "legendary"]

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex flex-wrap gap-1.5">
        {rarities.map((r) => {
          const active = rarityFilter === r
          const color = r === "all" ? "#94A3B8" : rarityColors[r]
          return (
            <motion.button
              key={r}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setRarityFilter(r)}
              className={`rounded-full px-3 py-1.5 text-caption font-medium transition-all cursor-pointer ${
                active ? "text-white shadow-sm" : "bg-white/40 text-muted-foreground hover:bg-white/60"
              }`}
              style={active ? { backgroundColor: color } : {}}
            >
              {r === "all" ? "All" : rarityLabels[r]}
            </motion.button>
          )
        })}
      </div>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value as typeof sort)}
        className="rounded-2xl bg-white/60 px-3 py-1.5 text-caption font-medium text-foreground shadow-soft outline-none backdrop-blur-sm ring-ocean transition-all focus:ring-2"
      >
        <option value="default">Default</option>
        <option value="rarity">Rarity</option>
        <option value="name">Name</option>
        <option value="recent">Recent</option>
      </select>
    </div>
  )
}

export function CollectionGrid() {
  const turtles = useGameStore((s) => s.turtles)
  const search = useGameStore((s) => s.collectionSearch)
  const rarityFilter = useGameStore((s) => s.collectionRarityFilter)
  const sort = useGameStore((s) => s.collectionSort)

  const filtered = useMemo(() => {
    let result = [...turtles]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter((t) => {
        const def = turtleDefinitions.find((d) => d.id === t.id)
        return (
          t.name.toLowerCase().includes(q) ||
          def?.description.toLowerCase().includes(q)
        )
      })
    }

    if (rarityFilter !== "all") {
      const rarityIds = new Set(
        turtleDefinitions
          .filter((d) => d.rarity === rarityFilter)
          .map((d) => d.id),
      )
      result = result.filter((t) => rarityIds.has(t.id))
    }

    switch (sort) {
      case "rarity":
        result.sort((a, b) => {
          const ra = turtleDefinitions.find((d) => d.id === a.id)?.rarity ?? "common"
          const rb = turtleDefinitions.find((d) => d.id === b.id)?.rarity ?? "common"
          return rarityOrder[rb] - rarityOrder[ra]
        })
        break
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "recent":
        result.sort((a, b) => {
          if (a.unlocked && b.unlocked) return (b.unlockedAt ?? 0) - (a.unlockedAt ?? 0)
          if (a.unlocked) return -1
          if (b.unlocked) return 1
          return 0
        })
        break
      default:
        result.sort((a, b) => {
          if (a.unlocked && !b.unlocked) return -1
          if (!a.unlocked && b.unlocked) return 1
          const order = turtleDefinitions.findIndex((d) => d.id === a.id) -
            turtleDefinitions.findIndex((d) => d.id === b.id)
          return order
        })
    }

    return result
  }, [turtles, search, rarityFilter, sort])

  if (filtered.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-4 py-16 text-center"
      >
        <span className="text-5xl opacity-40">🔍</span>
        <p className="text-body text-muted-foreground">No turtles match your search</p>
        <p className="text-small text-muted-foreground/60">Try a different filter</p>
      </motion.div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {filtered.map((turtle, i) => (
          <TurtleCard key={turtle.id} turtle={turtle} index={i} />
        ))}
    </div>
  )
}
