"use client"

import { cn } from "@/lib/utils"

type NavItem = {
  label: string
  href: string
  active?: boolean
}

type NavbarProps = {
  items?: NavItem[]
  className?: string
  variant?: "default" | "glass" | "floating"
  children?: React.ReactNode
}

const variantStyles = {
  default: "bg-surface border-b border-border",
  glass: "glass",
  floating:
    "fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl glass rounded-2xl shadow-floating",
}

function Navbar({
  items,
  className,
  variant = "default",
  children,
}: NavbarProps) {
  return (
    <nav
      className={cn(
        "z-navbar flex h-16 items-center px-6",
        variantStyles[variant],
        className,
      )}
    >
      <div className="flex w-full items-center justify-between">
        {children ? (
          children
        ) : items ? (
          <ul className="flex items-center gap-6">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "text-small font-medium transition-colors hover:text-foreground",
                    item.active ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </nav>
  )
}

export { Navbar, type NavbarProps }
