import { Metadata } from 'next'
import { ServiceSchema } from '@/components/schema-markup'
import { QuoteCalculatorModal } from '@/components/quote-calculator-modal'
import { Button } from '@/components/ui/button'
import { CheckCircle, Droplets, Shield, Clock, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Professional Pressure Washing Services | Moreland Window Cleaning',
  description: 'Expert pressure washing services for homes and businesses in Walton County. Exterior cleaning, deck cleaning, and more. Free quotes available.',
  keywords: 'pressure washing, exterior cleaning, deck cleaning, house washing, commercial pressure washing, Walton County',
}

export default function PressureWashingPage() {
  return (
    <div className="min-h-screen bg-white">
      <ServiceSchema 
        name="Pressure Washing Services"
        description="Professional pressure washing for residential and commercial properties"
        serviceType="PressureWashingService"
      />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <span className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider">
                    Pressure Washing Services
                  </span>
                  <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                    Restore Your Property&apos;s Beauty
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Professional pressure washing services that bring your home or business back to life. 
                    From driveways to decks, we make everything look brand new.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <QuoteCalculatorModal>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                      Get Free Quote
                    </Button>
                  </QuoteCalculatorModal>
                  <Button variant="outline" size="lg" className="px-8 py-3">
                    Call (770) 298-8370
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-blue-200 to-blue-300 rounded-3xl flex items-center justify-center">
                  <div className="text-center text-blue-800">
                    <Droplets className="h-24 w-24 mx-auto mb-4" />
                    <div className="text-2xl font-bold">Pressure Washing</div>
                    <div className="text-lg">Professional Results</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Our Pressure Washing Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We offer comprehensive pressure washing solutions for every surface and need
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Droplets className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">House Washing</h3>
                <p className="text-gray-600 mb-6">
                  Complete exterior house cleaning to remove dirt, grime, and mildew. 
                  Safe for all siding types including vinyl, brick, and stucco.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Vinyl siding cleaning
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Brick and stone cleaning
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Mildew removal
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Deck & Patio Cleaning</h3>
                <p className="text-gray-600 mb-6">
                  Restore your outdoor living spaces with professional deck and patio cleaning. 
                  Safe for wood, composite, and concrete surfaces.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Wood deck restoration
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Composite deck cleaning
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Concrete patio cleaning
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Driveway & Walkway Cleaning</h3>
                <p className="text-gray-600 mb-6">
                  Remove oil stains, dirt, and grime from your driveways and walkways. 
                  Professional results that last.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Oil stain removal
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Concrete cleaning
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Asphalt cleaning
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Why Choose Our Pressure Washing?
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Equipment</h3>
                <p className="text-gray-600">Commercial-grade pressure washers and eco-friendly cleaning solutions</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Safe & Insured</h3>
                <p className="text-gray-600">Fully licensed and insured with safety as our top priority</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Reliable Service</h3>
                <p className="text-gray-600">On-time service with attention to detail and customer satisfaction</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Droplets className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Eco-Friendly</h3>
                <p className="text-gray-600">Environmentally safe cleaning solutions that protect your property</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Ready to Transform Your Property?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get a free quote for professional pressure washing services today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <QuoteCalculatorModal>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
                  Get Free Quote
                </Button>
              </QuoteCalculatorModal>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                Call (770) 298-8370
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
