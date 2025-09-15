import { ProcessSteps } from '@/components/marketing/process-steps'
import { TrustBadges } from '@/components/marketing/trust-badges'
import { CTABand } from '@/components/marketing/cta-band'
import { BreadcrumbsSchema, ServiceSchema } from '@/components/schema-markup'

export const metadata = {
  title: 'Commercial Window Cleaning | Moreland Window Cleaning',
  description: 'Storefront and office window cleaning, flexible scheduling, and maintenance plans across Walton County, GA and nearby.'
}

export default function CommercialPage() {
  const steps = [
    { title: 'Site Walkthrough', description: 'Assess access, glass count, and safety needs for your property.' },
    { title: 'Schedule to Fit You', description: 'Early morning or after-hours service available to minimize disruption.' },
    { title: 'Professional Clean', description: 'Uniformed technicians, commercial-grade tools, spotless results.' },
    { title: 'Recurring Plans', description: 'Weekly, bi-weekly, monthly, or quarterly maintenance options.' },
  ]

  return (
    <main className="min-h-screen bg-white">
      <BreadcrumbsSchema items={[{ name: 'Home', item: '/' }, { name: 'Commercial', item: '/commercial' }]} />
      <ServiceSchema name="Commercial Window Cleaning" />
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Commercial Window Cleaning</h1>
          <p className="text-lg text-gray-700 mb-6">
            Keep your brand shining with spotless storefronts and offices. We accommodate your hours and deliver consistent results—safely and efficiently.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
            <li>• Storefronts, offices, and multi-tenant buildings</li>
            <li>• One-time cleans and recurring maintenance</li>
            <li>• Post-construction cleanup</li>
            <li>• Flexible scheduling to reduce downtime</li>
          </ul>
        </div>
      </section>

      <TrustBadges />
      <ProcessSteps steps={steps} />
      <CTABand />
    </main>
  )
}


