'use client'

import { useState } from 'react'
import { BlogPostList } from '@/components/blog/blog-post-list'
import { BlogPostEditor } from '@/components/blog/blog-post-editor'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage?: string
  category: string
  tags: string[]
  status: 'draft' | 'published'
  publishedAt?: Date
  seoTitle?: string
  seoDescription?: string
  createdAt: Date
  updatedAt: Date
  viewCount?: number
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: '5 Essential Window Cleaning Tips for Spring',
      slug: '5-essential-window-cleaning-tips-spring',
      excerpt: 'Get your windows sparkling clean this spring with these professional tips and techniques.',
      content: '# 5 Essential Window Cleaning Tips for Spring\n\nSpring is the perfect time to...',
      category: 'window-cleaning-tips',
      tags: ['spring', 'cleaning', 'tips', 'windows'],
      status: 'published',
      publishedAt: new Date('2024-03-15'),
      seoTitle: '5 Essential Window Cleaning Tips for Spring | Moreland Window Cleaning',
      seoDescription: 'Professional window cleaning tips for spring. Learn the best techniques for sparkling clean windows.',
      createdAt: new Date('2024-03-10'),
      updatedAt: new Date('2024-03-15'),
      viewCount: 245
    },
    {
      id: '2',
      title: 'Commercial Window Cleaning: What to Expect',
      slug: 'commercial-window-cleaning-what-expect',
      excerpt: 'Everything you need to know about commercial window cleaning services and what to expect.',
      content: '# Commercial Window Cleaning: What to Expect\n\nCommercial window cleaning...',
      category: 'commercial-services',
      tags: ['commercial', 'business', 'cleaning', 'services'],
      status: 'draft',
      createdAt: new Date('2024-03-20'),
      updatedAt: new Date('2024-03-20'),
      viewCount: 0
    }
  ])

  const [currentView, setCurrentView] = useState<'list' | 'editor' | 'viewer'>('list')
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  const handleCreateNew = () => {
    setSelectedPost(null)
    setCurrentView('editor')
  }

  const handleEdit = (post: BlogPost) => {
    setSelectedPost(post)
    setCurrentView('editor')
  }

  const handleView = (post: BlogPost) => {
    setSelectedPost(post)
    setCurrentView('viewer')
  }

  const handleDelete = async (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(post => post.id !== postId))
    }
  }

  const handleSave = async (postData: Partial<BlogPost>) => {
    if (selectedPost) {
      // Update existing post
      setPosts(prev => prev.map(post => 
        post.id === selectedPost.id 
          ? { ...post, ...postData, updatedAt: new Date() }
          : post
      ))
    } else {
      // Create new post
      const newPost: BlogPost = {
        id: Date.now().toString(),
        title: postData.title || '',
        slug: postData.slug || '',
        excerpt: postData.excerpt || '',
        content: postData.content || '',
        featuredImage: postData.featuredImage,
        category: postData.category || 'general',
        tags: postData.tags || [],
        status: postData.status || 'draft',
        publishedAt: postData.publishedAt,
        seoTitle: postData.seoTitle,
        seoDescription: postData.seoDescription,
        createdAt: new Date(),
        updatedAt: new Date(),
        viewCount: 0
      }
      setPosts(prev => [newPost, ...prev])
    }
    setCurrentView('list')
  }

  const handlePublish = async (postData: Partial<BlogPost>) => {
    await handleSave(postData)
  }

  const handleBackToList = () => {
    setCurrentView('list')
    setSelectedPost(null)
  }

  if (currentView === 'editor') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBackToList}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back to Posts
          </button>
        </div>
        <BlogPostEditor
          post={selectedPost || undefined}
          onSave={handleSave}
          onPublish={handlePublish}
          onDelete={handleDelete}
        />
      </div>
    )
  }

  if (currentView === 'viewer') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBackToList}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back to Posts
          </button>
        </div>
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-lg max-w-none">
            <h1>{selectedPost?.title}</h1>
            <div className="text-gray-600 mb-6">
              <p>{selectedPost?.excerpt}</p>
              <div className="flex items-center gap-4 mt-4 text-sm">
                <span>Category: {selectedPost?.category}</span>
                <span>Status: {selectedPost?.status}</span>
                {selectedPost?.publishedAt && (
                  <span>Published: {selectedPost.publishedAt.toLocaleDateString()}</span>
                )}
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3>Content Preview:</h3>
              <pre className="whitespace-pre-wrap text-sm">
                {selectedPost?.content}
              </pre>
            </div>
          </article>
        </div>
      </div>
    )
  }

  return (
    <BlogPostList
      posts={posts}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onView={handleView}
      onCreateNew={handleCreateNew}
    />
  )
}
