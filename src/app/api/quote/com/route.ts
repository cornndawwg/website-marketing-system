import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculatePricing, PricingInputs } from '@/lib/pricing'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { customerInfo, inputs } = body

    // Validate required fields
    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email) {
      return NextResponse.json(
        { error: 'Missing required customer information' },
        { status: 400 }
      )
    }

    if (!inputs.panels || !inputs.height_tier || !inputs.frequency_com) {
      return NextResponse.json(
        { error: 'Panel count, height tier, and frequency are required' },
        { status: 400 }
      )
    }

    // Calculate pricing
    const pricing = calculatePricing('com', inputs as PricingInputs)

    // Create or find customer
    let customer = await prisma.customer.findFirst({
      where: { email: customerInfo.email }
    })

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName,
          email: customerInfo.email,
          phone: customerInfo.phone,
          address1: customerInfo.address1,
          city: customerInfo.city,
          state: customerInfo.state,
          zip: customerInfo.zip,
          source: 'website_quote'
        }
      })
    }

    // Create quote
    const quote = await prisma.quote.create({
      data: {
        customerId: customer.id,
        variant: 'com',
        inputs: inputs,
        priceMin: pricing.priceMin,
        priceMax: pricing.priceMax,
        status: 'new'
      }
    })

    // Create lead
    await prisma.lead.create({
      data: {
        customerId: customer.id,
        channel: 'form',
        payload: {
          quoteId: quote.id,
          customerInfo,
          inputs,
          pricing
        },
        status: 'new'
      }
    })

    return NextResponse.json({
      success: true,
      quoteId: quote.id,
      pricing: {
        priceMin: pricing.priceMin,
        priceMax: pricing.priceMax
      }
    })

  } catch (error) {
    console.error('Error creating commercial quote:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
