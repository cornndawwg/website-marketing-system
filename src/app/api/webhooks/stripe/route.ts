import { NextRequest, NextResponse } from 'next/server'
import { StripeService } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')
    
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe signature' },
        { status: 400 }
      )
    }

    // Get webhook secret from environment or request
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    
    if (!webhookSecret) {
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      )
    }

    // For now, we'll use a dummy secret key since we don't have the actual one
    // In a real implementation, you'd get this from the company's settings
    const stripeService = new StripeService('sk_test_dummy')
    
    try {
      const event = stripeService.handleWebhook(body, signature, webhookSecret)
      
      // Handle different event types
      switch (event.type) {
        case 'invoice.payment_succeeded':
          await handleInvoicePaymentSucceeded(event.data.object)
          break
        case 'invoice.payment_failed':
          await handleInvoicePaymentFailed(event.data.object)
          break
        case 'invoice.created':
          await handleInvoiceCreated(event.data.object)
          break
        default:
          console.log(`Unhandled event type: ${event.type}`)
      }

      return NextResponse.json({ received: true })
    } catch (error) {
      console.error('Webhook signature verification failed:', error)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

async function handleInvoicePaymentSucceeded(invoice: any) {
  try {
    // Update invoice status in database
    await prisma.invoice.updateMany({
      where: {
        stripeInvoiceId: invoice.id
      },
      data: {
        status: 'paid',
        paidAt: new Date()
      }
    })

    // Update job status
    const invoiceRecord = await prisma.invoice.findFirst({
      where: {
        stripeInvoiceId: invoice.id
      },
      include: {
        job: true
      }
    })

    if (invoiceRecord?.job) {
      await prisma.job.update({
        where: {
          id: invoiceRecord.job.id
        },
        data: {
          status: 'invoiced'
        }
      })
    }

    console.log(`Invoice ${invoice.id} payment succeeded`)
  } catch (error) {
    console.error('Error handling invoice payment succeeded:', error)
  }
}

async function handleInvoicePaymentFailed(invoice: any) {
  try {
    // Update invoice status in database
    await prisma.invoice.updateMany({
      where: {
        stripeInvoiceId: invoice.id
      },
      data: {
        status: 'void'
      }
    })

    console.log(`Invoice ${invoice.id} payment failed`)
  } catch (error) {
    console.error('Error handling invoice payment failed:', error)
  }
}

async function handleInvoiceCreated(invoice: any) {
  try {
    // Update invoice status in database
    await prisma.invoice.updateMany({
      where: {
        stripeInvoiceId: invoice.id
      },
      data: {
        status: 'sent',
        sentAt: new Date()
      }
    })

    console.log(`Invoice ${invoice.id} created`)
  } catch (error) {
    console.error('Error handling invoice created:', error)
  }
}
