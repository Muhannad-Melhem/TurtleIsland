"use client"

import { cn } from "@/lib/utils"

type SidebarItem = {
  label: string
  href: string
  icon?: React.ReactNode
  active?: boolean
  badge?: string | number
}

type SidebarProps = {
  items: SidebarItem[]
  className?: string
  header?: React.ReactNode
  footer?: React.ReactNode
}

function Sidebar({ items, className, header, footer }: SidebarProps) {
  return (
    <aside
      className={cn(
        "z-sidebar flex h-full w-64 flex-col border-r border-border bg-surface",
        className,
      )}
    >
      {header && <div className="px-4 py-5">{header}</div>}
      <nav className="flex-1 px-3 py-2">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-small font-medium transition-all duration-200",
                  item.active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {item.icon && (
                  <span className="flex-shrink-0">{item.icon}</span>
                )}
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/15 px-1.5 text-[11px] font-medium text-primary">
                    {item.badge}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {footer && <div className="border-t border-border p-4">{footer}</div>}
    </aside>
  )
}

export { Sidebar, type SidebarProps }
