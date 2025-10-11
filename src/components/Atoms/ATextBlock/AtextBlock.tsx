import type { ComponentProps } from '@/components/Layout/SectionsResolver/SectionsResolver'
import Container from "@/components/Layout/Container/Container"
import PortableText from '@/components/Layout/PortableText/PortableText'
import { PortableTextMarkDefinition } from '@portabletext/types'

type Props = ComponentProps & { data: PortableTextMarkDefinition }

export default function ATextblock ({data, ...rest}: Props) {
    return (
        <Container>
            <PortableText text={data} {...rest} />
        </Container>
    )
}