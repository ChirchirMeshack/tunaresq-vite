import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "TunaResQ - Connecting Hearts, Transforming Lives",
  description:
    "TunaResQ connects those in need with those who can help, creating a circular giving economy for Africans to support each other."
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <main>{children}</main>
        <Toaster />
        </body>
    </html>
  )
}
