import { cn } from "@/lib/utils"

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse-soft rounded-lg bg-muted",
        className,
      )}
      {...props}
    />
  )
}

type SkeletonCardProps = {
  count?: number
  className?: string
}

function SkeletonCard({ count = 1, className }: SkeletonCardProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <Skeleton className="h-48 w-full rounded-xl" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      {Array.from({ length: count - 1 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  )
}

export { Skeleton, SkeletonCard }
