import { groq } from "next-sanity";

export const pagesParamsQuery = groq`
*[_type == 'page' && defined(slug.current) && (!defined($locale) || language == $locale)] {
  language,
  _updatedAt,
  'slugs': [slug.current],
  defined(parent->slug.current) => {
    'slugs': [parent->slug.current, slug.current]
  },
  defined(parent->parent->slug.current) => {
    'slugs': [parent->parent->slug.current, parent->slug.current, slug.current]
  },
}`