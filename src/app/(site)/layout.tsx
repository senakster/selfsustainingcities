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
            <Header className={'bg-amber-400'} />
            <main className="bg-teal-400">
                {children}
            </main>
            <Footer className="bg-pink-400" />
        </div>
    )
}