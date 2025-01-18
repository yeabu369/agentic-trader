'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeftRight, Clock, Lock, Wallet } from 'lucide-react'
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function TradingInterface() {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([])

  useEffect(() => {
    setMessages([
      {role: 'assistant', content: 'Hello! I can help you trade. Try commands like "Buy 100 SOL" or "Swap 50 $TRUMPE for SOL"'}
    ])
  }, [])

  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setMessages(prev => [...prev, {role: 'user', content: input}])
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant', 
        content: `Processing your request: "${input}". Would you like to confirm this trade?`
      }])
    }, 1000)
    
    setInput('')
  }

  const handleWalletConnect = (e: React.ButtonEvent) => {
    console.log("Button :>> Connect Wallet Button Clicked");
  }

  if (typeof window === 'undefined') {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 flex flex-col">
      {/* Navigation */}
      <nav className="flex items-center justify-between mb-6 border-b border-gray-700 pb-4">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold text-white">Agentic Trader</h1>
          <Tabs defaultValue="spot">
            <TabsList className="bg-gray-800">
              <TabsTrigger value="spot" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">Spot</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex space-x-2 border">
          <WalletMultiButton
            className="gap-2 bg-blue-600 text-white border-blue-500 hover:bg-blue-700 hover:border-blue-600"
          >
            <Wallet className="w-4 h-4" />
            Connect Wallet
          </WalletMultiButton>
        </div>
      </nav>

      {/* Centered AI Trading Assistant */}
      <div className="flex-grow flex items-center justify-center">
        <Card className="bg-gray-800 border-gray-700 w-full max-w-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">Agentic Trading Assistant</CardTitle>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-gray-700">
                  <ArrowLeftRight className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-gray-700">
                  <Clock className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-gray-700">
                  <Lock className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] flex flex-col">
              {/* Chat Messages */}
              <div className="flex-1 overflow-auto space-y-4 mb-4">
                {messages.map((message, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 max-w-[80%] ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-100'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter your trading command..."
                  className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
                <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">Send</Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

