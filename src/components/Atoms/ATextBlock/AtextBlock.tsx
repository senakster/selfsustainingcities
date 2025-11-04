import type { ComponentProps } from '@/components/Layout/SectionsResolver/SectionsResolver'
import Container from "@/components/Layout/Container/Container"
import PortableText from '@/components/Layout/PortableText/PortableText'
import { PortableTextMarkDefinition } from '@portabletext/types'
import { cn } from '@/lib/utils/cn'

type Props = ComponentProps & { data: {text: PortableTextMarkDefinition} }

export default function ATextblock ({data, className, ...rest}: Props) {
    const { text } = data
    return (
        <Container>
            <div className={cn('max-w-5xl mx-auto py-12', className)}>
                <PortableText text={text} {...rest} />
            </div>
        </Container>
    )
}