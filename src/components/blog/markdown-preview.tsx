'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, Edit } from 'lucide-react'

interface MarkdownPreviewProps {
  content: string
  title?: string
}

export function MarkdownPreview({ content, title }: MarkdownPreviewProps) {
  const [isPreview, setIsPreview] = useState(false)

  const renderMarkdown = (text: string) => {
    // Simple markdown rendering - in production, you'd use a proper markdown parser
    return text
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-3">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mb-2">$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4 class="text-lg font-bold mb-2">$1</h4>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
      .replace(/`(.*?)`/gim, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm">$1</code>')
      .replace(/^\- (.*$)/gim, '<li class="ml-4">• $1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-4">$1</li>')
      .replace(/\n\n/gim, '</p><p class="mb-4">')
      .replace(/\n/gim, '<br>')
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {isPreview ? (
              <>
                <Eye className="h-5 w-5" />
                Preview
              </>
            ) : (
              <>
                <Edit className="h-5 w-5" />
                Content
              </>
            )}
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPreview(!isPreview)}
          >
            {isPreview ? (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isPreview ? (
          <div className="prose prose-lg max-w-none">
            {title && <h1 className="text-3xl font-bold mb-6">{title}</h1>}
            <div 
              className="markdown-content"
              dangerouslySetInnerHTML={{ 
                __html: renderMarkdown(content || 'No content to preview') 
              }}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Write your content in Markdown format. Use the preview button to see how it will look.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Markdown Tips:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Use # for headings</li>
                <li>• Use **bold** for bold text</li>
                <li>• Use *italic* for italic text</li>
                <li>• Use `code` for inline code</li>
                <li>• Use - for bullet points</li>
                <li>• Use 1. for numbered lists</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
