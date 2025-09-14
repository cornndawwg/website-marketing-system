import { NextRequest, NextResponse } from 'next/server'
import { EmailService, sendQuoteConfirmation, sendAppointmentConfirmation, sendAppointmentReminder, sendInvoiceNotification } from '@/lib/email-service'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      type, 
      emailConfig, 
      customerEmail, 
      customerName, 
      companyInfo,
      ...data 
    } = body

    if (!type || !emailConfig || !customerEmail || !customerName) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    let success = false

    switch (type) {
      case 'quoteConfirmation':
        success = await sendQuoteConfirmation(
          customerEmail,
          customerName,
          data.serviceType || 'Window Cleaning',
          data.priceMin || 0,
          data.priceMax || 0,
          emailConfig,
          companyInfo
        )
        break

      case 'appointmentConfirmation':
        success = await sendAppointmentConfirmation(
          customerEmail,
          customerName,
          data.appointmentData,
          emailConfig,
          companyInfo
        )
        break

      case 'appointmentReminder':
        success = await sendAppointmentReminder(
          customerEmail,
          customerName,
          data.appointmentData,
          emailConfig,
          companyInfo
        )
        break

      case 'invoiceNotification':
        success = await sendInvoiceNotification(
          customerEmail,
          customerName,
          data.invoiceData,
          emailConfig,
          companyInfo
        )
        break

      default:
        return NextResponse.json(
          { error: 'Invalid email type' },
          { status: 400 }
        )
    }

    if (success) {
      return NextResponse.json({
        success: true,
        message: 'Email sent successfully'
      })
    } else {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
