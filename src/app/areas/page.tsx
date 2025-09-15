export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Service Areas - Moreland Window Cleaning',
  description: 'We service Walton County, GA and surrounding counties and cities.'
}

import Link from 'next/link'

export default async function AreasPage() {
  const { prisma } = await import('@/lib/prisma')
  const areas = await prisma.serviceArea.findMany({
    where: { active: true },
    orderBy: { name: 'asc' },
    select: { name: true, slug: true }
  })

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Service Areas</h1>
        <p className="text-gray-600 mb-10">We proudly serve the following areas:</p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {areas.map(area => (
            <li key={area.slug}>
              <Link className="block rounded-md border p-4 hover:bg-gray-50" href={`/areas/${area.slug}`}>
                {area.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
