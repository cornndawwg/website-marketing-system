// Performance optimization utilities

export const optimizeImage = (src: string, width?: number, height?: number, quality = 75) => {
  // In production, this would use Next.js Image Optimization or a CDN
  const params = new URLSearchParams()
  if (width) params.set('w', width.toString())
  if (height) params.set('h', height.toString())
  params.set('q', quality.toString())
  
  return `${src}?${params.toString()}`
}

export const preloadCriticalResources = () => {
  if (typeof window === 'undefined') return
  
  // Preload critical fonts
  const fontLink = document.createElement('link')
  fontLink.rel = 'preload'
  fontLink.href = '/fonts/inter.woff2'
  fontLink.as = 'font'
  fontLink.type = 'font/woff2'
  fontLink.crossOrigin = 'anonymous'
  document.head.appendChild(fontLink)
  
  // Preload critical images
  const criticalImages = [
    '/images/hero-bg.jpg',
    '/images/logo.png'
  ]
  
  criticalImages.forEach(src => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = src
    link.as = 'image'
    document.head.appendChild(link)
  })
}

export const lazyLoadImages = () => {
  if (typeof window === 'undefined') return
  
  const images = document.querySelectorAll('img[data-src]')
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        img.src = img.dataset.src || ''
        img.removeAttribute('data-src')
        imageObserver.unobserve(img)
      }
    })
  })
  
  images.forEach(img => imageObserver.observe(img))
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof window === 'undefined') {
    fn()
    return
  }
  
  const start = performance.now()
  fn()
  const end = performance.now()
  
  console.log(`${name} took ${end - start} milliseconds`)
  
  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Send performance metrics to analytics
    // gtag('event', 'timing_complete', {
    //   name: name,
    //   value: Math.round(end - start)
    // })
  }
}

export const optimizeQueries = {
  // Database query optimization helpers
  selectOnly: (fields: string[]) => ({
    select: fields.reduce((acc, field) => {
      acc[field] = true
      return acc
    }, {} as Record<string, boolean>)
  }),
  
  paginate: (page: number, limit: number) => ({
    skip: (page - 1) * limit,
    take: limit
  }),
  
  orderBy: (field: string, direction: 'asc' | 'desc' = 'desc') => ({
    orderBy: { [field]: direction }
  })
}

export const cacheConfig = {
  // Cache configuration for different types of data
  static: {
    maxAge: 31536000, // 1 year
    sMaxAge: 31536000,
    staleWhileRevalidate: 86400 // 1 day
  },
  
  dynamic: {
    maxAge: 3600, // 1 hour
    sMaxAge: 3600,
    staleWhileRevalidate: 300 // 5 minutes
  },
  
  api: {
    maxAge: 300, // 5 minutes
    sMaxAge: 300,
    staleWhileRevalidate: 60 // 1 minute
  }
}

export const getCacheHeaders = (type: keyof typeof cacheConfig) => {
  const config = cacheConfig[type]
  return {
    'Cache-Control': `public, max-age=${config.maxAge}, s-maxage=${config.sMaxAge}, stale-while-revalidate=${config.staleWhileRevalidate}`
  }
}
