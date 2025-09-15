import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Home, Building2, Droplets, Sun } from 'lucide-react'

export function Services() {
  const services = [
    {
      icon: Home,
      title: 'Residential Window Cleaning',
      description: 'Professional interior and exterior window cleaning for your home. We clean windows, screens, tracks, and sills.',
      features: ['Interior & Exterior Windows', 'Screen Cleaning', 'Track & Sill Cleaning', 'Hard Water Stain Removal']
    },
    {
      icon: Building2,
      title: 'Commercial Window Cleaning',
      description: 'Reliable window cleaning services for businesses, offices, and commercial properties.',
      features: ['Storefront Cleaning', 'Office Buildings', 'Post-Construction Cleanup', 'Regular Maintenance']
    },
    {
      icon: Droplets,
      title: 'Gutter Cleaning',
      description: 'Keep your gutters clean and functional with our professional gutter cleaning service.',
      features: ['Gutter Cleaning', 'Downspout Cleaning', 'Debris Removal', 'Inspection & Maintenance']
    },
    {
      icon: Sun,
      title: 'Additional Services',
      description: 'Specialized cleaning services including skylights and hard-to-reach areas.',
      features: ['Skylight Cleaning', 'High-Rise Windows', 'Pressure Washing', 'Screen Repair']
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block rounded-full bg-blue-50 text-blue-700 px-4 py-1 text-sm font-semibold mb-3">What we do</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Professional Cleaning Services</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Residential and commercial window cleaning plus related services delivered with care and precision.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="h-full transition hover:shadow-lg">
              <CardHeader>
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  <service.icon className="h-7 w-7 text-blue-700" />
                </div>
                <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                <CardDescription className="text-gray-600">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <div className="mr-3 inline-block h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
