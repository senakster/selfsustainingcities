import { client } from "@/sanity/lib/client"
import { pageQuery, type PageQueryProps } from "@/adapters/sanity/queries/page.query"
import { notFound } from "next/navigation"

export default async function Home() {
    const page = await client.fetch<PageQueryProps>(pageQuery, { slug: ['/'] })
    if (!page) {
        notFound()
    }
    const { title } = page
    return (
        <div>
            <h1>
                {title}
            </h1>
            <pre>
                {JSON.stringify(page)}
            </pre>
        </div>)
} 