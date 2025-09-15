export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'

interface Params { params: { slug: string } }

export default async function AreaPage({ params }: Params) {
  const { prisma } = await import('@/lib/prisma')
  const area = await prisma.serviceArea.findUnique({ where: { slug: params.slug } })
  if (!area) return notFound()

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Window Cleaning in {area.name}
        </h1>
        <p className="text-gray-700 mb-6">
          Moreland Window Cleaning proudly serves {area.name}. We provide residential and commercial window
          cleaning, gutter cleaning, screen cleaning, and hard water stain removal. Request a quote to get
          an instant price range.
        </p>
        <a href="#quote" className="inline-flex items-center rounded-md bg-blue-600 px-6 py-3 text-white font-semibold shadow hover:bg-blue-700 transition">
          Get an instant quote
        </a>
      </div>
    </main>
  )
}
