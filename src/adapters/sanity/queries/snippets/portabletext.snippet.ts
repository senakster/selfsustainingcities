import { groq } from 'next-sanity'
import { imageSnippet } from './image.snippet'
import { flexibleRefsSnippet } from './flexibleRefs.snippet'

/**
 * portableTextQuery
 * @description Resolves all types of portable texts. Use type TDocReferencePath
 */

export const portableTextSnippet = groq`{
  ...,
   markDefs[]{
    _type == "link" => {
          _type,
          _key,
          ...${flexibleRefsSnippet}
      }
   },
  _type == 'baseImage' => ${imageSnippet}
}`
// export const portableTextSnippet = groq`{
//        ...,
//         markDefs[] {
//           ...,
//           _type == "link" => {"href": markDefs[0].href.href.internal->slug.current},
//         },
//        _type == 'baseImage' => ${imageSnippet}
// }`