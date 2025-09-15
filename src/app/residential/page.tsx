import { ProcessSteps } from '@/components/marketing/process-steps'
import { TrustBadges } from '@/components/marketing/trust-badges'
import { CTABand } from '@/components/marketing/cta-band'
import { BreadcrumbsSchema, ServiceSchema } from '@/components/schema-markup'

export const metadata = {
  title: 'Residential Window Cleaning | Moreland Window Cleaning',
  description: 'Residential interior and exterior window cleaning, screens, tracks, and hard water removal in Walton County, GA and nearby areas.'
}

export default function ResidentialPage() {
  const steps = [
    { title: 'Friendly Arrival', description: 'On-time arrival with a quick walk-through of your home and preferences.' },
    { title: 'Protect & Prepare', description: 'Drop cloths and booties used; screens carefully removed and labeled.' },
    { title: 'Streak-Free Clean', description: 'Professional squeegee technique on glass; frames, tracks, and sills detailed.' },
    { title: 'Final Review', description: 'Quality check with you room-by-room to ensure everything sparkles.' },
  ]

  return (
    <main className="min-h-screen bg-white">
      <BreadcrumbsSchema items={[{ name: 'Home', item: '/' }, { name: 'Residential', item: '/residential' }]} />
      <ServiceSchema name="Residential Window Cleaning" />
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Residential Window Cleaning</h1>
          <p className="text-lg text-gray-700 mb-6">
            Enjoy bright rooms and beautiful views with streak-free windows. Our residential service includes interior and exterior glass, screens, and detailed track and sill cleaning. We treat your home with care and leave everything spotless.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
            <li>• Interior and exterior windows</li>
            <li>• Screens cleaned and reinstalled</li>
            <li>• Tracks and sills detailed</li>
            <li>• Hard water spot removal available</li>
          </ul>
        </div>
      </section>

      <TrustBadges />
      <ProcessSteps steps={steps} />
      <CTABand />
    </main>
  )
}


