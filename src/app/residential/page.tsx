import { Metadata } from 'next'
import { ServiceSchema } from '@/components/schema-markup'
import { QuoteCalculatorModal } from '@/components/quote-calculator-modal'
import { Button } from '@/components/ui/button'
import { CheckCircle, Home, Shield, Clock, Star, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Professional Residential Window Cleaning | Moreland Window Cleaning',
  description: 'Expert residential window cleaning services in Walton County. Interior and exterior window cleaning, screens, tracks, and hard water removal.',
  keywords: 'residential window cleaning, home window cleaning, interior windows, exterior windows, screen cleaning, Walton County',
}

export default function ResidentialPage() {
  return (
    <div className="min-h-screen bg-white">
      <ServiceSchema 
        name="Residential Window Cleaning Services"
        description="Professional residential window cleaning for homes and properties"
        serviceType="WindowCleaningService"
      />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <span className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider">
                    Residential Window Cleaning
                  </span>
                  <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                    Crystal Clear Windows for Your Home
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Professional residential window cleaning that brings natural light and beauty into your home. 
                    From interior to exterior, we make every window sparkle.
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
                    src="https://picsum.photos/800/600?random=1" 
                    alt="Professional window cleaning service"
                    className="w-full h-full object-cover rounded-3xl"
                  />
                  <div className="absolute inset-0 bg-blue-900/20 rounded-3xl flex items-center justify-center">
                    <div className="text-center text-white">
                      <Home className="h-16 w-16 mx-auto mb-4" />
                      <div className="text-2xl font-bold">Residential Cleaning</div>
                      <div className="text-lg">Beautiful Results</div>
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
                Our Residential Window Cleaning Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive window cleaning solutions for every part of your home
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <img 
                    src="https://picsum.photos/400/300?random=2" 
                    alt="Interior and exterior window cleaning"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <Home className="h-8 w-8 text-blue-600" />
                  </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Interior & Exterior Windows</h3>
                <p className="text-gray-600 mb-6">
                  Complete window cleaning for both inside and outside of your home. 
                  Professional squeegee technique for streak-free results.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Interior window cleaning
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Exterior window cleaning
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Streak-free finish
                  </li>
                </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <img 
                    src="https://picsum.photos/400/300?random=3" 
                    alt="Window screen cleaning"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <Shield className="h-8 w-8 text-blue-600" />
                  </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Screen Cleaning & Care</h3>
                <p className="text-gray-600 mb-6">
                  Professional screen cleaning and careful reinstallation. 
                  Your screens will be spotless and properly fitted.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Screen removal and cleaning
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Careful reinstallation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Labeled for easy identification
                  </li>
                </ul>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <img 
                    src="https://picsum.photos/400/300?random=4" 
                    alt="Window track and sill cleaning"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <Sparkles className="h-8 w-8 text-blue-600" />
                  </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Track & Sill Detail</h3>
                <p className="text-gray-600 mb-6">
                  Thorough cleaning of window tracks and sills. 
                  Remove dirt, debris, and buildup for a complete clean.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Track cleaning
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Sill detailing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Hard water spot removal
                  </li>
                </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Why Choose Our Residential Window Cleaning?
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Quality</h3>
                <p className="text-gray-600">Expert techniques and premium tools for perfect results every time</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Home Protection</h3>
                <p className="text-gray-600">Drop cloths and booties used to protect your floors and furniture</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Convenient Scheduling</h3>
                <p className="text-gray-600">Flexible scheduling that works with your busy lifestyle</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Satisfaction Guaranteed</h3>
                <p className="text-gray-600">Quality check with you room-by-room to ensure everything sparkles</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Ready to See the Difference?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get a free quote for professional residential window cleaning services today
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