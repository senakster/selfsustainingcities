type LayoutProps = {
    children: React.ReactNode
}

export default function StudioRootLayout ({children}: LayoutProps) {
    return (
        <html>
            <body>
                {children}
            </body>
        </html>
    )
}