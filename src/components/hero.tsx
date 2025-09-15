import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-blue-100 ring-1 ring-white/20 mb-5">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            Streak‑free guarantee • Fully insured
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
            Crystal‑Clear Window Cleaning
            <span className="block text-blue-200">for Homes & Businesses</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-8">
            Reliable, professional, and on‑time service across Walton County and nearby areas. Brighten your space with glass that truly sparkles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50">
              <Link href="#quote-calculator">Get Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-blue-100/90">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-blue-200 rounded-full" /> On‑time arrival
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-blue-200 rounded-full" /> Eco‑friendly solutions
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-blue-200 rounded-full" /> Satisfaction guaranteed
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute -top-24 right-1/2 h-72 w-[60rem] translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
    </section>
  )
}
