import Link from 'next/link'
import { ReactNode } from 'react'
import { locales } from '@/lib/i18n/locales'

type Props = {
  href: string
  children: ReactNode
  locale?: typeof locales[number]
  tabIndex?: number
  className?: string
  'aria-hidden'?: boolean
  prefetch?: boolean
  target?: string
}

export default function FlexibleLink({ href, locale, children, target, ...rest }: Props) {
  return (
    <Link href={locale ? `/${locale}${href}` : href} target={(target ?? href.startsWith('http')) ? '_blank' : '_self'} {...rest}>
      {children}
    </Link>
  )
}
