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

/**
 * Use a token only for preview (drafts). Published content is fetched without a token
 * to avoid "Session not found" (SIO-401-ANF); Sanity allows anonymous read for published content by default.
 * If your dataset requires auth for read, set SANITY_READ_TOKEN to a server API token (not a session token).
 */
const getPreviewToken = (): string | undefined =>
  process.env.NEXT_PUBLIC_SANITY_TOKEN ||
  process.env.NEXT_SANITY_EDITOR_TOKEN ||
  undefined;

export async function sanityClient<T>({
  isPreview,
  query,
  params = {},
  tags = [],
}: TSanityFetchProps): Promise<T> {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
  });

  const response = client.fetch<T>(query, params, {
    ...(isPreview
      ? {
        token: getPreviewToken(),
        perspective: 'drafts',
      }
    : {
      perspective: 'published',
      next: {
        tags,
      },
    }),
  });
  return response;
}
