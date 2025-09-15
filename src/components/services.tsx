import Link from 'next/link'

export function Services() {
  const services = [
    {
      title: 'Residential Window Cleaning',
      description: 'Crystal-clear windows that boost your home\'s curb appeal and let the sunshine in.',
      image: '/api/placeholder/400/300',
      category: 'Home Care'
    },
    {
      title: 'Commercial Window Cleaning',
      description: 'Professional window cleaning that helps your business make a spotless first impression.',
      image: '/api/placeholder/400/300',
      category: 'Business Solutions'
    },
    {
      title: 'Screen & Track Cleaning',
      description: 'We remove dust, grime, and buildup from screens and tracks for a complete window refresh.',
      image: '/api/placeholder/400/300',
      category: 'Home Care / Business Solution'
    },
    {
      title: 'Interior / Exterior Packages',
      description: 'Get the full treatment with inside-and-out window cleaning tailored to your space.',
      image: '/api/placeholder/400/300',
      category: 'Home Care'
    },
    {
      title: 'Routine Maintenance Plans',
      description: 'Stay effortlessly clean year-round with scheduled service options that fit your lifestyle.',
      image: '/api/placeholder/400/300',
      category: 'Home Care / Business Solutions'
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            How Can We Assist You Today?
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] relative overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <div className="text-center text-blue-600">
                    <div className="text-4xl mb-2">🏠</div>
                    <div className="text-sm font-medium">Window Cleaning</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block bg-white/90 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {service.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}