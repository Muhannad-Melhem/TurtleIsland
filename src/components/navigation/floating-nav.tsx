"use client"

import { cn } from "@/lib/utils"

type FloatingNavItem = {
  icon: React.ReactNode
  label: string
  href: string
  active?: boolean
}

type FloatingNavProps = {
  items: FloatingNavItem[]
  className?: string
}

function FloatingNav({ items, className }: FloatingNavProps) {
  return (
    <nav
      className={cn(
        "fixed bottom-6 left-1/2 z-navbar -translate-x-1/2",
        "flex items-center gap-1 rounded-2xl glass px-2 py-1.5 shadow-floating",
        className,
      )}
    >
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={cn(
            "flex flex-col items-center gap-0.5 rounded-xl px-4 py-2 text-[10px] font-medium transition-all duration-200",
            item.active
              ? "bg-primary/15 text-primary"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          <span className="flex-shrink-0">{item.icon}</span>
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  )
}

export { FloatingNav, type FloatingNavProps }
