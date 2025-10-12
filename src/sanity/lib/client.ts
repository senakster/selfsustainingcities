'use server'
import 'server-only'


import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";
type TSanityFetchProps = {
  isPreview?: boolean
  token?: string
  query: string
  params?: object
  tags?: string[]
}
const token = process.env.SANITY_STUDIO_EDITOR_TOKEN;

export async function sanityClient<T>({
  isPreview,
  query,
  params = {},
  tags = [],
}: TSanityFetchProps): Promise<T> { 
  console.log({token, dataset, apiVersion, isPreview })    
    const response = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
    }).fetch<T>(query, params, {
    ...(isPreview
      ? {
          token,
          perspective: 'drafts',
          useCdn: false,
          cache: 'no-store',
        }
      : {
          token,
          perspective: 'published',
          useCdn: false,
          cache: 'force-cache',
        }),
    next: {
      tags,
    },
  })
  console.log('response', response.then(console.log))
  return response
}

