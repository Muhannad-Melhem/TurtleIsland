"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-10 w-full rounded-xl border border-border bg-surface px-4 py-2 text-sm text-foreground",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-0",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "transition-all duration-200",
          className,
        )}
        {...props}
      />
    )
  },
)

Input.displayName = "Input"

type SearchInputProps = {
  containerClassName?: string
} & InputProps

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, containerClassName, ...props }, ref) => {
    return (
      <div className={cn("relative", containerClassName)}>
        <Search
          size={16}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-xl border border-border bg-surface pl-10 pr-4 py-2 text-sm text-foreground",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-0",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-all duration-200",
            className,
          )}
          {...props}
        />
      </div>
    )
  },
)

SearchInput.displayName = "SearchInput"

export { Input, SearchInput }
