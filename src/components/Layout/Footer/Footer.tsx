import { cn } from "@/lib/utils/cn"

type FooterProps = {
    className: string
}

export default function Footer(props: FooterProps) {
    const { className, ...rest } = props
    return <footer className={cn(className)} {...rest}>
        Footer
    </footer>
}