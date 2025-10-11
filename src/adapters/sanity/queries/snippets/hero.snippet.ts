import {groq} from 'next-sanity'
export const imageSnippet = groq`{
      headline,
       "leadText": leadText.text[]{
        _type == "link" => {...}
      _type == 'baseImage' => {
        alt,
        ...asset->
      }},
      image{
        ...,
        asset->
      }
}`