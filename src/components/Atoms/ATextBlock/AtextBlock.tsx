import type { ComponentProps } from '@/components/Layout/SectionsResolver/SectionsResolver'
import Container from "@/components/Layout/Container/Container"
import PortableText from '@/components/Layout/PortableText/PortableText'
import { PortableTextMarkDefinition } from '@portabletext/types'

type Props = ComponentProps & { data: {text: PortableTextMarkDefinition} }

export default function ATextblock ({data, ...rest}: Props) {
    const { text } = data
    return (
        <Container>
            <div className='max-w-5xl mx-auto'>
                <PortableText text={text} {...rest} />
            </div>
        </Container>
    )
}