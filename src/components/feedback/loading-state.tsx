import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"

type LoadingStateProps = {
  label?: string
  className?: string
  fullPage?: boolean
}

function LoadingState({
  label = "Loading...",
  className,
  fullPage,
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        fullPage && "fixed inset-0 z-overlay bg-background",
        className,
      )}
    >
      <Spinner size={24} />
      {label && (
        <p className="text-small text-muted-foreground">{label}</p>
      )}
    </div>
  )
}

export { LoadingState }
