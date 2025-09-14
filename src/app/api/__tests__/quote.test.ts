import { NextRequest } from 'next/server'
import { POST as residentialQuoteHandler } from '../quote/res/route'
import { POST as commercialQuoteHandler } from '../quote/com/route'

// Mock Prisma
jest.mock('@/lib/prisma', () => ({
  prisma: {
    customer: {
      upsert: jest.fn(),
    },
    quote: {
      create: jest.fn(),
    },
    lead: {
      create: jest.fn(),
    },
  },
}))

describe('Quote API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('POST /api/quote/res', () => {
    it('should create a residential quote successfully', async () => {
      const mockCustomer = { id: 'customer-1', email: 'test@example.com' }
      const mockQuote = { id: 'quote-1', customerId: 'customer-1' }
      const mockLead = { id: 'lead-1', customerId: 'customer-1' }

      const { prisma } = await import('@/lib/prisma')
      prisma.customer.upsert.mockResolvedValue(mockCustomer)
      prisma.quote.create.mockResolvedValue(mockQuote)
      prisma.lead.create.mockResolvedValue(mockLead)

      const requestBody = {
        customerInfo: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '555-123-4567',
          address: '123 Main St'
        },
        quoteData: {
          windows: 10,
          addOns: ['screens'],
          frequency: 'one-time',
          accessDifficulty: 'easy',
          travelDistance: 5
        },
        pricing: {
          basePrice: 100,
          addOnPrice: 15,
          totalPrice: 115
        }
      }

      const request = new NextRequest('http://localhost:3000/api/quote/res', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await residentialQuoteHandler(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.quoteId).toBe('quote-1')
      expect(prisma.customer.upsert).toHaveBeenCalledWith({
        where: { email: 'john@example.com' },
        update: {
          name: 'John Doe',
          phone: '555-123-4567',
          address: '123 Main St'
        },
        create: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '555-123-4567',
          address: '123 Main St'
        }
      })
    })

    it('should handle validation errors', async () => {
      const requestBody = {
        customerInfo: {
          name: '',
          email: 'invalid-email',
          phone: '',
          address: ''
        },
        quoteData: {
          windows: -1,
          addOns: [],
          frequency: 'invalid',
          accessDifficulty: 'invalid',
          travelDistance: -1
        },
        pricing: {
          basePrice: 0,
          addOnPrice: 0,
          totalPrice: 0
        }
      }

      const request = new NextRequest('http://localhost:3000/api/quote/res', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await residentialQuoteHandler(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toBeDefined()
    })

    it('should handle database errors', async () => {
      const { prisma } = await import('@/lib/prisma')
      prisma.customer.upsert.mockRejectedValue(new Error('Database error'))

      const requestBody = {
        customerInfo: {
          name: 'John Doe',
          email: 'john@example.com',
          phone: '555-123-4567',
          address: '123 Main St'
        },
        quoteData: {
          windows: 10,
          addOns: [],
          frequency: 'one-time',
          accessDifficulty: 'easy',
          travelDistance: 5
        },
        pricing: {
          basePrice: 100,
          addOnPrice: 0,
          totalPrice: 100
        }
      }

      const request = new NextRequest('http://localhost:3000/api/quote/res', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await residentialQuoteHandler(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Failed to create quote')
    })
  })

  describe('POST /api/quote/com', () => {
    it('should create a commercial quote successfully', async () => {
      const mockCustomer = { id: 'customer-1', email: 'test@example.com' }
      const mockQuote = { id: 'quote-1', customerId: 'customer-1' }
      const mockLead = { id: 'lead-1', customerId: 'customer-1' }

      const { prisma } = await import('@/lib/prisma')
      prisma.customer.upsert.mockResolvedValue(mockCustomer)
      prisma.quote.create.mockResolvedValue(mockQuote)
      prisma.lead.create.mockResolvedValue(mockLead)

      const requestBody = {
        customerInfo: {
          name: 'Jane Smith',
          email: 'jane@company.com',
          phone: '555-987-6543',
          address: '456 Business Ave'
        },
        quoteData: {
          panels: 50,
          height: 'ground',
          frequency: 'monthly',
          accessDifficulty: 'easy',
          travelDistance: 10
        },
        pricing: {
          basePrice: 250,
          heightMultiplier: 1,
          totalPrice: 250
        }
      }

      const request = new NextRequest('http://localhost:3000/api/quote/com', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await commercialQuoteHandler(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.quoteId).toBe('quote-1')
      expect(prisma.customer.upsert).toHaveBeenCalledWith({
        where: { email: 'jane@company.com' },
        update: {
          name: 'Jane Smith',
          phone: '555-987-6543',
          address: '456 Business Ave'
        },
        create: {
          name: 'Jane Smith',
          email: 'jane@company.com',
          phone: '555-987-6543',
          address: '456 Business Ave'
        }
      })
    })

    it('should handle commercial quote validation errors', async () => {
      const requestBody = {
        customerInfo: {
          name: '',
          email: 'invalid-email',
          phone: '',
          address: ''
        },
        quoteData: {
          panels: -1,
          height: 'invalid',
          frequency: 'invalid',
          accessDifficulty: 'invalid',
          travelDistance: -1
        },
        pricing: {
          basePrice: 0,
          heightMultiplier: 0,
          totalPrice: 0
        }
      }

      const request = new NextRequest('http://localhost:3000/api/quote/com', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await commercialQuoteHandler(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toBeDefined()
    })
  })
})
