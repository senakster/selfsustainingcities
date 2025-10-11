import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  (await draftMode()).disable()
  const url = new URL(request.nextUrl)
  const redirect = url.searchParams.get('redirect')
  if (redirect) {
    return NextResponse.redirect(new URL(redirect, url.origin))
  }
  return NextResponse.redirect(new URL('/', url.origin))
}
