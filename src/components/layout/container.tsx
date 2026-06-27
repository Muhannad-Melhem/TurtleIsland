import { cn } from "@/lib/utils"

type ContainerProps = {
  children: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg" | "page" | "wide" | "full"
}

const maxWidths = {
  sm: "max-w-3xl",
  md: "max-w-4xl",
  lg: "max-w-5xl",
  page: "max-w-page",
  wide: "max-w-wide",
  full: "max-w-full",
}

function Container({ children, className, size = "page" }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        maxWidths[size],
        className,
      )}
    >
      {children}
    </div>
  )
}

export { Container }
