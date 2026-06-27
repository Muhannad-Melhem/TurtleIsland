"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { useGameStore } from "@/store/game-store"
import { useSound } from "@/hooks/use-sound"

function FeedTheTurtle() {
  const { play } = useSound()
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [turtlePos, setTurtlePos] = useState({ x: 50, y: 50 })
  const savedScore = useRef(false)
  const updateGameProgress = useGameStore((s) => s.updateGameProgress)
  const gameProgress = useGameStore((s) => s.gameProgress)

  const startGame = useCallback(() => {
    setScore(0)
    setTimeLeft(10)
  }, [])

  useEffect(() => {
    if (timeLeft > 0) {
      savedScore.current = false
      const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
      return () => clearTimeout(timer)
    }
    if (!savedScore.current) {
      savedScore.current = true
      const prev = gameProgress.feedTheTurtle.highScore
      if (score > prev) updateGameProgress({ feedTheTurtle: { highScore: score } })
    }
  }, [timeLeft, score, gameProgress.feedTheTurtle.highScore, updateGameProgress])

  useEffect(() => {
    if (timeLeft <= 0) return
    const interval = setInterval(() => {
      setTurtlePos({
        x: 10 + Math.random() * 75,
        y: 10 + Math.random() * 60,
      })
    }, 800)
    return () => clearInterval(interval)
  }, [timeLeft])

  const handleFeed = () => {
    if (timeLeft <= 0) return
    play("pop")
    setScore((s) => s + 1)
    setTurtlePos({
      x: 10 + Math.random() * 75,
      y: 10 + Math.random() * 60,
    })
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-h4 font-bold">🐢 Feed the Turtle</h3>
      {timeLeft <= 0 ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startGame}
          className="rounded-2xl bg-gradient-to-r from-ocean to-mint px-8 py-3 text-body font-semibold text-white shadow-floating hover:shadow-hover cursor-pointer"
        >
          {score > 0 ? "Play Again" : "Start Game"}
        </motion.button>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <p className="text-small font-medium">Score: {score} | Time: {timeLeft}s</p>
          <div className="relative h-[200px] w-[300px] overflow-hidden rounded-2xl bg-gradient-to-b from-ocean/10 to-mint/10">
            <motion.button
              className="absolute cursor-pointer text-4xl"
              style={{ left: `${turtlePos.x}%`, top: `${turtlePos.y}%` }}
              onClick={handleFeed}
              whileHover={{ scale: 1.2 }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              🐢
            </motion.button>
          </div>
        </div>
      )}
      <p className="text-caption text-muted-foreground">
        Best: {gameProgress.feedTheTurtle.highScore}
      </p>
    </div>
  )
}

function BubblePop() {
  const { play } = useSound()
  const [bubbles, setBubbles] = useState<{ id: number; x: number; y: number }[]>([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const idRef = useRef(0)
  const savedScore = useRef(false)
  const updateGameProgress = useGameStore((s) => s.updateGameProgress)
  const gameProgress = useGameStore((s) => s.gameProgress)

  const startGame = useCallback(() => {
    setScore(0)
    setTimeLeft(10)
    setBubbles([])
    idRef.current = 0
  }, [])

  useEffect(() => {
    if (timeLeft > 0) {
      savedScore.current = false
      const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
      return () => clearTimeout(timer)
    }
    if (!savedScore.current) {
      savedScore.current = true
      const prev = gameProgress.bubblePop.highScore
      if (score > prev) updateGameProgress({ bubblePop: { highScore: score } })
    }
  }, [timeLeft, score, gameProgress.bubblePop.highScore, updateGameProgress])

  useEffect(() => {
    if (timeLeft <= 0) return
    const interval = setInterval(() => {
      const id = idRef.current++
      setBubbles((prev) => [...prev, { id, x: Math.random() * 85, y: Math.random() * 70 }])
      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== id))
      }, 2000)
    }, 500)
    return () => clearInterval(interval)
  }, [timeLeft])

  const handlePop = (id: number) => {
    play("pop")
    setScore((s) => s + 1)
    setBubbles((prev) => prev.filter((b) => b.id !== id))
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-h4 font-bold">🫧 Bubble Pop</h3>
      {timeLeft <= 0 ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startGame}
          className="rounded-2xl bg-gradient-to-r from-ocean to-mint px-8 py-3 text-body font-semibold text-white shadow-floating hover:shadow-hover cursor-pointer"
        >
          {score > 0 ? "Play Again" : "Start Game"}
        </motion.button>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <p className="text-small font-medium">Score: {score} | Time: {timeLeft}s</p>
          <div className="relative h-[200px] w-[300px] overflow-hidden rounded-2xl bg-gradient-to-b from-ocean/10 to-mint/10">
            <AnimatePresence>
              {bubbles.map((bubble) => (
                <motion.button
                  key={bubble.id}
                  className="absolute cursor-pointer"
                  style={{ left: `${bubble.x}%`, top: `${bubble.y}%` }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.8 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  onClick={() => handlePop(bubble.id)}
                  whileHover={{ scale: 1.3 }}
                >
                  🫧
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
      <p className="text-caption text-muted-foreground">
        Best: {gameProgress.bubblePop.highScore}
      </p>
    </div>
  )
}

export function GameArcade() {
  const navigate = useGameStore((s) => s.navigate)
  const { play } = useSound()
  const [game, setGame] = useState<"none" | "feed" | "bubble">("none")

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-coral/10 via-soft-yellow/10 to-lavender/10"
    >
      <button
        onClick={() => { play("click"); navigate("world") }}
        className="fixed left-4 top-4 z-20 flex items-center gap-2 rounded-2xl glass px-4 py-2 text-small font-medium text-foreground shadow-soft transition-all hover:shadow-medium cursor-pointer"
      >
        ← Back
      </button>

      <div className="flex flex-col items-center px-4 pt-16 pb-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-h1 font-bold"
        >
          🎮 Game Arcade
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-body text-muted-foreground"
        >
          Fun mini games
        </motion.p>
      </div>

      <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-4">
        {game === "none" ? (
          <div className="flex flex-wrap justify-center gap-6">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { play("click"); setGame("feed") }}
              className="flex w-64 flex-col items-center gap-3 rounded-3xl bg-white/60 p-6 shadow-card backdrop-blur-sm transition-shadow hover:shadow-hover cursor-pointer"
            >
              <span className="text-5xl">🐢</span>
              <span className="text-h5 font-bold">Feed the Turtle</span>
              <span className="text-small text-muted-foreground">Tap turtles for points!</span>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { play("click"); setGame("bubble") }}
              className="flex w-64 flex-col items-center gap-3 rounded-3xl bg-white/60 p-6 shadow-card backdrop-blur-sm transition-shadow hover:shadow-hover cursor-pointer"
            >
              <span className="text-5xl">🫧</span>
              <span className="text-h5 font-bold">Bubble Pop</span>
              <span className="text-small text-muted-foreground">Pop as many as you can!</span>
            </motion.button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { play("click"); setGame("none") }}
              className="rounded-2xl glass px-4 py-2 text-small font-medium cursor-pointer"
            >
              ← Choose another game
            </motion.button>
            {game === "feed" && <FeedTheTurtle />}
            {game === "bubble" && <BubblePop />}
          </div>
        )}
      </div>
    </motion.div>
  )
}
