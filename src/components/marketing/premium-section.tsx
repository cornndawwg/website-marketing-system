export function PremiumSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div>
              <span className="inline-block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Premium Quality</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Make your windows look & feel great
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                At Moreland Window Cleaning, we mix top-tier service with a touch of personality. We're perfectionists who take pride in leaving every client satisfied — and we won't leave until your windows are spotless and you're smiling.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Reliable, Streak-Free Results</h3>
                  <p className="text-gray-600">Professional techniques that deliver crystal-clear windows every time.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Residential & Commercial Expertise</h3>
                  <p className="text-gray-600">From homes to high-rises, we handle any window cleaning challenge.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Insured & Trained Professionals</h3>
                  <p className="text-gray-600">Fully licensed, bonded, and trained technicians you can trust.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img 
                    src="https://picsum.photos/300/300?random=30"
                    alt="Sparkling clean windows"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img 
                    src="https://picsum.photos/300/300?random=31"
                    alt="Commercial window cleaning"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img 
                    src="https://picsum.photos/300/300?random=32"
                    alt="Residential window cleaning"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img 
                    src="https://picsum.photos/300/300?random=33"
                    alt="Professional window cleaning service"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
