// Error tracking and monitoring utilities
import React from 'react'

interface ErrorInfo {
  message: string
  stack?: string
  componentStack?: string
  errorBoundary?: string
  timestamp: Date
  userAgent?: string
  url?: string
  userId?: string
  sessionId?: string
}

class ErrorTracker {
  private errors: ErrorInfo[] = []
  private maxErrors = 100

  logError(error: Error, errorInfo?: Record<string, unknown>) {
    const errorData: ErrorInfo = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo?.componentStack,
      errorBoundary: errorInfo?.errorBoundary,
      timestamp: new Date(),
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userId: this.getUserId(),
      sessionId: this.getSessionId()
    }

    this.errors.push(errorData)
    
    // Keep only the most recent errors
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors)
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error tracked:', errorData)
    }

    // Send to external service in production
    if (process.env.NODE_ENV === 'production') {
      this.sendToExternalService(errorData)
    }
  }

  private getUserId(): string | undefined {
    // Get user ID from session or auth context
    if (typeof window !== 'undefined') {
      const sessionData = localStorage.getItem('session')
      if (sessionData) {
        try {
          const session = JSON.parse(sessionData)
          return session.user?.id
        } catch (e) {
          // Ignore parsing errors
        }
      }
    }
    return undefined
  }

  private getSessionId(): string {
    if (typeof window === 'undefined') return 'server'
    
    let sessionId = sessionStorage.getItem('sessionId')
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15)
      sessionStorage.setItem('sessionId', sessionId)
    }
    return sessionId
  }

  private async sendToExternalService(errorData: ErrorInfo) {
    try {
      // In production, you would send to Sentry, LogRocket, or similar service
      await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorData)
      })
    } catch (e) {
      // Don't throw errors in error tracking
      console.error('Failed to send error to external service:', e)
    }
  }

  getErrors(): ErrorInfo[] {
    return [...this.errors]
  }

  clearErrors() {
    this.errors = []
  }
}

export const errorTracker = new ErrorTracker()

// React Error Boundary
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: Record<string, unknown>) {
    errorTracker.logError(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      return React.createElement(FallbackComponent, { error: this.state.error! })
    }

    return this.props.children
  }
}

const DefaultErrorFallback: React.FC<{ error: Error }> = ({ error }) => {
  return React.createElement('div', { className: "min-h-screen flex items-center justify-center bg-gray-50" },
    React.createElement('div', { className: "max-w-md w-full bg-white shadow-lg rounded-lg p-6" },
      React.createElement('div', { className: "flex items-center mb-4" },
        React.createElement('div', { className: "flex-shrink-0" },
          React.createElement('svg', { className: "h-8 w-8 text-red-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
            React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" })
          )
        ),
        React.createElement('div', { className: "ml-3" },
          React.createElement('h3', { className: "text-lg font-medium text-gray-900" }, "Something went wrong")
        )
      ),
      React.createElement('div', { className: "text-sm text-gray-500 mb-4" },
        "We're sorry, but something unexpected happened. Please try refreshing the page."
      ),
      React.createElement('div', { className: "flex space-x-3" },
        React.createElement('button', {
          onClick: () => window.location.reload(),
          className: "bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
        }, "Refresh Page"),
        React.createElement('button', {
          onClick: () => window.location.href = '/',
          className: "bg-gray-200 text-gray-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-300"
        }, "Go Home")
      ),
      process.env.NODE_ENV === 'development' && React.createElement('details', { className: "mt-4" },
        React.createElement('summary', { className: "text-sm text-gray-600 cursor-pointer" }, "Error Details"),
        React.createElement('pre', { className: "mt-2 text-xs text-gray-500 bg-gray-100 p-2 rounded overflow-auto" },
          error.message + '\n' + error.stack
        )
      )
    )
  )
}

// Global error handlers
export const setupGlobalErrorHandlers = () => {
  if (typeof window === 'undefined') return

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    errorTracker.logError(new Error(event.reason), {
      type: 'unhandledrejection',
      reason: event.reason
    })
  })

  // Handle uncaught errors
  window.addEventListener('error', (event) => {
    errorTracker.logError(event.error || new Error(event.message), {
      type: 'uncaught',
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    })
  })
}

// Performance monitoring
export const trackPerformance = (name: string, startTime: number) => {
  const endTime = performance.now()
  const duration = endTime - startTime

  if (process.env.NODE_ENV === 'development') {
    console.log(`${name} took ${duration.toFixed(2)}ms`)
  }

  // Track slow operations
  if (duration > 1000) {
    errorTracker.logError(new Error(`Slow operation: ${name} took ${duration.toFixed(2)}ms`), {
      type: 'performance',
      duration,
      operation: name
    })
  }
}

// API error tracking
export const trackApiError = (url: string, status: number, error: Error | string) => {
  errorTracker.logError(new Error(`API Error: ${status} ${url}`), {
    type: 'api',
    url,
    status,
    error: error.message || error
  })
}
