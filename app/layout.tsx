import type { Metadata } from 'next'
import './globals.css'
import AppWalletProvider from "@/components/AppWalletProvider.tsx";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: 'Agentic Trader',
  description: 'Trade onChain with words',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AppWalletProvider>
          {children}
          <Analytics />
        </AppWalletProvider>
      </body>
    </html>
  )
}
