import { groq } from "next-sanity";
import { parentSlugSnippet, portableTextSnippet, imageSnippet } from "./snippets";
import { SectionProps } from "@/components/Layout/SectionsResolver/SectionsResolver";
import { PortableTextMarkDefinition } from "@portabletext/types";
import { schema } from "@/sanity/schemaTypes";
import type {ImageObject} from '@/components/Atoms/AImage/AImage.types'

export type PageQueryProps = {
  title: string;
  language?: string;
  seo?: {
    title?: string;
    description?: string;
    image?: ImageObject;
    canonical?: string;
  };
  slug: string[];
  hero?: {
    headline?: string;
    leadText?: {
      _key: string;
      _type: typeof schema.types[number]['name'];
      text?: PortableTextMarkDefinition;
    };
    image?: ImageObject;
  };
  content?: SectionProps['sections'];
};


/**
 * Page query
 * @description Query to get a page by slug and language
 * @param slug - The slug of the page
 * @param language - The language of the page
 * @param parentSlug - The slug of the parent page
 * @param grandParentSlug - The slug of the grandparent page
 * @returns The page
 */
export const pageQuery = groq`*[language == $language &&
     _type in ["page"] &&
    slug.current == $slug 
    && ((!defined(parent._ref) && !defined($parentSlug) ) || parent->slug.current == $parentSlug) && 
  ((!defined(parent->parent._ref) && !defined($grandParentSlug)) || parent->parent->slug.current == $grandParentSlug)
  ][0]{
    ...,
    language,
    hero{
     headline,
     "leadText": leadText.text[]${portableTextSnippet},
     image${imageSnippet},
    },
    "slug": ${parentSlugSnippet},
    content[]{
      ...,
      _type == 'textBlock' => {
        text[]${portableTextSnippet}
      }
    }
}
`
