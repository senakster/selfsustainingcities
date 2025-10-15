import getSanityImageSrc from '@/lib/utils/getSanityImageSrc'
import type {AImageProps } from './AImage.types'
import Image, { getImageProps } from 'next/image'
import {cn} from '@/lib/utils/cn'

export default function AImage (props: AImageProps ) {
    const {  
        imageObj,
        width,
        aspectRatio,
        aspectRatioDesktop,
        sizes,
        priority = false,
        className,
        quality = 75,
    } = props
    if (!imageObj?.asset) return

    const common = { width, sizes, alt: imageObj.alt }
    // Determine the aspect ratio, considering "as-is" (natural image ratio)
    const baseAspectRatio = aspectRatio === 'as-is'
        ? imageObj.asset?.metadata?.dimensions?.aspectRatio
        : aspectRatio

    // Check for Sanity crop info
    const crop = imageObj?.crop
    let cropFactor = 1
    if (crop) {
        // crop is { top, bottom, left, right } as fractions (0-1)
        // verticalCropFraction: portion of image remaining after crop
        const verticalCropFraction = 1 - (crop.top || 0) - (crop.bottom || 0)
        cropFactor = verticalCropFraction > 0 ? verticalCropFraction : 1
    }

    // Adjust height for crop, maintaining intended aspect ratio
    const height = Math.round((width / baseAspectRatio) * cropFactor)
    return (
        <>
        {aspectRatioDesktop && <Source media='(min-width: 768px)' ratio={aspectRatioDesktop} />}
        <Image
          className={cn('w-full', className)}
          src={getSanityImageSrc(imageObj, width, height)}
          height={height}
          placeholder={imageObj?.asset?.metadata?.lqip ? 'blur' : undefined}
          blurDataURL={imageObj?.asset?.metadata?.lqip || undefined}
          quality={quality}
          priority={priority}
          title={imageObj.alt || ''}
          {...common}
          alt={imageObj.alt || ''}
        />
      </>
    )
  
  /**
   * Source tag
   */
  function Source({ media, ratio }: { media: string; ratio: number }) {
    if (!imageObj) return
    const height = Math.round(width / ratio)
    const src = getSanityImageSrc(imageObj, width, height)
    const props = getImageProps({ ...common, height, src }).props
    return <source media={media} width={props.width} height={props.height} srcSet={props.srcSet} />
  }
}

