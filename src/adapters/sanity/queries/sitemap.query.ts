import { groq } from "next-sanity";
import { referencePathSnippet } from "./snippets";


export type SitemapItem = {
    url: string;
    lastModified: string;
    changeFrequency: string;
    priority: number;
    images: string[];
}

export const sitemapQuery = groq`
*[_type == 'page' && language == $language][]{
    "url": ${referencePathSnippet},
    "lastModified": _updatedAt,
    "changeFrequency": "monthly",
    "priority": 1,
    ((defined(slug)) && !defined(parent)) => {
        "priority": 0.8
    },
    ((defined(slug)) && defined(parent)) => {
        "priority": 0.5
    },
    ((defined(slug)) && defined(parent->parent)) => {
       "priority": 0.4
    }
} | order(priority desc)`