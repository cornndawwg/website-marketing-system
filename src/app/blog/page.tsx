import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Tag, ArrowRight } from 'lucide-react'
import Link from 'next/link'

// Mock data - in production, this would come from your database
const blogPosts = [
  {
    id: '1',
    title: '5 Essential Window Cleaning Tips for Spring',
    slug: '5-essential-window-cleaning-tips-spring',
    excerpt: 'Get your windows sparkling clean this spring with these professional tips and techniques that will make your home shine.',
    featuredImage: '/images/blog/spring-cleaning-tips.jpg',
    category: 'window-cleaning-tips',
    tags: ['spring', 'cleaning', 'tips', 'windows'],
    publishedAt: new Date('2024-03-15'),
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Commercial Window Cleaning: What to Expect',
    slug: 'commercial-window-cleaning-what-expect',
    excerpt: 'Everything you need to know about commercial window cleaning services and what to expect from professional cleaners.',
    featuredImage: '/images/blog/commercial-cleaning.jpg',
    category: 'commercial-services',
    tags: ['commercial', 'business', 'cleaning', 'services'],
    publishedAt: new Date('2024-03-10'),
    readTime: '7 min read'
  },
  {
    id: '3',
    title: 'Why Regular Window Cleaning Matters for Your Home',
    slug: 'why-regular-window-cleaning-matters',
    excerpt: 'Discover the benefits of regular window cleaning and how it can improve your home\'s appearance and value.',
    featuredImage: '/images/blog/regular-cleaning.jpg',
    category: 'maintenance',
    tags: ['maintenance', 'home', 'value', 'appearance'],
    publishedAt: new Date('2024-03-05'),
    readTime: '4 min read'
  }
]

const categories = [
  { name: 'All', slug: 'all', count: blogPosts.length },
  { name: 'Window Cleaning Tips', slug: 'window-cleaning-tips', count: 1 },
  { name: 'Commercial Services', slug: 'commercial-services', count: 1 },
  { name: 'Maintenance', slug: 'maintenance', count: 1 }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Window Cleaning Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert tips, industry insights, and professional advice for keeping your windows sparkling clean
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/blog/category/${category.slug}`}
                      className="flex items-center justify-between p-2 rounded hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm">{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </Link>
                  ))}
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {['cleaning', 'tips', 'windows', 'commercial', 'maintenance', 'spring'].map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog/tag/${tag}`}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Stay Updated</CardTitle>
                  <CardDescription>
                    Get the latest window cleaning tips and industry news
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                  <Button className="w-full">
                    Subscribe
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="md:flex">
                    {post.featuredImage && (
                      <div className="md:w-1/3">
                        <div className="h-48 md:h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">Featured Image</span>
                        </div>
                      </div>
                    )}
                    <div className={`${post.featuredImage ? 'md:w-2/3' : 'w-full'} p-6`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">
                          {post.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{post.readTime}</span>
                      </div>
                      
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        <Link 
                          href={`/blog/${post.slug}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      
                      <p className="text-gray-600 mb-4">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {post.publishedAt.toLocaleDateString()}
                          </div>
                        </div>
                        
                        <Link href={`/blog/${post.slug}`}>
                          <Button variant="outline" size="sm">
                            Read More
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </Link>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.map((tag) => (
                          <Link
                            key={tag}
                            href={`/blog/tag/${tag}`}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors"
                          >
                            <Tag className="h-3 w-3" />
                            {tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled>
                  Previous
                </Button>
                <Button variant="outline">1</Button>
                <Button variant="outline" disabled>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
