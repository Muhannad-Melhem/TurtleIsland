"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

type SelectProps = {
  options: { value: string; label: string }[]
  placeholder?: string
  className?: string
} & React.SelectHTMLAttributes<HTMLSelectElement>

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, placeholder = "Select...", className, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            "flex h-10 w-full appearance-none rounded-xl border border-border bg-surface px-4 py-2 pr-10 text-sm text-foreground",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-0",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-all duration-200",
            className,
          )}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
      </div>
    )
  },
)

Select.displayName = "Select"

export { Select }
