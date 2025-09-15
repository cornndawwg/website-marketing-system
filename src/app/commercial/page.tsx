import { Metadata } from 'next'
import { ServiceSchema } from '@/components/schema-markup'
import { QuoteCalculatorModal } from '@/components/quote-calculator-modal'
import { Button } from '@/components/ui/button'
import { CheckCircle, Building, Shield, Clock, Star, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Professional Commercial Window Cleaning | Moreland Window Cleaning',
  description: 'Expert commercial window cleaning services in Walton County. Storefront, office, and multi-tenant building cleaning with flexible scheduling.',
  keywords: 'commercial window cleaning, storefront cleaning, office window cleaning, business window cleaning, Walton County',
}

export default function CommercialPage() {
  return (
    <div className="min-h-screen bg-white">
      <ServiceSchema 
        name="Commercial Window Cleaning Services"
        description="Professional commercial window cleaning for businesses and properties"
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
                    Commercial Window Cleaning
                  </span>
                  <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                    Keep Your Business Shining
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Professional commercial window cleaning that enhances your business image. 
                    Flexible scheduling and consistent results for all your commercial properties.
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
                    src="https://picsum.photos/800/600?random=5" 
                    alt="Commercial building window cleaning"
                    className="w-full h-full object-cover rounded-3xl"
                  />
                  <div className="absolute inset-0 bg-blue-900/20 rounded-3xl flex items-center justify-center">
                    <div className="text-center text-white">
                      <Building className="h-16 w-16 mx-auto mb-4" />
                      <div className="text-2xl font-bold">Commercial Cleaning</div>
                      <div className="text-lg">Professional Results</div>
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
                Our Commercial Window Cleaning Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive window cleaning solutions for all types of commercial properties
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Building className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Storefront & Office Cleaning</h3>
                <p className="text-gray-600 mb-6">
                  Professional window cleaning for retail stores, offices, and professional buildings. 
                  Make a great first impression with crystal clear windows.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Storefront windows
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Office building windows
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Professional appearance
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Multi-Tenant Buildings</h3>
                <p className="text-gray-600 mb-6">
                  Comprehensive window cleaning for apartment complexes, condos, and multi-tenant properties. 
                  Consistent service across all units.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Apartment complexes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Condo buildings
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Multi-unit properties
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Post-Construction Cleanup</h3>
                <p className="text-gray-600 mb-6">
                  Specialized cleaning for new construction and renovation projects. 
                  Remove construction debris and restore windows to pristine condition.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    New construction cleanup
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Renovation cleanup
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Construction debris removal
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
                Why Choose Our Commercial Window Cleaning?
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Professional Team</h3>
                <p className="text-gray-600">Uniformed technicians with commercial-grade equipment and training</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Scheduling</h3>
                <p className="text-gray-600">Early morning, after-hours, or weekend service to minimize disruption</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Maintenance Plans</h3>
                <p className="text-gray-600">Weekly, bi-weekly, monthly, or quarterly recurring service options</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Consistent Results</h3>
                <p className="text-gray-600">Reliable service that maintains your property&apos;s professional appearance</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Enhance Your Business Image Today
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get a free quote for professional commercial window cleaning services
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