import AFlexibleLink from '@/components/Atoms/AFlexibleLink/AFlexibleLink'
import Link from '@/components/Atoms/AFlexibleLink/AFlexibleLink'
import AImage from '@/components/Atoms/AImage/AImage'
import { ImageObject } from '@/components/Atoms/AImage/AImage.types'
import { PortableText, PortableTextMarkComponentProps, PortableTextReactComponents } from '@portabletext/react'
import type { PortableTextMarkDefinition } from '@portabletext/types'

// import BaseImage from './BaseImage'
// import { TBaseImage } from '@/sanity/schemas/fields/baseImage/baseImage.props'
// import { tap } from 'rxjs/operators';

export default function PortableTextResolver({ text }: { text?: PortableTextMarkDefinition }) {
  return (
      <PortableText value={text || []} components={components} />
  )
}

// Custom components config
const baseStyle = 'text-base mb-4 last:mb-0'
const components: Partial<PortableTextReactComponents> = {
  block: {
    h2: ({ children }) => (
      <h2 className={`text-heading-xs lg:text-heading-sm font-bold mt-6 mb-1`}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className={`text-heading-2xs lg:text-heading-xs font-bold mt-2 mb-1`}>{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className={`text-base lg:text-heading-xs font-bold mt-2 mb-1`}>{children}</h4>
    ),
    normal: ({ children }) => <p className={`${baseStyle}`}>{children}</p>,
    blockquote: ({ children }) => ( 
      <blockquote className={`${baseStyle} italic before:content-['“'] after:content-['”']`}>
        {children}
      </blockquote>
    ),
  },
  marks: {
    linkInternal: LinkInternal,
    linkExternal: LinkExternal,
    link: (props) => {
      return (
      <AFlexibleLink href={props?.value?.href ?? ''}>{props.children}</AFlexibleLink>
    )},
    em: (m) => <span className='italic'>{m.children}</span>,
    strong: (m) => {
      return <span className='font-bold'>{m.children}</span>
    },
    code: (m) => {
      return <pre className='code'>{m.children}</pre>
    },
    underline: (m) => {
      return <span className='underline'>{m.children}</span>
    },
    'strike-through': (m) => {
      return <span className='line-through'>{m.children}</span>
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className={`${baseStyle} list-disc list-outside ml-6`}>{children}</ul>
    ),
    number: ({ children }) => (
      <ol className={`${baseStyle} list-decimal list-outside ml-6`}>{children}</ol>
    ),
  },
  types: {
    baseImage: ({ value }: { value: ImageObject }) => {
      if (!value?.asset) return <p>{JSON.stringify(value)}</p>
      return (
        <div className={`${baseStyle}`}>
          <AImage
            imageObj={value}
            width={800}
            aspectRatio={'as-is'} // "as-is" will render original image size
            // aspectRatioDesktop={16 / 9}
            sizes={'(max-width: 720px) 100vw, 720px'}
            className='rounded-3xl object-contain'
            priority={true}
          />
        </div>
      )
    },
  },
}

function LinkInternal(props: PortableTextMarkComponentProps<{ path: string, text: string, _type: 'linkInternal' }>) {
  console.log('internal', props)
  // PortableTextMarkComponentProps has: children, value, etc.
  return (
    <Link className='underline' href={props?.value?.path ?? ''} prefetch={false}>
      {props.text}
    </Link>
  )
}

function LinkExternal(props: PortableTextMarkComponentProps<{ href: string, text: string, _type: 'linkExternal' }>) {
  console.log('external', props)
  return (
    <a className='underline' target={'_blank'} href={props?.value?.href ?? ''}>
      {props?.children}
    </a>
  )
}
