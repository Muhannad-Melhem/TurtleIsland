"use client"

import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

type PaginationProps = {
  current: number
  total: number
  onChange: (page: number) => void
  className?: string
}

function getPages(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages: (number | "...")[] = [1]
  if (current > 3) pages.push("...")

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)

  if (current < total - 2) pages.push("...")
  pages.push(total)

  return pages
}

function Pagination({ current, total, onChange, className }: PaginationProps) {
  const pages = getPages(current, total)

  return (
    <nav aria-label="Pagination" className={cn("flex items-center gap-1", className)}>
      <button
        onClick={() => onChange(current - 1)}
        disabled={current <= 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`ellipsis-${i}`} className="flex h-9 w-9 items-center justify-center text-small text-muted-foreground">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onChange(page)}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg text-small font-medium transition-all duration-200",
              page === current
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
            aria-label={`Page ${page}`}
            aria-current={page === current ? "page" : undefined}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => onChange(current + 1)}
        disabled={current >= total}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  )
}

export { Pagination }
