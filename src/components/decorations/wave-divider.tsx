import { cn } from "@/lib/utils"

type WaveDividerProps = {
  className?: string
  color?: string
  flipped?: boolean
}

function WaveDivider({
  className,
  color = "text-border",
  flipped,
}: WaveDividerProps) {
  return (
    <div
      className={cn(
        "relative h-16 w-full overflow-hidden",
        flipped && "rotate-180",
        className,
      )}
      aria-hidden
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className={cn("h-full w-full", color)}
        fill="currentColor"
      >
        <path d="M0,0 C300,60 600,0 900,30 C1050,45 1150,60 1200,90 L1200,120 L0,120 Z" />
      </svg>
    </div>
  )
}

export { WaveDivider }
