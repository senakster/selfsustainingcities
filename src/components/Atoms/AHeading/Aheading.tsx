import { ReactNode } from "react"

type AHeadingProps = {
    children: ReactNode
    className: string
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'span'
}
export default function AHeading(props: AHeadingProps) {
    const { tag: Tag, children, className, ...rest } = props
    return <Tag className={className} {...rest}>{children}</Tag>
}