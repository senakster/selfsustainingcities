import { locales } from '@/lib/i18n/locales'
import { upperFirst } from '@/lib/utils/upperFirst'
import { schema } from '@/sanity/schemaTypes' 
import TextBlock from '@/components/Atoms/ATextBlock/AtextBlock'

const Sections = {
  Textblock: TextBlock
}

export type ComponentProps = {
  data?: unknown
  className?: string
  sectionIdx?: number
  locale?: typeof locales[number]
}
export type SectionProps = {
  sections: {_type: typeof schema.types[number]['name'], _key: string
    [key: string]: unknown
  }[]
  locale?: typeof locales[number]
}

export default function SectionsResolver({ sections, locale }: SectionProps) {
  // return (<div>
  //   {JSON.stringify(sections.map(section => resolveSections(section)))}
  //   </div>)
  return (
    <>
      {sections.map((section, idx) => {
        const Section = resolveSections(section)
        if (!Section) {
          return <div key={section._key}>Missing section: {upperFirst(section._type)}</div>
        }
        return <Section className='' data={section} sectionIdx={idx} key={section._key} locale={locale} />
      })}
    </>
  )
}

type SectionsModule = Record<string, React.ComponentType<{ data: unknown; className?: string; sectionIdx: number; locale?: typeof locales[number] }>> // TODO: fix this

function resolveSections(section: SectionProps['sections'][number]) {
  const sectionName = upperFirst(section._type)
  try {
  const Section = (Sections as unknown as SectionsModule)[sectionName]
  if (Section) return Section
  } catch (e: unknown) {
    console.error('Cant find section', e)
    return null
  }
  return null
}
