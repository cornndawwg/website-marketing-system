import { test, expect } from '@playwright/test'

test.describe('Quote Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should complete residential quote flow', async ({ page }) => {
    // Navigate to quote calculator
    await page.click('text=Get Free Quote')
    
    // Fill in residential quote form
    await page.fill('input[name="windows"]', '10')
    await page.selectOption('select[name="frequency"]', 'one-time')
    await page.selectOption('select[name="accessDifficulty"]', 'easy')
    await page.fill('input[name="travelDistance"]', '5')
    
    // Select add-ons
    await page.check('input[name="addOns"][value="screens"]')
    await page.check('input[name="addOns"][value="tracks"]')
    
    // Calculate quote
    await page.click('button:has-text("Calculate Quote")')
    
    // Should show price range
    await expect(page.locator('text=Estimated Price Range')).toBeVisible()
    
    // Fill in customer information
    await page.fill('input[name="name"]', 'John Doe')
    await page.fill('input[name="email"]', 'john@example.com')
    await page.fill('input[name="phone"]', '555-123-4567')
    await page.fill('textarea[name="address"]', '123 Main St, Anytown, ST 12345')
    
    // Submit quote request
    await page.click('button:has-text("Submit Quote Request")')
    
    // Should show success message
    await expect(page.locator('text=Quote request submitted successfully')).toBeVisible()
  })

  test('should complete commercial quote flow', async ({ page }) => {
    // Navigate to quote calculator
    await page.click('text=Get Free Quote')
    
    // Switch to commercial tab
    await page.click('text=Commercial')
    
    // Fill in commercial quote form
    await page.fill('input[name="panels"]', '50')
    await page.selectOption('select[name="height"]', 'ground')
    await page.selectOption('select[name="frequency"]', 'monthly')
    await page.selectOption('select[name="accessDifficulty"]', 'easy')
    await page.fill('input[name="travelDistance"]', '10')
    
    // Calculate quote
    await page.click('button:has-text("Calculate Quote")')
    
    // Should show price range
    await expect(page.locator('text=Estimated Price Range')).toBeVisible()
    
    // Fill in customer information
    await page.fill('input[name="name"]', 'Jane Smith')
    await page.fill('input[name="email"]', 'jane@company.com')
    await page.fill('input[name="phone"]', '555-987-6543')
    await page.fill('textarea[name="address"]', '456 Business Ave, Anytown, ST 12345')
    
    // Submit quote request
    await page.click('button:has-text("Submit Quote Request")')
    
    // Should show success message
    await expect(page.locator('text=Quote request submitted successfully')).toBeVisible()
  })

  test('should validate required fields', async ({ page }) => {
    // Navigate to quote calculator
    await page.click('text=Get Free Quote')
    
    // Try to calculate without filling required fields
    await page.click('button:has-text("Calculate Quote")')
    
    // Should show validation errors
    await expect(page.locator('text=Please fill in all required fields')).toBeVisible()
  })

  test('should switch between residential and commercial tabs', async ({ page }) => {
    // Navigate to quote calculator
    await page.click('text=Get Free Quote')
    
    // Should start with residential tab
    await expect(page.locator('text=Number of Windows')).toBeVisible()
    
    // Switch to commercial tab
    await page.click('text=Commercial')
    await expect(page.locator('text=Number of Panels')).toBeVisible()
    
    // Switch back to residential tab
    await page.click('text=Residential')
    await expect(page.locator('text=Number of Windows')).toBeVisible()
  })
})
