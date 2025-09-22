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
    const r = aspectRatio === 'as-is' ? imageObj.asset.metadata.dimensions.aspectRatio : aspectRatio
    const height = Math.round(width / r)

    return (
        <>
        {aspectRatioDesktop && <Source media='(min-width: 768px)' ratio={aspectRatioDesktop} />}
        <Image
          className={cn('w-full', className)}
          src={getSanityImageSrc(imageObj, width, height)}
          height={height}
          placeholder='blur'
          blurDataURL={imageObj.asset.metadata.lqip}
          quality={quality}
          priority={priority}
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

