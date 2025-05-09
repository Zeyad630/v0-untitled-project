"use client"

import { createContext, useState, useEffect, type ReactNode, useContext } from "react"
import { AuthContext } from "./AuthContext"

export interface Order {
  id: string
  userId: string
  deviceType: string
  problem: string
  severity: "Simple" | "Needs Repair"
  solution?: string
  repairCenter?: {
    id: string
    name: string
    location: string
    contact: string
  }
  imageUrl?: string
  status: "Pending" | "In Progress" | "Fixed"
  createdAt: string
  updatedAt: string
  customerInfo?: {
    name: string
    phone: string
    address: string
  }
}

export interface ChatMessage {
  id: string
  orderId: string
  sender: "user" | "center"
  message: string
  timestamp: string
}

interface OrderContextType {
  orders: Order[]
  chatMessages: Record<string, ChatMessage[]> // orderId -> messages
  createOrder: (orderData: Partial<Order>) => Order
  updateOrderStatus: (orderId: string, status: Order["status"]) => void
  getOrderById: (orderId: string) => Order | undefined
  getUserOrders: () => Order[]
  addChatMessage: (orderId: string, message: string, sender: "user" | "center") => void
  getOrderChatMessages: (orderId: string) => ChatMessage[]
}

export const OrderContext = createContext<OrderContextType>({
  orders: [],
  chatMessages: {},
  createOrder: () => ({}) as Order,
  updateOrderStatus: () => {},
  getOrderById: () => undefined,
  getUserOrders: () => [],
  addChatMessage: () => {},
  getOrderChatMessages: () => [],
})

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([])
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({})
  const { user } = useContext(AuthContext)

  // Load orders and chat messages from localStorage on initial render
  useEffect(() => {
    const storedOrders = localStorage.getItem("orders")
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders))
    }

    const storedChatMessages = localStorage.getItem("chatMessages")
    if (storedChatMessages) {
      setChatMessages(JSON.parse(storedChatMessages))
    }
  }, [])

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders))
  }, [orders])

  // Save chat messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(chatMessages))
  }, [chatMessages])

  const createOrder = (orderData: Partial<Order>): Order => {
    if (!user) throw new Error("User must be logged in to create an order")

    const newOrder: Order = {
      id: `order_${Date.now()}`,
      userId: user.id,
      deviceType: orderData.deviceType || "",
      problem: orderData.problem || "",
      severity: orderData.severity || "Needs Repair",
      solution: orderData.solution,
      repairCenter: orderData.repairCenter,
      imageUrl: orderData.imageUrl,
      status: "Pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      customerInfo: orderData.customerInfo,
    }

    setOrders((prevOrders) => [...prevOrders, newOrder])
    return newOrder
  }

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status, updatedAt: new Date().toISOString() } : order,
      ),
    )
  }

  const getOrderById = (orderId: string) => {
    return orders.find((order) => order.id === orderId)
  }

  const getUserOrders = () => {
    if (!user) return []
    return orders.filter((order) => order.userId === user.id)
  }

  const addChatMessage = (orderId: string, message: string, sender: "user" | "center") => {
    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      orderId,
      sender,
      message,
      timestamp: new Date().toISOString(),
    }

    setChatMessages((prevMessages) => {
      const orderMessages = prevMessages[orderId] || []
      return {
        ...prevMessages,
        [orderId]: [...orderMessages, newMessage],
      }
    })

    // If this is a user message, simulate a reply from the repair center
    if (sender === "user") {
      setTimeout(() => {
        const replies = [
          "Thanks for your message. We're working on your device!",
          "We've received your inquiry and will get back to you shortly.",
          "Your device is currently being diagnosed by our technicians.",
          "We'll update you on the progress soon. Thanks for your patience!",
          "Our team is working on your repair. We'll keep you posted.",
        ]

        const randomReply = replies[Math.floor(Math.random() * replies.length)]
        addChatMessage(orderId, randomReply, "center")
      }, 1500)
    }
  }

  const getOrderChatMessages = (orderId: string): ChatMessage[] => {
    return chatMessages[orderId] || []
  }

  return (
    <OrderContext.Provider
      value={{
        orders,
        chatMessages,
        createOrder,
        updateOrderStatus,
        getOrderById,
        getUserOrders,
        addChatMessage,
        getOrderChatMessages,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}
