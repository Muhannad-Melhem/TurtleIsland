import { cn } from "@/lib/utils"
import { Inbox } from "lucide-react"

type EmptyStateProps = {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-16 text-center",
        className,
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
        {icon || <Inbox size={28} className="text-muted-foreground" />}
      </div>
      <div className="max-w-sm space-y-1">
        <h3 className="text-h5 font-semibold">{title}</h3>
        {description && (
          <p className="text-small text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}

export { EmptyState }
