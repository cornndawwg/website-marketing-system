import { Metadata } from 'next'
import { ServiceSchema } from '@/components/schema-markup'
import { QuoteCalculatorModal } from '@/components/quote-calculator-modal'
import { Button } from '@/components/ui/button'
import { CheckCircle, Shield, Clock, Star, Home, Wrench } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Professional Screen Repair Services | Moreland Window Cleaning',
  description: 'Expert window screen repair and replacement services in Walton County. Fix torn screens, replace damaged frames, and restore your windows.',
  keywords: 'screen repair, window screen replacement, screen door repair, window maintenance, Walton County, screen installation',
}

export default function ScreenRepairPage() {
  return (
    <div className="min-h-screen bg-white">
      <ServiceSchema 
        name="Screen Repair Services"
        description="Professional window screen repair and replacement for residential and commercial properties"
        serviceType="ScreenRepairService"
      />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <span className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider">
                    Screen Repair Services
                  </span>
                  <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                    Restore Your Window Screens
                  </h1>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    Professional screen repair and replacement services that bring your windows back to perfect condition. 
                    From small tears to complete replacements, we handle it all.
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
                    <Shield className="h-24 w-24 mx-auto mb-4" />
                    <div className="text-2xl font-bold">Screen Repair</div>
                    <div className="text-lg">Perfect Windows</div>
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
                Our Screen Repair Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Complete screen repair and replacement solutions for all your window needs
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Wrench className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Screen Repair</h3>
                <p className="text-gray-600 mb-6">
                  Professional repair of torn, damaged, or loose window screens. 
                  We fix small tears and restore functionality to your existing screens.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Tear repair
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Frame tightening
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Hardware replacement
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Screen Replacement</h3>
                <p className="text-gray-600 mb-6">
                  Complete screen replacement with high-quality materials. 
                  New screens that fit perfectly and last for years.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Custom sizing
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Premium materials
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Professional installation
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Home className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Screen Door Repair</h3>
                <p className="text-gray-600 mb-6">
                  Screen door repair and replacement services for sliding and hinged doors. 
                  Keep bugs out while maintaining easy access.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Sliding door screens
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Hinged door screens
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Pet door screens
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
                Why Choose Our Screen Repair?
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Materials</h3>
                <p className="text-gray-600">High-quality screen materials that resist tears and last longer</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Perfect Fit</h3>
                <p className="text-gray-600">Custom-sized screens that fit your windows perfectly</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Service</h3>
                <p className="text-gray-600">Fast turnaround times for repairs and replacements</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Craftsmanship</h3>
                <p className="text-gray-600">Skilled technicians with attention to detail and quality work</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Get Your Screens Fixed Today
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Don&apos;t let torn screens ruin your view. Get professional screen repair services now
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
