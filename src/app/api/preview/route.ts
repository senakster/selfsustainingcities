import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { locales } from '@/lib/i18n/locales'

const previewToken = process.env.NEXT_PUBLIC_PREVIEW_TOKEN

/** Default locale home path so "/" preview hits the correct [locale] route */
const defaultLocaleHome = `/${locales[0]}`

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  if (!previewToken || searchParams.get('token') !== previewToken) {
    return NextResponse.redirect(new URL('/api/preview/disable', request.url))
  }

  const raw = searchParams.get('redirect')?.trim() || ''
  const redirPath =
    !raw || raw === '/' || raw === '%2F'
      ? defaultLocaleHome
      : raw.startsWith('/')
        ? decodeURIComponent(raw)
        : `/${decodeURIComponent(raw)}`

  ;(await draftMode()).enable()
  return NextResponse.redirect(new URL(redirPath, request.url))
}
