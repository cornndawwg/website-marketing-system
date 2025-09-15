import Link from 'next/link'

export function CTABand({
  title = 'Ready for crystal-clear windows?',
  subtitle = 'Get an instant price range and schedule in minutes.',
  primaryHref = '#quote-calculator',
  primaryText = 'Get Free Quote',
}: {
  title?: string
  subtitle?: string
  primaryHref?: string
  primaryText?: string
}) {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">{title}</h2>
        <p className="text-blue-100 mb-8 text-lg">{subtitle}</p>
        <Link href={primaryHref} className="inline-flex items-center rounded-md bg-white px-6 py-3 text-blue-700 font-semibold shadow hover:bg-blue-50 transition">
          {primaryText}
        </Link>
      </div>
    </section>
  )
}


