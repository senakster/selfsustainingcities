import { referencePathSnippet } from "./snippets";
import { groq } from "next-sanity";

export const navigationQuery = groq`
*[_type == 'page' && language == $language && defined(slug)]{
    "url": ${referencePathSnippet},
    title,
} | order(title asc)`

export type NavigationItem = {
    url: string;
    title: string;
}