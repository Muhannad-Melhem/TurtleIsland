import { cn } from "@/lib/utils"

type PageWrapperProps = {
  children: React.ReactNode
  className?: string
}

function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <main
      className={cn(
        "flex min-h-screen flex-col",
        className,
      )}
    >
      {children}
    </main>
  )
}

export { PageWrapper }
