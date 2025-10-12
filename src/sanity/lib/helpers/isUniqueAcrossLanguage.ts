import { SlugValidationContext } from 'sanity'
export async function isUniqueAcrossLanguage(slug: string, context: SlugValidationContext) {
  const { document, getClient } = context
  const client = getClient({
    apiVersion: `v${process.env.NEXT_PUBLIC_SANITY_API_VERSION}` || 'v2025-02-19',
  })
  const id = document?._id.replace(/^drafts\./, '')
  const language = document?.language
  const params = {
    draft: `drafts.${id}`,
    published: id,
    language,
    slug,
  }
  const query = `!defined(*[!(_id in [$draft, $published]) && slug.current == $slug && language == $language][0]._id)`
  const result = await client.fetch(query, params)
  return result
}