import { ShieldCheck, Clock, Star, DollarSign } from 'lucide-react'

export function BenefitsRow() {
  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Fully Insured',
      description: 'Complete protection for your peace of mind'
    },
    {
      icon: Clock,
      title: 'On-Time Service',
      description: 'Reliable scheduling you can count on'
    },
    {
      icon: Star,
      title: 'Quality Guaranteed',
      description: 'Satisfaction or we make it right'
    },
    {
      icon: DollarSign,
      title: 'Fair Pricing',
      description: 'Transparent rates with no hidden fees'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                {benefit.title}
              </h3>
              <p className="text-sm text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
