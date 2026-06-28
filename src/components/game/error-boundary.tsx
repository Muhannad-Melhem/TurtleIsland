"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"

type Props = { children: ReactNode }
type State = { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-cream p-8 text-center">
          <div>
            <h1 className="text-h2 font-bold text-foreground">Something went wrong</h1>
            <p className="mt-2 text-body text-muted-foreground">
              Try refreshing the page.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-4 rounded-2xl bg-ocean px-6 py-2 font-semibold text-white shadow-soft"
            >
              Retry
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
