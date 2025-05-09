"use client"

import { useContext, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { OrderContext, type Order } from "../context/OrderContext"
import { AuthContext } from "../context/AuthContext"
import StatusCard from "../components/status/StatusCard"
import OrderDetails from "../components/status/OrderDetails"
import ChatBox from "../components/status/ChatBox"
import { Loader2 } from "lucide-react"

const StatusPage = () => {
  const { orderId } = useParams<{ orderId: string }>()
  const { getOrderById, updateOrderStatus } = useContext(OrderContext)
  const { isAuthenticated } = useContext(AuthContext)
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate("/")
      return
    }

    // Load order
    if (orderId) {
      const foundOrder = getOrderById(orderId)
      if (foundOrder) {
        setOrder(foundOrder)
      }
    }

    setLoading(false)
  }, [orderId, getOrderById, isAuthenticated, navigate])

  // Simulate order status updates
  useEffect(() => {
    if (order && order.status === "Pending") {
      // Simulate moving to "In Progress" after 30 seconds
      const timer = setTimeout(() => {
        updateOrderStatus(order.id, "In Progress")
        setOrder((prev) => (prev ? { ...prev, status: "In Progress" } : null))
      }, 30000)

      return () => clearTimeout(timer)
    }

    if (order && order.status === "In Progress") {
      // Simulate moving to "Fixed" after 60 seconds
      const timer = setTimeout(() => {
        updateOrderStatus(order.id, "Fixed")
        setOrder((prev) => (prev ? { ...prev, status: "Fixed" } : null))
      }, 60000)

      return () => clearTimeout(timer)
    }
  }, [order, updateOrderStatus])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 text-teal-600 animate-spin" />
      </div>
    )
  }

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          The order you're looking for doesn't exist or you don't have access to it.
        </p>
        <button
          onClick={() => navigate("/my-orders")}
          className="bg-teal-600 text-white px-6 py-3 rounded-md font-medium hover:bg-teal-700 transition-colors"
        >
          View My Orders
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Repair Status</h1>
        <p className="text-xl text-gray-600">
          Track the status of your device repair and communicate with the repair center.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <StatusCard order={order} />
          <OrderDetails order={order} />
        </div>

        <div>
          <ChatBox orderId={order.id} />
        </div>
      </div>
    </div>
  )
}

export default StatusPage
