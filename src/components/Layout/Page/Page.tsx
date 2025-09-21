import { PageQueryProps } from "@/adapters/sanity/queries/page.query";


export default function Page ({ page }: { page: PageQueryProps }) {
    return (
        <div>
            <pre>{JSON.stringify(page)}</pre>
        </div>
    )
}