import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Moreland Window Cleaning</h3>
            <p className="text-gray-300 mb-6">
              Professional window cleaning services in Walton County, GA and surrounding areas. 
              We provide reliable, high-quality service for residential and commercial properties.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@morelandwindowcleaning.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Walton County, GA</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/residential" className="text-gray-300 hover:text-white">Residential Cleaning</Link></li>
              <li><Link href="/commercial" className="text-gray-300 hover:text-white">Commercial Cleaning</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-white">Gutter Cleaning</Link></li>
              <li><Link href="/services" className="text-gray-300 hover:text-white">Additional Services</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link href="/blog" className="text-gray-300 hover:text-white">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              <li><Link href="/quote" className="text-gray-300 hover:text-white">Get Quote</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Moreland Window Cleaning. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
