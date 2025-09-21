import type { Metadata } from "next";

import "./globals.css";


export const metadata: Metadata = {
  title: "Self-sustaining Cities",
  description: "Selvforsynende byer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html>
        <body>
          {children}
        </body>
      </html>
  );
}
