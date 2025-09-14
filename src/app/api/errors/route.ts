import { NextRequest, NextResponse } from 'next/server'

interface ErrorData {
  message: string
  stack?: string
  componentStack?: string
  errorBoundary?: string
  timestamp: string
  userAgent?: string
  url?: string
  userId?: string
  sessionId?: string
  type?: string
  duration?: number
  operation?: string
  url?: string
  status?: number
  error?: any
}

export async function POST(request: NextRequest) {
  try {
    const errorData: ErrorData = await request.json()

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error received:', errorData)
    }

    // In production, you would:
    // 1. Send to external error tracking service (Sentry, LogRocket, etc.)
    // 2. Store in database for analysis
    // 3. Send alerts for critical errors
    // 4. Aggregate error metrics

    // Example: Send to Sentry
    // Sentry.captureException(new Error(errorData.message), {
    //   extra: errorData
    // })

    // Example: Store in database
    // await prisma.errorLog.create({
    //   data: {
    //     message: errorData.message,
    //     stack: errorData.stack,
    //     userAgent: errorData.userAgent,
    //     url: errorData.url,
    //     userId: errorData.userId,
    //     sessionId: errorData.sessionId,
    //     metadata: JSON.stringify(errorData)
    //   }
    // })

    // Example: Send alert for critical errors
    if (errorData.message.includes('critical') || errorData.status === 500) {
      // Send alert to monitoring service
      console.log('Critical error detected:', errorData.message)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in error tracking endpoint:', error)
    return NextResponse.json(
      { error: 'Failed to process error' },
      { status: 500 }
    )
  }
}
