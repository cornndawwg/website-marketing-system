import { Hero } from '@/components/hero'
import { Services } from '@/components/services'
import { BenefitsRow } from '@/components/marketing/benefits-row'
import { PremiumSection } from '@/components/marketing/premium-section'
import { QuoteCalculatorModal } from '@/components/quote-calculator-modal'
import { Testimonials } from '@/components/testimonials'
import { ContactSection } from '@/components/marketing/contact-section'
import { BlogSection } from '@/components/marketing/blog-section'
import { Footer } from '@/components/footer'
import { LocalBusinessSchema, FAQSchema } from '@/components/schema-markup'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <LocalBusinessSchema />
      <FAQSchema />
      <main>
        <Hero />
        <BenefitsRow />
        <Services />
        <PremiumSection />
        <Testimonials />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}