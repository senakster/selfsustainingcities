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

export const pageQuery = groq`*[_type == 'page' && language == $language && (!slug.current == $slug || !defined(slug))][0]{
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
