import { groq } from "next-sanity";
import { pathSnippet } from "./path.snippet";
import { SectionProps } from "@/components/Layout/SectionResolver/SectionsResolver";
import { PortableTextMarkDefinition } from "@portabletext/types";
import { schema } from "@/sanity/schemaTypes";

export type PageQueryProps = {
  title: string;
  slug: string;
  hero: {
    headline: string;
    byline: {
      _key: string;
      _type: typeof schema.types[number]['name'];
      text: PortableTextMarkDefinition;
    };
    // image: Image;
  };
  content: SectionProps['sections'];
};
export const pageQuery = groq`
*[_type == 'page' && language == $language && (!slug.current == $slug || !defined(slug))][0]{
    ...,
    "slug": ${pathSnippet},
}
`;
