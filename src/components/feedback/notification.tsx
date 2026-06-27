"use client"

import { cn } from "@/lib/utils"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"
import { useEffect, useState } from "react"
import type { Status } from "@/types"

type NotificationProps = {
  title: string
  description?: string
  status?: Status
  onClose?: () => void
  autoClose?: number
  className?: string
}

const icons: Record<Status, React.ReactNode> = {
  success: <CheckCircle size={18} className="text-success" />,
  danger: <AlertCircle size={18} className="text-danger" />,
  warning: <AlertTriangle size={18} className="text-warning" />,
  info: <Info size={18} className="text-info" />,
}

const borderStyles: Record<Status, string> = {
  success: "border-l-success",
  danger: "border-l-danger",
  warning: "border-l-warning",
  info: "border-l-info",
}

function Notification({
  title,
  description,
  status = "info",
  onClose,
  autoClose = 5000,
  className,
}: NotificationProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (autoClose <= 0) return
    const timer = setTimeout(() => {
      setVisible(false)
      onClose?.()
    }, autoClose)
    return () => clearTimeout(timer)
  }, [autoClose, onClose])

  if (!visible) return null

  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-medium",
        "border-l-4",
        borderStyles[status],
        "animate-in slide-in-from-top-2 fade-in-0",
        className,
      )}
    >
      <span className="mt-0.5 flex-shrink-0">{icons[status]}</span>
      <div className="flex-1 space-y-0.5">
        <p className="text-small font-semibold">{title}</p>
        {description && (
          <p className="text-caption text-muted-foreground">{description}</p>
        )}
      </div>
      {onClose && (
        <button
          onClick={() => {
            setVisible(false)
            onClose()
          }}
          className="flex-shrink-0 rounded-md p-0.5 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close notification"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}

export { Notification }
