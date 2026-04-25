import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // Simple middleware that allows all requests
  // Authentication is now handled by the auth context on the client side
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}
