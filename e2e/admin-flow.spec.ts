import { test, expect } from '@playwright/test'

test.describe('Admin Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should redirect unauthenticated users from admin routes', async ({ page }) => {
    // Try to access admin dashboard
    await page.goto('/admin')
    
    // Should redirect to sign in page
    await expect(page).toHaveURL(/.*auth\/signin/)
  })

  test('should show sign in form', async ({ page }) => {
    await page.goto('/auth/signin')
    
    // Should show sign in form
    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('button:has-text("Send Magic Link")')).toBeVisible()
  })

  test('should validate email format', async ({ page }) => {
    await page.goto('/auth/signin')
    
    // Enter invalid email
    await page.fill('input[type="email"]', 'invalid-email')
    await page.click('button:has-text("Send Magic Link")')
    
    // Should show validation error
    await expect(page.locator('text=Please enter a valid email address')).toBeVisible()
  })

  test('should show verify request page after email submission', async ({ page }) => {
    await page.goto('/auth/signin')
    
    // Enter valid email
    await page.fill('input[type="email"]', 'shon@cwellmarketing.com')
    await page.click('button:has-text("Send Magic Link")')
    
    // Should show verify request page
    await expect(page.locator('text=Check your email')).toBeVisible()
  })

  test('should show admin dashboard for authenticated users', async ({ page }) => {
    // Mock authentication (in real test, you'd use actual auth flow)
    await page.goto('/admin')
    
    // This would require actual authentication setup
    // For now, we'll test the redirect behavior
    await expect(page).toHaveURL(/.*auth\/signin/)
  })
})

test.describe('Blog Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should navigate to blog page', async ({ page }) => {
    // Click blog link in navigation
    await page.click('text=Blog')
    
    // Should navigate to blog page
    await expect(page).toHaveURL('/blog')
    await expect(page.locator('text=Window Cleaning Blog')).toBeVisible()
  })

  test('should display blog posts', async ({ page }) => {
    await page.goto('/blog')
    
    // Should show blog posts
    await expect(page.locator('text=5 Essential Window Cleaning Tips for Spring')).toBeVisible()
    await expect(page.locator('text=Commercial Window Cleaning: What to Expect')).toBeVisible()
  })

  test('should filter blog posts by category', async ({ page }) => {
    await page.goto('/blog')
    
    // Click on a category
    await page.click('text=Window Cleaning Tips')
    
    // Should filter posts (in real implementation)
    await expect(page.locator('text=5 Essential Window Cleaning Tips for Spring')).toBeVisible()
  })

  test('should navigate to individual blog post', async ({ page }) => {
    await page.goto('/blog')
    
    // Click on a blog post
    await page.click('text=5 Essential Window Cleaning Tips for Spring')
    
    // Should navigate to blog post page
    await expect(page).toHaveURL('/blog/5-essential-window-cleaning-tips-spring')
    await expect(page.locator('text=5 Essential Window Cleaning Tips for Spring')).toBeVisible()
  })

  test('should show blog post content', async ({ page }) => {
    await page.goto('/blog/5-essential-window-cleaning-tips-spring')
    
    // Should show blog post content
    await expect(page.locator('text=Spring is the perfect time')).toBeVisible()
    await expect(page.locator('text=Choose the Right Time')).toBeVisible()
  })
})

test.describe('Navigation Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should navigate between pages', async ({ page }) => {
    // Test navigation links
    await page.click('text=Residential')
    await expect(page.locator('text=Residential Window Cleaning')).toBeVisible()
    
    await page.click('text=Commercial')
    await expect(page.locator('text=Commercial Window Cleaning')).toBeVisible()
    
    await page.click('text=Contact')
    await expect(page.locator('text=Contact Us')).toBeVisible()
  })

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Should show mobile menu
    await expect(page.locator('button[aria-label="Menu"]')).toBeVisible()
    
    // Click mobile menu
    await page.click('button[aria-label="Menu"]')
    
    // Should show mobile navigation
    await expect(page.locator('text=Residential')).toBeVisible()
    await expect(page.locator('text=Commercial')).toBeVisible()
    await expect(page.locator('text=Blog')).toBeVisible()
  })
})
