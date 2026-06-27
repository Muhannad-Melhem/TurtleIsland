import { ChevronRight, Slash } from "lucide-react"

type Crumb = {
  label: string
  href?: string
}

type BreadcrumbsProps = {
  items: Crumb[]
  separator?: "chevron" | "slash"
  className?: string
}

function Breadcrumbs({
  items,
  separator = "chevron",
  className,
}: BreadcrumbsProps) {
  const SeparatorIcon = separator === "chevron" ? ChevronRight : Slash

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-1.5 text-small text-muted-foreground">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <SeparatorIcon size={14} className="text-muted-foreground/50" />}
              {isLast ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {item.label}
                </span>
              ) : item.href ? (
                <a
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export { Breadcrumbs, type BreadcrumbsProps }
