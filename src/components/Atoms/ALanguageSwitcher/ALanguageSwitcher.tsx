import { locales, supportedLanguages } from '@/lib/i18n/locales'
import { LanguageIcon } from '@/assets/icons/Language'

export default function LanguageSwitcher({ locale }: { locale: typeof locales[number] }) {
  const restLanguages = supportedLanguages
    .filter((lang) => {
      return lang.id != locale
    })
    .sort((a, b) => a.title.localeCompare(b.title))
  return (
    <div>
      {restLanguages.map((lang, index) => (
        <a key={lang.id} href={`/${lang.id}`} className='flex items-center gap-1'>
          <LanguageIcon className="inline-block size-4" />
          <span>{lang.title}</span> {index < restLanguages.length - 1 && <span className='mx-1'>|</span>}
        </a>
      ))}
    </div>
  )
}
