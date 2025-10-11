import 'server-only'

import { createClient } from "next-sanity";
import isDraftMode from "./helpers/isDraftMode"
import { apiVersion, dataset, projectId } from "../env";
type TSanityFetchProps = {
  isPreview?: boolean
  token?: string
  query: string
  params?: object
  tags?: string[]
}

export async function sanityClient<T>({
  isPreview,
  query,
  params = {},
  tags = [],
}: TSanityFetchProps): Promise<T> {
  'use server'
  const token = process.env.SANITY_STUDIO_EDITOR_TOKEN;
  
    return createClient({
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
          useCdn: true,
          cache: 'force-cache',
        }),
    next: {
      tags,
    },
  })
}

