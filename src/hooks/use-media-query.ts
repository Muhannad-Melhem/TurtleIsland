"use client"

import { useSyncExternalStore } from "react"

function subscribe(query: string) {
  return (callback: () => void) => {
    if (typeof window === "undefined") return () => {}
    const mq = window.matchMedia(query)
    mq.addEventListener("change", callback)
    return () => mq.removeEventListener("change", callback)
  }
}

function getSnapshot(query: string) {
  return () => {
    if (typeof window === "undefined") return false
    return window.matchMedia(query).matches
  }
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    subscribe(query),
    getSnapshot(query),
    () => false,
  )
}
