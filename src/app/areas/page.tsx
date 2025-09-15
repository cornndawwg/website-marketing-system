export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Window Cleaning Service Areas in Georgia | Moreland Window Cleaning',
  description: 'Professional window cleaning services in Walton County, GA and surrounding areas. Residential and commercial window cleaning in Monroe, Loganville, Social Circle, and more.',
  keywords: 'window cleaning service areas, Walton County GA, Monroe window cleaning, Loganville window cleaning, Social Circle window cleaning, Georgia window cleaning',
  openGraph: {
    title: 'Window Cleaning Service Areas in Georgia | Moreland Window Cleaning',
    description: 'Professional window cleaning services in Walton County, GA and surrounding areas.',
    type: 'website',
  }
}

import Link from 'next/link'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { QuoteCalculatorModal } from '@/components/quote-calculator-modal'

export default async function AreasPage() {
  const { prisma } = await import('@/lib/prisma')
  const areas = await prisma.serviceArea.findMany({
    where: { active: true },
    orderBy: { name: 'asc' },
    select: { name: true, slug: true }
  })


  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl" />
          <div className="absolute top-40 right-20 w-24 h-24 bg-blue-300/20 rounded-full blur-lg" />
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-200/25 rounded-full blur-2xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <MapPin className="h-4 w-4" />
              Serving Georgia Communities
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Our Service Areas
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Professional window cleaning services across Walton County and surrounding areas. 
              We bring crystal-clear results to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <QuoteCalculatorModal>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                  Get Free Quote
                </Button>
              </QuoteCalculatorModal>
              <Button variant="outline" size="lg" className="px-8 py-3">
                <Phone className="h-4 w-4 mr-2" />
                (770) 298-8370
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Communities We Serve
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Click on any area below to learn more about our services in your community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((area, index) => (
              <Link 
                key={area.slug} 
                href={`/areas/${area.slug}`}
                className="group block bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {area.name}
                    </h4>
                    <p className="text-sm text-gray-500">Window Cleaning</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Local SEO Content Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Professional Window Cleaning Services Across Georgia
              </h2>
              <div className="space-y-6 text-gray-600">
                <p className="text-lg leading-relaxed">
                  Moreland Window Cleaning proudly serves residential and commercial customers throughout Walton County and surrounding areas. Our experienced team brings professional-grade window cleaning services directly to your doorstep, whether you're in Monroe, Loganville, Social Circle, or any of our other service areas.
                </p>
                <p className="text-lg leading-relaxed">
                  We understand that Georgia's climate can be challenging for maintaining clean windows. From pollen season in spring to summer storms and winter weather, our specialized techniques ensure your windows stay crystal clear year-round. Our local expertise means we know the best times to clean and the most effective methods for Georgia homes and businesses.
                </p>
                <p className="text-lg leading-relaxed">
                  Each of our service areas receives the same high-quality attention and professional service. We're fully licensed, bonded, and insured, giving you peace of mind whether we're cleaning your home's windows or your commercial building's storefront. Our commitment to excellence has made us the trusted choice for window cleaning across the region.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img 
                  src="https://picsum.photos/500/500?random=50"
                  alt="Professional window cleaning service in Georgia"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Complete Window Cleaning Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From residential homes to commercial buildings, we provide comprehensive window cleaning services tailored to your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Residential Window Cleaning</h3>
              <p className="text-gray-600 mb-4">
                Professional home window cleaning services including interior and exterior windows, screen cleaning, and track maintenance. Perfect for homeowners who want crystal-clear views and enhanced curb appeal.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Interior & exterior window cleaning</li>
                <li>• Screen cleaning and reinstallation</li>
                <li>• Window track and sill cleaning</li>
                <li>• Hard water spot removal</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Commercial Window Cleaning</h3>
              <p className="text-gray-600 mb-4">
                Business and commercial window cleaning services for offices, retail stores, restaurants, and multi-tenant buildings. We work around your schedule to minimize disruption.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Storefront and office building cleaning</li>
                <li>• High-rise and multi-story buildings</li>
                <li>• Flexible scheduling options</li>
                <li>• Regular maintenance programs</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Specialized Services</h3>
              <p className="text-gray-600 mb-4">
                Additional services including gutter cleaning, pressure washing, and specialized cleaning for unique window types and challenging situations.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Gutter cleaning and maintenance</li>
                <li>• Pressure washing services</li>
                <li>• Specialty window cleaning</li>
                <li>• Emergency cleaning services</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Local Area Benefits */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Why Georgia Residents Choose Moreland Window Cleaning
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our local expertise and commitment to quality make us the preferred choice for window cleaning across Walton County and surrounding areas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 bg-blue-600 rounded-full" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Georgia Weather Expertise</h3>
                  <p className="text-gray-600">
                    We understand Georgia's unique climate challenges, from spring pollen to summer humidity and winter weather. Our cleaning methods are specifically adapted for local conditions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 bg-blue-600 rounded-full" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Local Business Support</h3>
                  <p className="text-gray-600">
                    As a locally owned and operated business, we're invested in our community's success. We support local events and maintain strong relationships with area businesses.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 bg-blue-600 rounded-full" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Response Times</h3>
                  <p className="text-gray-600">
                    Being local means we can respond quickly to your needs. Whether it's an emergency cleaning or a last-minute appointment, we're just a phone call away.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 bg-blue-600 rounded-full" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Familiar with Local Architecture</h3>
                  <p className="text-gray-600">
                    From historic homes in Monroe to modern developments in Loganville, we're familiar with the diverse architecture throughout our service areas.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 bg-blue-600 rounded-full" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Knowledge</h3>
                  <p className="text-gray-600">
                    We know the best routes, understand local traffic patterns, and can work efficiently around community events and schedules.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 bg-blue-600 rounded-full" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Service</h3>
                  <p className="text-gray-600">
                    Our local team provides personalized service with attention to detail. We remember your preferences and build lasting relationships with our customers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Why Choose Moreland Window Cleaning?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing exceptional service in every community we serve
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Local Expertise</h3>
              <p className="text-gray-600">We know Georgia weather and understand local cleaning challenges</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Reliable Service</h3>
              <p className="text-gray-600">On-time appointments and consistent quality in every area</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Scheduling</h3>
              <p className="text-gray-600">Flexible scheduling that works with your busy lifestyle</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Local Support</h3>
              <p className="text-gray-600">Quick response and personalized service for your area</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get a free quote for professional window cleaning in your area. 
            We serve all the communities listed above and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <QuoteCalculatorModal>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                Get Your Free Quote
              </Button>
            </QuoteCalculatorModal>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
              <Phone className="h-4 w-4 mr-2" />
              Call (770) 298-8370
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
