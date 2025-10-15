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
      "href": ${referencePathSnippet}
}
    },
 defined(href.external) => {
   'href': href.external
 }
  }
}`