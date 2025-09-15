import { cn } from "@/lib/utils/cn";
import Link from "next/link";

type HeaderProps = {
    className: string
}
export default function Header(props: HeaderProps) {
    const { className, ...rest } = props
    return <header className={cn(`grid grid-rows-1 grid-cols-2 ${className}`)} {...rest}>
        <div><Link href='/'> Logo (home)</Link></div>
        <ul className="flex gap-2">
            <li>
                <Link href={'/about'}>
                    About
                </Link>
            </li>
            <li>
                <Link href={'/people'}>
                    People
                </Link>
            </li>
            <li>
                <Link href={'/contact'}>
                    Contact
                </Link>
            </li>
        </ul>

    </header>
}