import 'server-only'

import { createClient } from "next-sanity";
import isDraftMode from "./helpers/isDraftMode"
import { apiVersion, dataset, projectId } from "../env";
import { editorToken  } from "../env";

type TSanityFetchProps = {
  query: string
  params?: object
  tags?: string[]
}

export async function sanityClient<T>({
  query,
  params = {},
  tags = [],
}: TSanityFetchProps): Promise<T> {
  const isPreview = await isDraftMode() || process.env.NODE_ENV === 'development'

    return createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
    }).fetch<T>(query, params, {
    ...(isPreview
      ? {
          token: editorToken,
          perspective: 'drafts',
          useCdn: false,
          cache: 'no-store',
        }
      : {
          token: editorToken,
          perspective: 'published',
          useCdn: true,
          cache: 'force-cache',
        }),
    next: {
      tags,
    },
  })
}

