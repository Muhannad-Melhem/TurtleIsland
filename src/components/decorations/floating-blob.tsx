import { cn } from "@/lib/utils"

type FloatingBlobProps = {
  className?: string
  color?: string
  size?: "sm" | "md" | "lg"
  speed?: "slow" | "normal"
}

const sizeStyles = {
  sm: "h-24 w-24",
  md: "h-40 w-40",
  lg: "h-64 w-64",
}

function FloatingBlob({
  className,
  color = "bg-ocean/20",
  size = "md",
  speed = "normal",
}: FloatingBlobProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl",
        speed === "slow" ? "animate-float-slow" : "animate-float",
        sizeStyles[size],
        color,
        className,
      )}
      aria-hidden
    />
  )
}

export { FloatingBlob }
