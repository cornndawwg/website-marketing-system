import { Metadata } from 'next'
import { QuoteCalculatorModal } from '@/components/quote-calculator-modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us | Moreland Window Cleaning - Get Your Free Quote',
  description: 'Contact Moreland Window Cleaning for professional window cleaning services in Walton County, GA. Call (770) 298-8370 or get a free quote online.',
  keywords: 'contact, window cleaning, Walton County, Georgia, free quote, phone number',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Get In Touch
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Ready to see the difference professional window cleaning can make? 
                Contact us today for a free quote or to schedule your service.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Left side - Contact info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                    Contact Information
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    We&apos;re here to help with all your window cleaning needs. 
                    Reach out to us using any of the methods below.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                      <p className="text-gray-600 text-lg">(770) 298-8370</p>
                      <p className="text-sm text-gray-500">Call us for immediate assistance</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600">info@morelandwindowcleaning.com</p>
                      <p className="text-sm text-gray-500">Send us a message anytime</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Service Area</h3>
                      <p className="text-gray-600">Walton County and surrounding areas</p>
                      <p className="text-sm text-gray-500">Including Monroe, Loganville, Winder, and more</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                      <div className="text-gray-600 space-y-1">
                        <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                        <p>Saturday: 9:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right side - Contact form */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                      <Input id="name" type="text" placeholder="Your name" required />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <Input id="email" type="email" placeholder="your@email.com" required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <Input id="phone" type="tel" placeholder="(770) 123-4567" />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">Service Needed</label>
                      <select id="service" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Select a service</option>
                        <option value="residential">Residential Window Cleaning</option>
                        <option value="commercial">Commercial Window Cleaning</option>
                        <option value="pressure-washing">Pressure Washing</option>
                        <option value="gutter-cleaning">Gutter Cleaning</option>
                        <option value="screen-repair">Screen Repair</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us about your window cleaning needs..."
                      rows={5}
                      required
                    />
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <input type="checkbox" id="privacy" className="mt-1" required />
                    <label htmlFor="privacy" className="text-sm text-gray-600">
                      I agree to the privacy policy and terms of service *
                    </label>
                  </div>
                  
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="space-y-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">How often should I have my windows cleaned?</h3>
                <p className="text-gray-600">
                  For most homes, we recommend professional window cleaning every 3-6 months. 
                  However, this can vary based on your location, weather conditions, and personal preferences.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Do you provide free quotes?</h3>
                <p className="text-gray-600">
                  Yes! We provide free, no-obligation quotes for all our services. 
                  You can get an instant estimate using our online quote calculator or call us directly.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">What areas do you serve?</h3>
                <p className="text-gray-600">
                  We serve Walton County and surrounding areas including Monroe, Loganville, Winder, 
                  and other nearby communities. Contact us to confirm service availability in your area.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Are you licensed and insured?</h3>
                <p className="text-gray-600">
                  Yes, we are fully licensed and insured. Your property and our team are protected 
                  with comprehensive insurance coverage.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
