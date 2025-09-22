import type { Image, ImageDimensions } from 'sanity'

export type ImageObject = {
    alt: string
    asset?: {
      mimeType: string
      url: string
      metadata: {
        dimensions: ImageDimensions
        lqip: string
      }
    }
  } & Image

export type AImageProps = {
    imageObj?: ImageObject
    width: number
    sizes?: string
    aspectRatio: number | 'as-is'
    aspectRatioDesktop?: number
    priority?: boolean
    className?: string
    quality?: number | `${number}`
  }