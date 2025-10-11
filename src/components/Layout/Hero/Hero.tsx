import { PortableTextMarkDefinition } from "@portabletext/types"
import { cn } from "@/lib/utils/cn"
import AHeading from "@/components/Atoms/AHeading/Aheading"
import PortableText from '@/components/Layout/PortableText/PortableText'
import type {ImageObject}  from '@/components/Atoms/AImage/AImage.types'
import AImage from '@/components/Atoms/AImage/AImage'
import Container from "@/components/Layout/Container/Container"
export type HeroProps = {
    headline?: string
    leadText?: PortableTextMarkDefinition
    image?: ImageObject
    className?: string
}
export default function Hero (props: HeroProps) {
    const { headline, leadText, image, className} = props
    
    return (
        <div className={cn(className)}>
            <div className="hero-content flex flex-col gap-12">
                <div className="fixed inset-0 -z-10 min-w-screen min-h-screen object-cover">
                    <AImage className="w-full h-full object-cover" imageObj={image} width={1920} aspectRatio={19/6}  priority/>   
                    <div className="absolute inset-0 bg-(--background)/80" />
                </div>
                <Container><AHeading tag="h1" className="text-center">{headline}</AHeading></Container>
                <Container><PortableText text={leadText} /></Container>
            </div>

        </div>
    ) 
}