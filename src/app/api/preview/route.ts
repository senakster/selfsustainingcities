import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

const previewToken = process.NEXT_PUBLIC_PREVIEW_TOKEN

export async function GET(request: NextRequest) {
    
    const { searchParams } = new URL(request.url)
  
  if (searchParams.get('token') != previewToken) {
    return redirect('/api/exit-preview')
  }

  const redirPath = searchParams.get('redirect') ?? '/'

  draftMode().enable()
  return redirect(redirPath)
}
