import Link from 'next/link'

export function BlogSection() {
  const posts = [
    {
      title: 'Spring Window Cleaning Checklist: Get Sparkling Results',
      excerpt: 'A practical checklist to prepare your home or business for spring with crystal-clear windows.',
      category: 'Window Cleaning',
      date: 'Apr 21, 2024',
      image: '/api/placeholder/400/250',
      slug: 'spring-window-cleaning-checklist'
    },
    {
      title: 'How Often Should Commercial Windows Be Cleaned?',
      excerpt: 'A guide to choosing the right cleaning frequency for storefronts, offices, and multi-tenant buildings.',
      category: 'Commercial',
      date: 'Apr 15, 2024',
      image: '/api/placeholder/400/250',
      slug: 'commercial-window-cleaning-frequency-guide'
    },
    {
      title: 'Top 10 Secrets of Eco-Friendly Window Cleaning',
      excerpt: 'Discover professional techniques for streak-free results using environmentally safe products.',
      category: 'Tips & Tricks',
      date: 'Apr 10, 2024',
      image: '/api/placeholder/400/250',
      slug: 'eco-friendly-window-cleaning-secrets'
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Our Blog</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Latest news
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Link key={index} href={`/blog/${post.slug}`} className="group">
              <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={`https://picsum.photos/400/300?random=${index + 20}`}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-white/90 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">{post.date}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                    {post.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold">
            View All Posts
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
