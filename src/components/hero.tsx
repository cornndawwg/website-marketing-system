import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Subtle background graphics */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100/30 rounded-full blur-xl" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200/20 rounded-full blur-lg" />
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-100/25 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-blue-200/30 rounded-full blur-lg" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left side - Main content */}
          <div className="space-y-8">
            {/* Circular animated element */}
            <div className="relative w-32 h-32 mx-auto lg:mx-0">
              <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute inset-4 rounded-full bg-blue-50 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-blue-600 font-semibold text-sm">Elevate</div>
                  <div className="text-blue-600 font-semibold text-sm">Window Care</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                we KNOW how to MAKE WINDOWS SPARKLE
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Professional window cleaning that's as reliable as it is refreshing. Serving homeowners and businesses across Georgia with a smile.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                  <Link href="#quote-calculator">Get A Free Quote</Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right side - Subtle images */}
          <div className="relative">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl transform rotate-12 opacity-60" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-200 to-blue-300 rounded-xl transform -rotate-6 opacity-50" />
            <div className="relative z-10 w-full h-96 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl flex items-center justify-center">
              <div className="text-center text-blue-600">
                <div className="text-6xl mb-4">✨</div>
                <div className="text-lg font-semibold">Crystal Clear Results</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}