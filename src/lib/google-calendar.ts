import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'

export interface CalendarEvent {
  id?: string
  summary: string
  description?: string
  start: {
    dateTime: string
    timeZone: string
  }
  end: {
    dateTime: string
    timeZone: string
  }
  location?: string
  attendees?: Array<{
    email: string
    displayName?: string
  }>
}

export class GoogleCalendarService {
  private oauth2Client: OAuth2Client
  private calendar: any

  constructor(clientId: string, clientSecret: string, redirectUri: string) {
    this.oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      redirectUri
    )
    this.calendar = google.calendar({ version: 'v3', auth: this.oauth2Client })
  }

  // Generate authorization URL for OAuth flow
  getAuthUrl(): string {
    const scopes = ['https://www.googleapis.com/auth/calendar']
    
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    })
  }

  // Exchange authorization code for tokens
  async getTokens(code: string) {
    const { tokens } = await this.oauth2Client.getToken(code)
    this.oauth2Client.setCredentials(tokens)
    return tokens
  }

  // Set credentials from stored tokens
  setCredentials(tokens: any) {
    this.oauth2Client.setCredentials(tokens)
  }

  // Create a calendar event
  async createEvent(calendarId: string, event: CalendarEvent) {
    try {
      const response = await this.calendar.events.insert({
        calendarId,
        resource: event
      })
      return response.data
    } catch (error) {
      console.error('Error creating calendar event:', error)
      throw error
    }
  }

  // Update a calendar event
  async updateEvent(calendarId: string, eventId: string, event: CalendarEvent) {
    try {
      const response = await this.calendar.events.update({
        calendarId,
        eventId,
        resource: event
      })
      return response.data
    } catch (error) {
      console.error('Error updating calendar event:', error)
      throw error
    }
  }

  // Delete a calendar event
  async deleteEvent(calendarId: string, eventId: string) {
    try {
      await this.calendar.events.delete({
        calendarId,
        eventId
      })
      return true
    } catch (error) {
      console.error('Error deleting calendar event:', error)
      throw error
    }
  }

  // Get calendar events
  async getEvents(calendarId: string, timeMin?: string, timeMax?: string) {
    try {
      const response = await this.calendar.events.list({
        calendarId,
        timeMin,
        timeMax,
        singleEvents: true,
        orderBy: 'startTime'
      })
      return response.data.items || []
    } catch (error) {
      console.error('Error fetching calendar events:', error)
      throw error
    }
  }

  // Test connection
  async testConnection(calendarId: string = 'primary') {
    try {
      await this.calendar.calendarList.get({
        calendarId
      })
      return { success: true, message: 'Calendar connection successful' }
    } catch (error) {
      console.error('Calendar connection test failed:', error)
      return { success: false, message: 'Calendar connection failed' }
    }
  }

  // Refresh access token if needed
  async refreshToken() {
    try {
      const { credentials } = await this.oauth2Client.refreshAccessToken()
      this.oauth2Client.setCredentials(credentials)
      return credentials
    } catch (error) {
      console.error('Error refreshing token:', error)
      throw error
    }
  }
}

// Helper function to create appointment event
export function createAppointmentEvent(
  customerName: string,
  customerEmail: string,
  startTime: Date,
  endTime: Date,
  type: 'estimate' | 'job',
  location?: string,
  notes?: string
): CalendarEvent {
  return {
    summary: `${type === 'estimate' ? 'Estimate' : 'Job'} - ${customerName}`,
    description: notes || `Window cleaning ${type} for ${customerName}`,
    start: {
      dateTime: startTime.toISOString(),
      timeZone: 'America/New_York' // Default to Eastern Time
    },
    end: {
      dateTime: endTime.toISOString(),
      timeZone: 'America/New_York'
    },
    location,
    attendees: [
      {
        email: customerEmail,
        displayName: customerName
      }
    ]
  }
}
