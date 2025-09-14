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
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professional window cleaning and related services for residential and commercial properties in Walton County and surrounding areas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
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
