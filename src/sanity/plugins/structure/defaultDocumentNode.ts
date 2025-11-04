import { SanityClient, groq } from 'next-sanity'
import { SanityDocument } from 'next-sanity'
import { DefaultDocumentNodeResolver } from 'sanity/structure'
import { Iframe } from 'sanity-plugin-iframe-pane'
// import { pageDocumentTypes } from '../../schemaTypes/documents/_pageDocumentTypes'
import { referencePathQuery } from '../../lib/helpers'
import { previewToken, apiVersion } from '../../env'


export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  // Get client from structure-context
  const client = S.context.getClient({
    apiVersion: apiVersion,
  })

  // Handle page types
  if (['page'].includes(schemaType)) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .options({
          url: async (doc: SanityDocument) => await getPreviewUrl(doc, client),
        })
        .title('Preview'),
    ])
  }

  // Default / the rest
  return S.document().views([S.view.form()])
}

// Customise this function to show the correct URL based on the current document
async function getPreviewUrl(doc: SanityDocument, client: SanityClient) {
  const baseUrl = window.location.origin
  const query = groq`*[_id == $id][0] { 'path': ${referencePathQuery}, language }`
  const res = await client.fetch(query, { id: doc._id, config: { cache: 'no-store' } })
  const urlPath = res?.path
  const redirect = urlPath ? `&redirect=${encodeURIComponent(urlPath)}` : `&redirect=/${res?.language}`
  return `${baseUrl}/api/preview?token=${previewToken}${redirect}`
}
