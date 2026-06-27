import { cn } from "@/lib/utils"

type SectionProps = {
  children: React.ReactNode
  className?: string
  as?: "section" | "div" | "article" | "aside"
  padded?: boolean
}

function Section({
  children,
  className,
  as: Tag = "section",
  padded = true,
}: SectionProps) {
  return (
    <Tag
      className={cn(
        "w-full",
        padded && "py-12 sm:py-16 lg:py-20",
        className,
      )}
    >
      {children}
    </Tag>
  )
}

export { Section }
