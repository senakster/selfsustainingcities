import { groq } from "next-sanity";
import { pathSnippet } from "./path.snippet";

export type PageQueryProps = {
    title: string
    slug: string
    parent: string
}
export const pageQuery = groq`
*[_type == 'page' ][0]{
    title,
    "slug": ${pathSnippet}
}
`