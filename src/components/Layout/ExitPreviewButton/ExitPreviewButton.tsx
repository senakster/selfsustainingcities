'use client'

import AButton from '@/components/Atoms/AButton/AButton'
import { usePathname } from 'next/navigation'

export default function ExitPreviewButton() {
    const pathname = usePathname()
    const onClick = () => {
        if (typeof window !== 'undefined') {
            (window as Window).location.href = '/api/preview/disable?redirect=' + pathname
        }
    }
  return (
    <AButton
      onClick={onClick}
      className='bg-[#2c65c1] cursor-pointer text-white rounded px-4 py-2 text-sm fixed bottom-2 right-2 opacity-90 hover:opacity-100 transition-opacity block z-50'
    >
      Exit preview
    </AButton>
  )
}