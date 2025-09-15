import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const areas = await prisma.serviceArea.findMany({
    where: { active: true },
    orderBy: { name: 'asc' },
    select: { slug: true, name: true }
  })
  return NextResponse.json({ areas })
}
