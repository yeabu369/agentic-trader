'use client'

import dynamic from 'next/dynamic'

const TradingInterface = dynamic(() => import('./trading-interface'), {
  ssr: false,
})

export default function ClientTradingInterface() {
  return <TradingInterface />
}

