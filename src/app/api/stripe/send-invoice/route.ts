import { NextRequest, NextResponse } from 'next/server'
import { StripeService } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { secretKey, invoiceId } = body

    if (!secretKey || !invoiceId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const stripeService = new StripeService(secretKey)
    const invoice = await stripeService.sendInvoice(invoiceId)

    return NextResponse.json({
      success: true,
      invoice: {
        id: invoice.id,
        status: invoice.status,
        hosted_invoice_url: invoice.hosted_invoice_url
      }
    })
  } catch (error) {
    console.error('Error sending Stripe invoice:', error)
    return NextResponse.json(
      { error: 'Failed to send invoice' },
      { status: 500 }
    )
  }
}
