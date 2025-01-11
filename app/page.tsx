import ClientTradingInterface from '@/components/client-trading-interface'
import { geistMono } from './fonts'

export default function Home() {
  return (
    <main className={`${geistMono.className} min-h-screen bg-gray-900`}>
      <ClientTradingInterface />
    </main>
  )
}

