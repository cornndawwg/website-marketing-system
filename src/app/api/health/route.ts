import { NextResponse } from 'next/server'

export async function GET() {
  // Ultra-simple health check - just return OK
  return NextResponse.json({ status: 'ok' })
}
