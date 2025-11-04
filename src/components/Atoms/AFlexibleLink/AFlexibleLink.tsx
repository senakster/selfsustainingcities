import Link from 'next/link'
import { ReactNode } from 'react'
import { locales } from '@/lib/i18n/locales'

export type FlexibleLinkProps = {
  href: string
  children: ReactNode
  locale?: typeof locales[number]
  tabIndex?: number
  className?: string
  'aria-hidden'?: boolean
  prefetch?: boolean
  target?: string
}

export default function FlexibleLink({ href, locale, children, target, ...rest }: FlexibleLinkProps) {
  if (typeof href != 'string') return
  const isExternal = href?.startsWith('http') || href?.startsWith('https') || href?.startsWith('//') || href?.startsWith('mailto') || href?.startsWith('tel') || href?.startsWith('www')
  const normalizedHref = href.startsWith('www') ? 'https://' + href : href
  return (
    <Link className='hover:underline hover:opacity-70' href={isExternal ? normalizedHref : locale ? `/${locale}${href}` : href} target={(target ?? isExternal) ? '_blank' : '_self'} {...rest}>
      {children}
    </Link>
  )
}
