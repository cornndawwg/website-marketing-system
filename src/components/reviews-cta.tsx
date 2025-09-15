import Link from 'next/link'

export function ReviewsCTA() {
  const googleReviewsUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL || '#'
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Read Our Google Reviews</h2>
          <p className="text-lg text-gray-600 mb-8">See what customers say about Moreland Window Cleaning. We value your feedback and would love your review too.</p>
          <Link href={googleReviewsUrl} target={googleReviewsUrl === '#' ? undefined : '_blank'} className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-white font-semibold shadow hover:bg-blue-700 transition">
            View Reviews on Google
          </Link>
        </div>
      </div>
    </section>
  )
}


