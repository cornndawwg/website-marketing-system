import { NextResponse } from 'next/server'

export async function GET() {
  const { prisma } = await import('@/lib/prisma')
  const areas = await prisma.serviceArea.findMany({
    where: { active: true },
    orderBy: { name: 'asc' },
    select: { slug: true, name: true }
  })
  return NextResponse.json({ areas })
}
