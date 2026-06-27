import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

type SpinnerProps = {
  size?: number
  className?: string
}

function Spinner({ size = 20, className }: SpinnerProps) {
  return (
    <Loader2
      size={size}
      className={cn("animate-spin text-muted-foreground", className)}
    />
  )
}

export { Spinner }
