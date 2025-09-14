import Stripe from 'stripe'

export interface InvoiceData {
  customerEmail: string
  customerName: string
  amount: number
  description: string
  lineItems: Array<{
    description: string
    amount: number
    quantity?: number
  }>
  dueDate?: Date
  metadata?: Record<string, string>
}

export class StripeService {
  private stripe: Stripe

  constructor(secretKey: string) {
    this.stripe = new Stripe(secretKey, {
      apiVersion: '2024-12-18.acacia'
    })
  }

  // Create a customer
  async createCustomer(email: string, name: string, metadata?: Record<string, string>) {
    try {
      const customer = await this.stripe.customers.create({
        email,
        name,
        metadata
      })
      return customer
    } catch (error) {
      console.error('Error creating Stripe customer:', error)
      throw error
    }
  }

  // Create an invoice
  async createInvoice(invoiceData: InvoiceData) {
    try {
      // First, create or get customer
      let customer
      try {
        const existingCustomers = await this.stripe.customers.list({
          email: invoiceData.customerEmail,
          limit: 1
        })
        
        if (existingCustomers.data.length > 0) {
          customer = existingCustomers.data[0]
        } else {
          customer = await this.createCustomer(
            invoiceData.customerEmail,
            invoiceData.customerName,
            invoiceData.metadata
          )
        }
      } catch (error) {
        console.error('Error handling customer:', error)
        throw error
      }

      // Create invoice
      const invoice = await this.stripe.invoices.create({
        customer: customer.id,
        collection_method: 'send_invoice',
        days_until_due: 30,
        metadata: invoiceData.metadata || {},
        description: invoiceData.description
      })

      // Add line items
      for (const item of invoiceData.lineItems) {
        await this.stripe.invoiceItems.create({
          customer: customer.id,
          invoice: invoice.id,
          amount: item.amount,
          currency: 'usd',
          description: item.description,
          quantity: item.quantity || 1
        })
      }

      // Finalize the invoice
      const finalizedInvoice = await this.stripe.invoices.finalizeInvoice(invoice.id)

      return finalizedInvoice
    } catch (error) {
      console.error('Error creating Stripe invoice:', error)
      throw error
    }
  }

  // Send an invoice
  async sendInvoice(invoiceId: string) {
    try {
      const invoice = await this.stripe.invoices.sendInvoice(invoiceId)
      return invoice
    } catch (error) {
      console.error('Error sending Stripe invoice:', error)
      throw error
    }
  }

  // Get invoice by ID
  async getInvoice(invoiceId: string) {
    try {
      const invoice = await this.stripe.invoices.retrieve(invoiceId)
      return invoice
    } catch (error) {
      console.error('Error retrieving Stripe invoice:', error)
      throw error
    }
  }

  // Create payment link
  async createPaymentLink(priceData: {
    amount: number
    currency: string
    product: {
      name: string
      description?: string
    }
  }) {
    try {
      // Create product
      const product = await this.stripe.products.create({
        name: priceData.product.name,
        description: priceData.product.description
      })

      // Create price
      const price = await this.stripe.prices.create({
        product: product.id,
        unit_amount: priceData.amount,
        currency: priceData.currency
      })

      // Create payment link
      const paymentLink = await this.stripe.paymentLinks.create({
        line_items: [
          {
            price: price.id,
            quantity: 1
          }
        ]
      })

      return paymentLink
    } catch (error) {
      console.error('Error creating payment link:', error)
      throw error
    }
  }

  // Test connection
  async testConnection() {
    try {
      await this.stripe.balance.retrieve()
      return { success: true, message: 'Stripe connection successful' }
    } catch (error) {
      console.error('Stripe connection test failed:', error)
      return { success: false, message: 'Stripe connection failed' }
    }
  }

  // Handle webhook events
  async handleWebhook(payload: string, signature: string, webhookSecret: string) {
    try {
      const event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret)
      return event
    } catch (error) {
      console.error('Webhook signature verification failed:', error)
      throw error
    }
  }
}

// Helper function to create invoice data from job
export function createInvoiceFromJob(
  customerName: string,
  customerEmail: string,
  jobDescription: string,
  amount: number,
  jobId: string,
  metadata?: Record<string, string>
): InvoiceData {
  return {
    customerEmail,
    customerName,
    amount: Math.round(amount * 100), // Convert to cents
    description: jobDescription,
    lineItems: [
      {
        description: jobDescription,
        amount: Math.round(amount * 100),
        quantity: 1
      }
    ],
    metadata: {
      jobId,
      ...metadata
    }
  }
}
