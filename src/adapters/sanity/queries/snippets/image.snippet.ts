import {groq} from 'next-sanity'
export const imageSnippet = groq`image{
    alt,
    ...asset->
}`