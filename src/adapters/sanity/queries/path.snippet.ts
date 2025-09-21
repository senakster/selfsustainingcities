import { groq } from "next-sanity";

export const parentSlugSnippet = groq`
*[ _id == parent._ref][0].slug.current
`;
export const grandParentSlugSnippet = groq`
*[ _id == parent->parent._ref][0].slug.current
`;
export const greatGrandParentSlugSnippet = groq`
*[ _id == parent->parent->parent._ref][0].slug.current
`;
export const pathSnippet = groq`
[${greatGrandParentSlugSnippet}, ${grandParentSlugSnippet}, ${parentSlugSnippet} ,slug.current]
`;
