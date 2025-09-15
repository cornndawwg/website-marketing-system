import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MapPin, Phone, Mail } from 'lucide-react'

export function ContactSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left side - Contact info */}
          <div className="space-y-8">
            <div>
              <span className="inline-block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Contact Us</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Have questions? Get in touch!
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Ready to see the difference professional window cleaning can make? Contact us today for a free quote.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Service Area</h3>
                  <p className="text-gray-600">Walton County and surrounding areas including Monroe, Loganville, Winder, and more.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                  <p className="text-gray-600">(770) 298-8370</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">info@morelandwindowcleaning.com</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Contact form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <Input id="name" type="text" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <Input id="phone" type="tel" placeholder="(770) 123-4567" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <Input id="subject" type="text" placeholder="Window cleaning quote" />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <Textarea 
                  id="message" 
                  placeholder="How can we help you? Feel free to get in touch!"
                  rows={4}
                />
              </div>
              
              <div className="flex items-start gap-3">
                <input type="checkbox" id="privacy" className="mt-1" />
                <label htmlFor="privacy" className="text-sm text-gray-600">
                  I agree to the privacy policy
                </label>
              </div>
              
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Get in Touch
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
