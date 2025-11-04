import type { PortableTextMarkDefinition } from "@portabletext/types"
import type { ImageObject } from "@/components/Atoms/AImage/AImage.types"
import type { FlexibleLinkProps } from "@/components/Atoms/AFlexibleLink/AFlexibleLink"
import AFlexibleLink from "@/components/Atoms/AFlexibleLink/AFlexibleLink"
import { cn } from "@/lib/utils/cn"
import PortableText from "@/components/Layout/PortableText/PortableText"
import AImage from "../AImage/AImage"
import Container from "@/components/Layout/Container/Container"

export type TextImageProps = {
    text: PortableTextMarkDefinition
    image: ImageObject
    link: FlexibleLinkProps
    imageAlignment: string
}

export default function TextImage({ data }: { data: TextImageProps }) {
    const { text, image, link, imageAlignment } = data
    return (
        <div className={cn('bg-theme-quarternary text-background')}>
            <Container className='grid grid-cols-1 lg:grid-cols-2 grid-rows-2 lg:grid-rows-1 gap-4 relative px-0 lg:px-4'>
            <div className={cn("w-full", imageAlignment === 'left' ? 'order-1' : 'order-2')}>
             <AImage imageObj={image} width={800} aspectRatio={16 / 9} aspectRatioDesktop={1} sizes="(max-width: 768px) 50vw, 720px" priority />
            </div>
            <div className={cn("flex-col gap-4", imageAlignment === 'left' ? 'order-2' : 'order-1')}>
                <div className="size-full flex items-center justify-center text-center p-4 text-theme-secondary">
                    <PortableText text={text} />
                </div>
                <AFlexibleLink href={link.href} target={link.target}>{link.children}</AFlexibleLink>
            </div>
            </Container>
        </div>
    )
}