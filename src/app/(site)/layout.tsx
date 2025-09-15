import { Children, ReactNode } from "react"
import Header from "@/components/Layout/Header/Header"
import Footer from "@/components/Layout/Footer/Footer"
type PageLayoutProps = {
    children: ReactNode
}


export default function PageLayout(props: PageLayoutProps) {
    const { children } = props
    return (
        <div className="h-screen grid grid-cols-1 grid-rows-[auto_1fr_auto]">
            <Header className={'bg-fuchsia-950'} />
            <main className="">
                {children}
            </main>
            <Footer className="bg-fuchsia-950" />
        </div>
    )
}