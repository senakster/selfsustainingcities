import { groq } from 'next-sanity'

/**
 * docReferencePathQuery
 * @description Resolves path for every possible doc-types
 */
export const referencePathSnippet = groq`
  select(
    _type in ['page'] && defined(parent->parent->slug) && defined(language) => "/" + language + "/" + parent->parent->slug.current + "/" + parent->slug.current + "/" + slug.current,
    _type in ['page'] && defined(parent->slug) && defined(language) => "/" + language + "/" + parent->slug.current + "/" + slug.current,
    _type in ['page'] && defined(language) && defined(slug) => "/" + language + "/" + slug.current,
    defined(language) => "/" + language,
    "/"
  )
`

export type TReferencePath = string
