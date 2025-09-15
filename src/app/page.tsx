import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { BenefitsRow } from '@/components/marketing/benefits-row'
import { PremiumSection } from '@/components/marketing/premium-section'
import { QuoteCalculator } from '@/components/quote-calculator'
import { Testimonials } from '@/components/testimonials'
import { TrustBadges } from '@/components/marketing/trust-badges'
import { ContactSection } from '@/components/marketing/contact-section'
import { BlogSection } from '@/components/marketing/blog-section'
import { ReviewsCTA } from '@/components/reviews-cta'
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
        <BenefitsRow />
        <PremiumSection />
        <QuoteCalculator />
        <Testimonials />
        <TrustBadges />
        <ContactSection />
        <BlogSection />
        <ReviewsCTA />
      </main>
      <Footer />
    </div>
  )
}