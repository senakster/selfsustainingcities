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
const token = 'skloiPfF4e31lklWQTjBOpjzkk4w1K8RsFSEOsSQ4ZPEE4HS5dg7K6iEfmzgS2qikLjdevbGUhYEpP24VtSjWWcfYpFtkWK8oC21tZa4X5oR862Gzqa0q02BVg4P3HkRvWOnYV0FI9LQRzf2PNLu1iQDWPZMMPpze4bJOiMWYozZeW9hGt2v'

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

