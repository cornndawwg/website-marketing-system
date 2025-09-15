export const metadata = {
  title: 'FAQ - Moreland Window Cleaning',
  description: 'Frequently asked questions about our window cleaning services in Walton County, GA.'
}

const faqs = [
  {
    q: 'What areas do you serve?',
    a: 'We serve Walton County, GA and surrounding areas including Monroe, Loganville, Barrow County, Oconee County, Morgan County, Newton County, Rockdale County, and Gwinnett County.'
  },
  { q: 'How often should I have my windows cleaned?', a: 'For residential properties, quarterly cleaning is ideal. Commercial properties may need weekly to monthly service depending on traffic and exposure.' },
  { q: 'Do you clean interior and exterior windows?', a: 'Yes, we offer interior-only, exterior-only, or both sides as needed.' },
  { q: 'What other services do you offer?', a: 'Screen cleaning, track and sill cleaning, hard water stain removal, skylight cleaning, and gutter cleaning.' },
  { q: 'Do you provide free estimates?', a: 'Yes. Use our online quote calculator for an instant range or contact us for a detailed estimate.' },
]

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
        <p className="text-gray-600 mb-10">Answers to common questions about our services and process.</p>
        <div className="divide-y divide-gray-200">
          {faqs.map((item, idx) => (
            <div key={idx} className="py-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.q}</h2>
              <p className="text-gray-700">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}


