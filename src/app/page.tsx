import { Navigation } from '@/components/navigation'
import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { QuoteCalculator } from '@/components/quote-calculator'
import { Testimonials } from '@/components/testimonials'
import { ReviewsCTA } from '@/components/reviews-cta'
import { AwardsStrip } from '@/components/marketing/awards-strip'
import { Footer } from '@/components/footer'
import { LocalBusinessSchema, FAQSchema } from '@/components/schema-markup'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <LocalBusinessSchema />
      <FAQSchema />
      <Navigation />
      <main>
        <Hero />
        <Services />
        <QuoteCalculator />
        <Testimonials />
        <AwardsStrip />
        <ReviewsCTA />
      </main>
      <Footer />
    </div>
  )
}