import { NextRequest, NextResponse } from 'next/server'
import { GoogleCalendarService, createAppointmentEvent } from '@/lib/google-calendar'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      clientId,
      clientSecret,
      redirectUri,
      tokens,
      calendarId,
      customerName,
      customerEmail,
      startTime,
      endTime,
      type,
      location,
      notes
    } = body

    if (!clientId || !clientSecret || !tokens || !calendarId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const calendarService = new GoogleCalendarService(clientId, clientSecret, redirectUri)
    calendarService.setCredentials(tokens)

    const event = createAppointmentEvent(
      customerName,
      customerEmail,
      new Date(startTime),
      new Date(endTime),
      type,
      location,
      notes
    )

    const createdEvent = await calendarService.createEvent(calendarId, event)

    return NextResponse.json({
      success: true,
      event: createdEvent
    })
  } catch (error) {
    console.error('Error creating calendar event:', error)
    return NextResponse.json(
      { error: 'Failed to create calendar event' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      clientId,
      clientSecret,
      redirectUri,
      tokens,
      calendarId,
      eventId,
      customerName,
      customerEmail,
      startTime,
      endTime,
      type,
      location,
      notes
    } = body

    if (!clientId || !clientSecret || !tokens || !calendarId || !eventId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const calendarService = new GoogleCalendarService(clientId, clientSecret, redirectUri)
    calendarService.setCredentials(tokens)

    const event = createAppointmentEvent(
      customerName,
      customerEmail,
      new Date(startTime),
      new Date(endTime),
      type,
      location,
      notes
    )

    const updatedEvent = await calendarService.updateEvent(calendarId, eventId, event)

    return NextResponse.json({
      success: true,
      event: updatedEvent
    })
  } catch (error) {
    console.error('Error updating calendar event:', error)
    return NextResponse.json(
      { error: 'Failed to update calendar event' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get('clientId')
    const clientSecret = searchParams.get('clientSecret')
    const redirectUri = searchParams.get('redirectUri')
    const tokens = searchParams.get('tokens')
    const calendarId = searchParams.get('calendarId')
    const eventId = searchParams.get('eventId')

    if (!clientId || !clientSecret || !tokens || !calendarId || !eventId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const calendarService = new GoogleCalendarService(clientId, clientSecret, redirectUri)
    calendarService.setCredentials(JSON.parse(tokens))

    await calendarService.deleteEvent(calendarId, eventId)

    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting calendar event:', error)
    return NextResponse.json(
      { error: 'Failed to delete calendar event' },
      { status: 500 }
    )
  }
}
