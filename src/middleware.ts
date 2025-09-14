// Temporarily disable middleware for deployment
// import { withAuth } from 'next-auth/middleware'

export default function middleware() {
  // Temporarily disabled for deployment
  return
}

export const config = {
  matcher: ['/admin/:path*']
}
