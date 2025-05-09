"use client"

import type React from "react"

import { useState, useEffect, useRef, useContext } from "react"
import { OrderContext, type ChatMessage } from "../../context/OrderContext"
import Card from "../common/Card"
import { Send } from "lucide-react"

interface ChatBoxProps {
  orderId: string
}

const ChatBox = ({ orderId }: ChatBoxProps) => {
  const { addChatMessage, getOrderChatMessages } = useContext(OrderContext)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load messages
  useEffect(() => {
    setMessages(getOrderChatMessages(orderId))

    // If no messages, add a welcome message
    if (getOrderChatMessages(orderId).length === 0) {
      addChatMessage(
        orderId,
        "Welcome to our repair service chat! How can we help you with your device repair?",
        "center",
      )
    }
  }, [orderId, getOrderChatMessages, addChatMessage])

  // Update messages when they change
  useEffect(() => {
    const updatedMessages = getOrderChatMessages(orderId)
    setMessages(updatedMessages)
  }, [orderId, getOrderChatMessages])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (newMessage.trim() === "") return

    addChatMessage(orderId, newMessage, "user")
    setNewMessage("")
  }

  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Card title="Chat with Repair Center">
      <div className="flex flex-col h-96">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  message.sender === "user" ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-800"
                }`}
              >
                <p>{message.message}</p>
                <p className={`text-xs mt-1 ${message.sender === "user" ? "text-teal-100" : "text-gray-500"}`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="flex items-center mt-auto">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
          />
          <button
            type="submit"
            className="bg-teal-600 text-white px-4 py-2 rounded-r-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </Card>
  )
}

export default ChatBox
