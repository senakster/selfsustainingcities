import { cn } from "@/lib/utils/cn"
import Link from "next/link"
import {  MouseEventHandler, ReactNode } from "react"

type Props = {
    onClick?: MouseEventHandler<HTMLButtonElement>
    children: ReactNode
    className?: string
} & ({target?: string, href?: string} | {onClick?: MouseEventHandler<HTMLButtonElement> })


export default function AButton (props: Props) {
    const { onClick: onClick, children} = props


    return (
        ('href' in props && props.href && !onClick) ? (
            <Link className={cn('border-1 border-black rounded-md px-4 py-2', props.className)} href={props.href} target={props.target}>
                {children}  
            </Link>
        ) : (
        <button className={cn('border-1 border-black rounded-md px-4 py-2', props.className)} onClick={onClick as MouseEventHandler<HTMLButtonElement>}>
            {children}
        </button>
    ))
}