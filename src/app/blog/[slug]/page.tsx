import { notFound } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Tag, ArrowLeft, Share2, Clock } from 'lucide-react'
import Link from 'next/link'

// Mock data - in production, this would come from your database
const blogPosts = [
  {
    id: '1',
    title: '5 Essential Window Cleaning Tips for Spring',
    slug: '5-essential-window-cleaning-tips-spring',
    excerpt: 'Get your windows sparkling clean this spring with these professional tips and techniques.',
    content: `# 5 Essential Window Cleaning Tips for Spring

Spring is the perfect time to give your windows a thorough cleaning. After a long winter, your windows have likely accumulated dirt, grime, and streaks that can make your home look dull and uninviting.

## 1. Choose the Right Time

The best time to clean windows is on a cloudy day or early in the morning. Direct sunlight can cause your cleaning solution to dry too quickly, leaving streaks behind.

## 2. Use the Right Tools

Professional window cleaners use:
- Squeegees with rubber blades
- Microfiber cloths
- Extension poles for high windows
- Professional cleaning solutions

## 3. Start with the Right Solution

Mix a solution of:
- 1 gallon of water
- 1/4 cup of white vinegar
- 1 tablespoon of dish soap

This creates an effective, streak-free cleaning solution.

## 4. Work from Top to Bottom

Always start cleaning from the top of the window and work your way down. This prevents dirty water from running down onto already cleaned areas.

## 5. Dry Immediately

Use a clean, dry microfiber cloth to immediately dry the window after cleaning. This prevents water spots and streaks from forming.

## Professional Results

While these tips will help you achieve better results, nothing beats the expertise and equipment of professional window cleaners. At Moreland Window Cleaning, we use commercial-grade equipment and techniques to ensure your windows are spotless.

Contact us today for a free estimate on your window cleaning needs!`,
    featuredImage: '/images/blog/spring-cleaning-tips.jpg',
    category: 'window-cleaning-tips',
    tags: ['spring', 'cleaning', 'tips', 'windows'],
    publishedAt: new Date('2024-03-15'),
    seoTitle: '5 Essential Window Cleaning Tips for Spring | Moreland Window Cleaning',
    seoDescription: 'Professional window cleaning tips for spring. Learn the best techniques for sparkling clean windows.',
    readTime: '5 min read',
    viewCount: 245
  }
]

const relatedPosts = [
  {
    id: '2',
    title: 'Commercial Window Cleaning: What to Expect',
    slug: 'commercial-window-cleaning-what-expect',
    excerpt: 'Everything you need to know about commercial window cleaning services.',
    category: 'commercial-services',
    publishedAt: new Date('2024-03-10'),
    readTime: '7 min read'
  },
  {
    id: '3',
    title: 'Why Regular Window Cleaning Matters for Your Home',
    slug: 'why-regular-window-cleaning-matters',
    excerpt: 'Discover the benefits of regular window cleaning for your home.',
    category: 'maintenance',
    publishedAt: new Date('2024-03-05'),
    readTime: '4 min read'
  }
]

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/blog" className="text-blue-600 hover:text-blue-800">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <span className="text-gray-500">Back to Blog</span>
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline">
              {post.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </Badge>
            <span className="text-sm text-gray-500">•</span>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </div>
            <span className="text-sm text-gray-500">•</span>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              {post.publishedAt.toLocaleDateString()}
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6">
            {post.excerpt}
          </p>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <div className="text-sm text-gray-500">
              {post.viewCount} views
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="prose prose-lg max-w-none">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {post.content}
                </div>
              </div>
            </article>

            {/* Tags */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag}`}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Need Professional Window Cleaning?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Let our experienced team handle your window cleaning needs with professional equipment and techniques.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/quote">
                      <Button size="lg">
                        Get Free Quote
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button variant="outline" size="lg">
                        Contact Us
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Related Posts */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Related Posts</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        href={`/blog/${relatedPost.slug}`}
                        className="block hover:bg-gray-50 p-3 rounded-lg transition-colors"
                      >
                        <h4 className="font-medium text-gray-900 mb-1">
                          {relatedPost.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Badge variant="outline" className="text-xs">
                            {relatedPost.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </Badge>
                          <span>•</span>
                          <span>{relatedPost.readTime}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Get the latest window cleaning tips and industry news delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                    <Button className="w-full" size="sm">
                      Subscribe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}
