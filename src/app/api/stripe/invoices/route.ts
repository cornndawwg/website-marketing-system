import { NextRequest, NextResponse } from 'next/server'
import { StripeService, createInvoiceFromJob } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      secretKey,
      customerName,
      customerEmail,
      jobDescription,
      amount,
      jobId,
      metadata
    } = body

    if (!secretKey || !customerName || !customerEmail || !amount) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const stripeService = new StripeService(secretKey)
    
    const invoiceData = createInvoiceFromJob(
      customerName,
      customerEmail,
      jobDescription,
      amount,
      jobId,
      metadata
    )

    const invoice = await stripeService.createInvoice(invoiceData)

    return NextResponse.json({
      success: true,
      invoice: {
        id: invoice.id,
        status: invoice.status,
        amount: invoice.amount_due,
        currency: invoice.currency,
        customer: invoice.customer,
        hosted_invoice_url: invoice.hosted_invoice_url
      }
    })
  } catch (error) {
    console.error('Error creating Stripe invoice:', error)
    return NextResponse.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const secretKey = searchParams.get('secretKey')
    const invoiceId = searchParams.get('invoiceId')

    if (!secretKey || !invoiceId) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    const stripeService = new StripeService(secretKey)
    const invoice = await stripeService.getInvoice(invoiceId)

    return NextResponse.json({
      success: true,
      invoice: {
        id: invoice.id,
        status: invoice.status,
        amount: invoice.amount_due,
        currency: invoice.currency,
        customer: invoice.customer,
        hosted_invoice_url: invoice.hosted_invoice_url,
        paid: invoice.paid
      }
    })
  } catch (error) {
    console.error('Error retrieving Stripe invoice:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve invoice' },
      { status: 500 }
    )
  }
}
