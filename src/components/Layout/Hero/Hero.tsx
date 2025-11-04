import { PortableTextMarkDefinition } from "@portabletext/types"
import { cn } from "@/lib/utils/cn"
import AHeading from "@/components/Atoms/AHeading/Aheading"
import PortableText from '@/components/Layout/PortableText/PortableText'
import type { ImageObject } from '@/components/Atoms/AImage/AImage.types'
import AImage from '@/components/Atoms/AImage/AImage'
import Container from "@/components/Layout/Container/Container"
export type HeroProps = {
    headline?: string
    leadText?: PortableTextMarkDefinition
    image?: ImageObject
    className?: string
    textClasses?: string
}
export default function Hero(props: HeroProps) {
    const { headline, leadText, image, className, textClasses } = props

    return (
        <div className={cn('z-10 bg-theme-primary', className)}>
                <Container className='px-0 lg:px-4'>
            <div className="hero-content flex flex-col lg:grid grid-cols-1 lg:grid-cols-2 gap-12 relative py-12 pt-0 lg:pt-12 overflow-hidden items-center justify-center">
                    <div className={cn('flex flex-col gap-4 text-center order-2 lg:order-1 px-4 lg:px-0 text-background', textClasses)}>
                        <AHeading tag="h1" className="text-center">{headline}</AHeading>
                        <PortableText text={leadText} />
                    </div>
                <div className="order-1 lg:order-2 w-full">
                    <AImage className="w-full h-full object-cover" imageObj={image} width={1920} aspectRatio={16 / 9} aspectRatioDesktop={1} sizes="(max-width: 768px) 50vw, 720px" priority />
                </div>

            </div>
            </Container>

        </div>
    )
}