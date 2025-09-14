// Temporarily disable middleware for initial deployment
// import { withAuth } from 'next-auth/middleware'

export default function middleware() {
  // Temporarily disabled for deployment
  return
}

export const config = {
  matcher: ['/admin/:path*']
}
