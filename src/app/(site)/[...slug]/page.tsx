import { ReactNode } from "react"

type PageProps = {
    params: { slug: string[] }
}

export default function Page(props: PageProps) {
    const { params } = props
    return (
        <div>
            <h1>{params.slug.join('/')}</h1>
        </div>
    )
}