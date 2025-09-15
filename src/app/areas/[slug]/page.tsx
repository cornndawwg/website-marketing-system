export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { MapPin, Phone, Mail, Clock, Star, Shield, CheckCircle, Home, Building, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { QuoteCalculatorModal } from '@/components/quote-calculator-modal'
import { ServiceSchema, BreadcrumbsSchema } from '@/components/schema-markup'

interface Params { params: { slug: string } }

export async function generateMetadata({ params }: Params) {
  const { prisma } = await import('@/lib/prisma')
  const area = await prisma.serviceArea.findUnique({ where: { slug: params.slug } })
  
  if (!area) {
    return {
      title: 'Service Area Not Found - Moreland Window Cleaning',
      description: 'The requested service area could not be found.'
    }
  }

  return {
    title: `Professional Window Cleaning in ${area.name}, GA | Moreland Window Cleaning`,
    description: `Expert window cleaning services in ${area.name}, Georgia. Residential and commercial window cleaning, gutter cleaning, and more. Licensed, insured, and locally owned. Get your free quote today!`,
    keywords: `window cleaning ${area.name}, ${area.name} window cleaning, window cleaning services ${area.name} GA, residential window cleaning ${area.name}, commercial window cleaning ${area.name}, gutter cleaning ${area.name}`,
    openGraph: {
      title: `Professional Window Cleaning in ${area.name}, GA | Moreland Window Cleaning`,
      description: `Expert window cleaning services in ${area.name}, Georgia. Residential and commercial window cleaning, gutter cleaning, and more.`,
      type: 'website',
    }
  }
}

export default async function AreaPage({ params }: Params) {
  const { prisma } = await import('@/lib/prisma')
  const area = await prisma.serviceArea.findUnique({ where: { slug: params.slug } })
  if (!area) return notFound()

  // Generate area-specific content
  const isCounty = area.name.includes('County')
  const areaType = isCounty ? 'county' : 'city'
  const areaDescription = isCounty 
    ? `throughout ${area.name}, Georgia`
    : `in ${area.name}, Georgia`

  return (
    <div className="min-h-screen bg-white">
      <ServiceSchema name={`Window Cleaning Services in ${area.name}`} serviceType="WindowCleaningService" />
      <BreadcrumbsSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Service Areas', url: '/areas' },
        { name: area.name, url: `/areas/${area.slug}` }
      ]} />

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
              Serving {area.name}, Georgia
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Professional Window Cleaning in {area.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Moreland Window Cleaning brings crystal-clear results to {areaDescription}. 
              Our experienced team provides residential and commercial window cleaning services with a commitment to excellence.
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

      {/* Services Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Window Cleaning Services in {area.name}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive window cleaning solutions tailored for {areaType} residents and businesses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Home className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Residential Window Cleaning</h3>
              <p className="text-gray-600 mb-4">
                Professional home window cleaning services for {area.name} residents. We clean interior and exterior windows, 
                screens, and tracks to keep your home looking its best.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Interior & exterior window cleaning
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Screen cleaning and reinstallation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Window track and sill cleaning
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Hard water spot removal
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Building className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Commercial Window Cleaning</h3>
              <p className="text-gray-600 mb-4">
                Business window cleaning services for {area.name} companies. We work around your schedule to minimize 
                disruption while maintaining professional standards.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Storefront and office building cleaning
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Multi-story building services
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Flexible scheduling options
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Regular maintenance programs
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Services</h3>
              <p className="text-gray-600 mb-4">
                Complete exterior cleaning solutions for {area.name} properties. From gutters to pressure washing, 
                we keep your property looking pristine.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Gutter cleaning and maintenance
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Pressure washing services
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Specialty window cleaning
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Emergency cleaning services
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Local Expertise Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Why Choose Moreland Window Cleaning in {area.name}?
              </h2>
              <div className="space-y-6 text-gray-600">
                <p className="text-lg leading-relaxed">
                  As a locally owned and operated business, we understand the unique needs of {area.name} residents and businesses. 
                  Our team has extensive experience serving the {areaType} and knows the best techniques for maintaining clean windows in Georgia's climate.
                </p>
                <p className="text-lg leading-relaxed">
                  We're familiar with the local architecture, weather patterns, and seasonal challenges that affect window cleaning in {area.name}. 
                  From spring pollen to summer storms and winter weather, our specialized approach ensures your windows stay crystal clear year-round.
                </p>
                <p className="text-lg leading-relaxed">
                  Our commitment to {area.name} goes beyond just cleaning windows. We're invested in our community's success and take pride in 
                  providing exceptional service that reflects our local values and expertise.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img 
                  src={`https://picsum.photos/500/500?random=${area.slug.length + 60}`}
                  alt={`Professional window cleaning service in ${area.name}, Georgia`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Trusted by {area.name} Residents
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our commitment to quality and customer satisfaction has made us the preferred choice for window cleaning in {area.name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fully Licensed & Insured</h3>
              <p className="text-gray-600">Complete protection for your peace of mind in {area.name}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Reliable Scheduling</h3>
              <p className="text-gray-600">On-time service you can count on in {area.name}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">Satisfaction guaranteed or we make it right</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Local Expertise</h3>
              <p className="text-gray-600">Deep knowledge of {area.name} and surrounding areas</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Ready for Crystal-Clear Windows in {area.name}?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get your free quote today and experience the difference professional window cleaning makes. 
            We're proud to serve {area.name} and surrounding areas.
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
