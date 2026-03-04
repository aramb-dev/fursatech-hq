import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Fursatech HQ",
  description: "Gas Town control center — rigs, convoys, and active work at a glance.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
