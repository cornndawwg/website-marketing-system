import { Metadata } from 'next'
import { ServiceSchema } from '@/components/schema-markup'
import { QuoteCalculatorModal } from '@/components/quote-calculator-modal'
import { Button } from '@/components/ui/button'
import { CheckCircle, Zap, Shield, Clock, Star, Home } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Professional Gutter Cleaning Services | Moreland Window Cleaning',
  description: 'Expert gutter cleaning and maintenance services in Walton County. Protect your home from water damage with our professional gutter cleaning.',
  keywords: 'gutter cleaning, gutter maintenance, downspout cleaning, leaf removal, Walton County, home protection',
}

export default function GutterCleaningPage() {
  return (
    <div className="min-h-screen bg-white">
      <ServiceSchema 
        name="Gutter Cleaning Services"
        description="Professional gutter cleaning and maintenance for residential and commercial properties"
        serviceType="GutterCleaningService"
      />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <span className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider">
                    Gutter Cleaning Services
                  </span>
                  <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                    Protect Your Home from Water Damage
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Professional gutter cleaning services that keep your home safe from water damage. 
                    Clean gutters mean a protected foundation and a beautiful home.
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
                <div className="w-full h-96 bg-gradient-to-br from-blue-200 to-blue-300 rounded-3xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                    alt="Professional gutter cleaning service"
                    className="w-full h-full object-cover rounded-3xl"
                  />
                  <div className="absolute inset-0 bg-blue-900/20 rounded-3xl flex items-center justify-center">
                    <div className="text-center text-white">
                      <Zap className="h-16 w-16 mx-auto mb-4" />
                      <div className="text-2xl font-bold">Gutter Cleaning</div>
                      <div className="text-lg">Home Protection</div>
                    </div>
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
                Our Gutter Cleaning Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive gutter maintenance to protect your home from water damage
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Gutter Cleaning</h3>
                <p className="text-gray-600 mb-6">
                  Thorough removal of leaves, debris, and blockages from all gutters and downspouts. 
                  Ensures proper water flow and prevents overflow.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Leaf and debris removal
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Downspout cleaning
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Gutter inspection
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Gutter Maintenance</h3>
                <p className="text-gray-600 mb-6">
                  Regular maintenance services to keep your gutters functioning properly year-round. 
                  Prevents costly water damage repairs.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Seasonal cleaning
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Gutter guard installation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Minor repairs
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Home className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Foundation Protection</h3>
                <p className="text-gray-600 mb-6">
                  Proper gutter maintenance protects your home&apos;s foundation from water damage. 
                  Essential for home longevity and value.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Water damage prevention
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Foundation protection
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Basement protection
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
                Why Choose Our Gutter Cleaning?
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Technicians</h3>
                <p className="text-gray-600">Trained professionals with years of experience in gutter maintenance</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Safe & Insured</h3>
                <p className="text-gray-600">Fully licensed and insured with safety equipment and protocols</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Regular Maintenance</h3>
                <p className="text-gray-600">Scheduled maintenance plans to keep your gutters clean year-round</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Service</h3>
                <p className="text-gray-600">Efficient service that gets the job done right the first time</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Protect Your Home Today
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Don&apos;t wait for water damage. Get professional gutter cleaning services now
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
