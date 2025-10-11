import { groq } from 'next-sanity'
import { flexibleRefsSnippet } from './flexibleRefs.snippet'

/**
 * portableTextQuery
 * @description Resolves all types of portable texts. Use type TDocReferencePath
 */
export const portableTextSnippet = groq`{
  ...,
  markDefs[] {
    ...,
    _type == "link" => ${flexibleRefsSnippet},
  },
  _type == "baseImage" => {
    ...,
    asset->
  },
}`