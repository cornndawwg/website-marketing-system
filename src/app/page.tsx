import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { QuoteCalculator } from '@/components/quote-calculator'
import { Testimonials } from '@/components/testimonials'
import { ReviewsCTA } from '@/components/reviews-cta'
import { TrustBadges } from '@/components/marketing/trust-badges'
import { Footer } from '@/components/footer'
import { LocalBusinessSchema, FAQSchema } from '@/components/schema-markup'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <LocalBusinessSchema />
      <FAQSchema />
      <main>
        <Hero />
        <Services />
        <QuoteCalculator />
        <Testimonials />
        <TrustBadges />
        <ReviewsCTA />
      </main>
      <Footer />
    </div>
  )
}