import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QuoteCalculator } from '../quote-calculator'

// Mock the pricing functions
jest.mock('@/lib/pricing', () => ({
  calculateResidentialPrice: jest.fn(() => ({
    basePrice: 100,
    addOnPrice: 0,
    frequencyMultiplier: 1,
    accessMultiplier: 1,
    travelCost: 0,
    totalPrice: 100
  })),
  calculateCommercialPrice: jest.fn(() => ({
    basePrice: 250,
    heightMultiplier: 1,
    frequencyMultiplier: 1,
    accessMultiplier: 1,
    travelCost: 0,
    totalPrice: 250
  }))
}))

describe('QuoteCalculator', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the quote calculator form', () => {
    render(<QuoteCalculator />)
    
    expect(screen.getByText('Get Your Free Quote')).toBeInTheDocument()
    expect(screen.getByText('Residential')).toBeInTheDocument()
    expect(screen.getByText('Commercial')).toBeInTheDocument()
  })

  it('switches between residential and commercial tabs', async () => {
    const user = userEvent.setup()
    render(<QuoteCalculator />)
    
    // Default should be residential
    expect(screen.getByText('Number of Windows')).toBeInTheDocument()
    
    // Click commercial tab
    await user.click(screen.getByText('Commercial'))
    expect(screen.getByText('Number of Panels')).toBeInTheDocument()
    
    // Click back to residential
    await user.click(screen.getByText('Residential'))
    expect(screen.getByText('Number of Windows')).toBeInTheDocument()
  })

  it('calculates residential quote correctly', async () => {
    const user = userEvent.setup()
    render(<QuoteCalculator />)
    
    // Fill in residential form
    await user.type(screen.getByLabelText(/number of windows/i), '10')
    await user.selectOptions(screen.getByLabelText(/frequency/i), 'one-time')
    await user.selectOptions(screen.getByLabelText(/access difficulty/i), 'easy')
    await user.type(screen.getByLabelText(/travel distance/i), '5')
    
    // Click calculate button
    await user.click(screen.getByText('Calculate Quote'))
    
    // Should show price range
    await waitFor(() => {
      expect(screen.getByText(/estimated price range/i)).toBeInTheDocument()
    })
  })

  it('calculates commercial quote correctly', async () => {
    const user = userEvent.setup()
    render(<QuoteCalculator />)
    
    // Switch to commercial tab
    await user.click(screen.getByText('Commercial'))
    
    // Fill in commercial form
    await user.type(screen.getByLabelText(/number of panels/i), '50')
    await user.selectOptions(screen.getByLabelText(/height/i), 'ground')
    await user.selectOptions(screen.getByLabelText(/frequency/i), 'one-time')
    await user.selectOptions(screen.getByLabelText(/access difficulty/i), 'easy')
    await user.type(screen.getByLabelText(/travel distance/i), '5')
    
    // Click calculate button
    await user.click(screen.getByText('Calculate Quote'))
    
    // Should show price range
    await waitFor(() => {
      expect(screen.getByText(/estimated price range/i)).toBeInTheDocument()
    })
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    render(<QuoteCalculator />)
    
    // Try to calculate without filling required fields
    await user.click(screen.getByText('Calculate Quote'))
    
    // Should show validation errors
    await waitFor(() => {
      expect(screen.getByText(/please fill in all required fields/i)).toBeInTheDocument()
    })
  })

  it('shows add-ons for residential quotes', async () => {
    const user = userEvent.setup()
    render(<QuoteCalculator />)
    
    // Fill in basic residential form
    await user.type(screen.getByLabelText(/number of windows/i), '10')
    await user.selectOptions(screen.getByLabelText(/frequency/i), 'one-time')
    await user.selectOptions(screen.getByLabelText(/access difficulty/i), 'easy')
    await user.type(screen.getByLabelText(/travel distance/i), '5')
    
    // Should show add-ons section
    expect(screen.getByText(/add-on services/i)).toBeInTheDocument()
    expect(screen.getByText(/window screens/i)).toBeInTheDocument()
    expect(screen.getByText(/window tracks/i)).toBeInTheDocument()
  })

  it('applies add-ons to residential quote', async () => {
    const user = userEvent.setup()
    render(<QuoteCalculator />)
    
    // Fill in residential form
    await user.type(screen.getByLabelText(/number of windows/i), '10')
    await user.selectOptions(screen.getByLabelText(/frequency/i), 'one-time')
    await user.selectOptions(screen.getByLabelText(/access difficulty/i), 'easy')
    await user.type(screen.getByLabelText(/travel distance/i), '5')
    
    // Select add-ons
    await user.click(screen.getByLabelText(/window screens/i))
    await user.click(screen.getByLabelText(/window tracks/i))
    
    // Calculate quote
    await user.click(screen.getByText('Calculate Quote'))
    
    // Should show price range with add-ons included
    await waitFor(() => {
      expect(screen.getByText(/estimated price range/i)).toBeInTheDocument()
    })
  })

  it('shows customer information form after quote calculation', async () => {
    const user = userEvent.setup()
    render(<QuoteCalculator />)
    
    // Fill in and calculate quote
    await user.type(screen.getByLabelText(/number of windows/i), '10')
    await user.selectOptions(screen.getByLabelText(/frequency/i), 'one-time')
    await user.selectOptions(screen.getByLabelText(/access difficulty/i), 'easy')
    await user.type(screen.getByLabelText(/travel distance/i), '5')
    await user.click(screen.getByText('Calculate Quote'))
    
    // Should show customer information form
    await waitFor(() => {
      expect(screen.getByText(/contact information/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument()
    })
  })

  it('submits customer information form', async () => {
    const user = userEvent.setup()
    render(<QuoteCalculator />)
    
    // Calculate quote first
    await user.type(screen.getByLabelText(/number of windows/i), '10')
    await user.selectOptions(screen.getByLabelText(/frequency/i), 'one-time')
    await user.selectOptions(screen.getByLabelText(/access difficulty/i), 'easy')
    await user.type(screen.getByLabelText(/travel distance/i), '5')
    await user.click(screen.getByText('Calculate Quote'))
    
    // Fill in customer information
    await waitFor(() => {
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    })
    
    await user.type(screen.getByLabelText(/full name/i), 'John Doe')
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com')
    await user.type(screen.getByLabelText(/phone number/i), '555-123-4567')
    await user.type(screen.getByLabelText(/property address/i), '123 Main St')
    
    // Submit form
    await user.click(screen.getByText('Submit Quote Request'))
    
    // Should show success message
    await waitFor(() => {
      expect(screen.getByText(/quote request submitted successfully/i)).toBeInTheDocument()
    })
  })

  it('handles form validation errors', async () => {
    const user = userEvent.setup()
    render(<QuoteCalculator />)
    
    // Calculate quote first
    await user.type(screen.getByLabelText(/number of windows/i), '10')
    await user.selectOptions(screen.getByLabelText(/frequency/i), 'one-time')
    await user.selectOptions(screen.getByLabelText(/access difficulty/i), 'easy')
    await user.type(screen.getByLabelText(/travel distance/i), '5')
    await user.click(screen.getByText('Calculate Quote'))
    
    // Try to submit without filling customer information
    await waitFor(() => {
      expect(screen.getByText(/submit quote request/i)).toBeInTheDocument()
    })
    
    await user.click(screen.getByText('Submit Quote Request'))
    
    // Should show validation errors
    await waitFor(() => {
      expect(screen.getByText(/please fill in all required fields/i)).toBeInTheDocument()
    })
  })
})
