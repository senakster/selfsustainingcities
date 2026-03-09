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
 * to avoid "Session not found" (SIO-401-ANF) when using session-based editor tokens on the server.
 * If your dataset requires auth for read, set NEXT_PUBLIC_SANITY_TOKEN or SANITY_READ_TOKEN.
 */
const getReadToken = (): string | undefined =>
  process.env.NEXT_PUBLIC_SANITY_TOKEN ||
  process.env.SANITY_READ_TOKEN ||
  undefined;

const getPreviewToken = (): string | undefined =>
  process.env.NEXT_SANITY_EDITOR_TOKEN ||
  process.env.NEXT_PUBLIC_SANITY_TOKEN ||
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
    useCdn: !isPreview,
  });

  const response = client.fetch<T>(query, params, {
    ...(isPreview
      ? {
          token: getPreviewToken(),
          perspective: 'drafts',
          useCdn: false,
          cache: 'no-store',
        }
      : {
          token: getReadToken(),
          perspective: 'published',
          useCdn: true,
          cache: 'force-cache',
        }),
    next: {
      tags,
    },
  });

  return response;
}

