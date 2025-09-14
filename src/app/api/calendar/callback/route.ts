import { NextRequest, NextResponse } from 'next/server'
import { GoogleCalendarService } from '@/lib/google-calendar'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const clientId = searchParams.get('clientId')
    const clientSecret = searchParams.get('clientSecret')
    const redirectUri = searchParams.get('redirectUri')

    if (!code || !clientId || !clientSecret || !redirectUri) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const calendarService = new GoogleCalendarService(clientId, clientSecret, redirectUri)
    const tokens = await calendarService.getTokens(code)

    // In a real implementation, you would save these tokens to the database
    // associated with the company/user
    
    return NextResponse.json({
      success: true,
      tokens: {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expiry_date: tokens.expiry_date
      }
    })
  } catch (error) {
    console.error('Error exchanging code for tokens:', error)
    return NextResponse.json(
      { error: 'Failed to exchange authorization code' },
      { status: 500 }
    )
  }
}
