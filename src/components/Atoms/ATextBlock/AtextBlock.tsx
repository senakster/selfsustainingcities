import type { ComponentProps } from '@/components/Layout/SectionsResolver/SectionsResolver'
import Container from "@/components/Layout/Container/Container"
import PortableText from '@/components/Layout/PortableText/PortableText'

type Props = ComponentProps & {}

export default function ATextblock ({data}: Props) {
    const { ...rest } = data
    return (
        <Container>
            <PortableText text={data} {...rest} />
        </Container>
    )
}