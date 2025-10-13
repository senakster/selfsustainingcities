import { groq } from 'next-sanity'
import { referencePathSnippet } from './referencePaths.snippet'

// export const flexibleRefsSnippet = groq`{
//   defined(internal) => {
//     ...internal-> {
//       'href': ${referencePathSnippet}
//     }
//   },
//   defined(external) => {
//     'href': select(external in path("www.**") => "https://" + external, external)
//   }
// }`

export const flexibleRefsSnippet = groq`{
  ...href{
    defined(href.internal) => {
      ...href.internal->{
      "href":   select(
     _type in ['page'] && defined(parent->parent->slug) && defined(language) => "/" + language + "/" + parent->parent->slug.current + "/" + parent->slug.current + "/" + slug.current,
     _type in ['page'] && defined(parent->slug) && defined(language) => "/" + language + "/" + parent->slug.current + "/" + slug.current,
     _type in ['page'] && defined(language) && defined(slug) => "/" + language + "/" + slug.current,
     defined(language) => "/" + language,
     "/"
),
}
    },
 defined(href.external) => {
   'href': href.external
 }
  }
}`