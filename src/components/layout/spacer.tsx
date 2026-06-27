import { cn } from "@/lib/utils"

type SpacerProps = {
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32
  className?: string
}

const sizeMap = {
  1: "h-1",
  2: "h-2",
  3: "h-3",
  4: "h-4",
  5: "h-5",
  6: "h-6",
  8: "h-8",
  10: "h-10",
  12: "h-12",
  16: "h-16",
  20: "h-20",
  24: "h-24",
  32: "h-32",
} as const

function Spacer({ size = 4, className }: SpacerProps) {
  return <div className={cn(sizeMap[size], className)} aria-hidden />
}

export { Spacer }
