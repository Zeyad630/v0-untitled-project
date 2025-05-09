"use client"

import { useEffect, useState } from "react"
import type { Order } from "../../context/OrderContext"
import Card from "../common/Card"
import { Clock, CheckCircle, AlertTriangle } from "lucide-react"

interface StatusCardProps {
  order: Order
}

const StatusCard = ({ order }: StatusCardProps) => {
  const [lastUpdated, setLastUpdated] = useState("")

  // Format the last updated time
  useEffect(() => {
    const updateTime = () => {
      const updatedDate = new Date(order.updatedAt)
      const now = new Date()
      const diffInSeconds = Math.floor((now.getTime() - updatedDate.getTime()) / 1000)

      if (diffInSeconds < 60) {
        setLastUpdated("just now")
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60)
        setLastUpdated(`${minutes} minute${minutes > 1 ? "s" : ""} ago`)
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600)
        setLastUpdated(`${hours} hour${hours > 1 ? "s" : ""} ago`)
      } else {
        const days = Math.floor(diffInSeconds / 86400)
        setLastUpdated(`${days} day${days > 1 ? "s" : ""} ago`)
      }
    }

    updateTime()
    const interval = setInterval(updateTime, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [order.updatedAt])

  // Get status color and icon
  const getStatusInfo = () => {
    switch (order.status) {
      case "Pending":
        return {
          color: "text-amber-500",
          bgColor: "bg-amber-50",
          icon: <Clock className="h-5 w-5 text-amber-500" />,
        }
      case "In Progress":
        return {
          color: "text-blue-500",
          bgColor: "bg-blue-50",
          icon: <AlertTriangle className="h-5 w-5 text-blue-500" />,
        }
      case "Fixed":
        return {
          color: "text-green-500",
          bgColor: "bg-green-50",
          icon: <CheckCircle className="h-5 w-5 text-green-500" />,
        }
      default:
        return {
          color: "text-gray-500",
          bgColor: "bg-gray-50",
          icon: <Clock className="h-5 w-5 text-gray-500" />,
        }
    }
  }

  const statusInfo = getStatusInfo()

  return (
    <Card>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Order Status</h2>
          <div className="text-sm text-gray-500 flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            Last updated: {lastUpdated}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`p-2 rounded-full ${statusInfo.bgColor} mr-3`}>{statusInfo.icon}</div>
            <div>
              <p className={`font-medium ${statusInfo.color}`}>{order.status}</p>
              <p className="text-sm text-gray-600">Order #{order.id.split("_")[1]}</p>
            </div>
          </div>

          <div className={`px-3 py-1 rounded-full ${statusInfo.bgColor} ${statusInfo.color} text-sm font-medium`}>
            {order.status === "Pending" && "Awaiting processing"}
            {order.status === "In Progress" && "Being repaired"}
            {order.status === "Fixed" && "Ready for pickup"}
          </div>
        </div>

        <div className="relative pt-6">
          <div className="flex items-center mb-8">
            <div className="relative z-10 flex items-center justify-center w-8 h-8 bg-teal-600 rounded-full">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div className="ml-4">
              <p className="font-medium">Order Received</p>
              <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
            </div>
          </div>

          <div className="flex items-center mb-8">
            <div
              className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full ${
                order.status === "Pending" ? "bg-gray-300" : "bg-teal-600"
              }`}
            >
              {order.status === "Pending" ? (
                <span className="text-white">2</span>
              ) : (
                <CheckCircle className="w-5 h-5 text-white" />
              )}
            </div>
            <div className="ml-4">
              <p className={`font-medium ${order.status === "Pending" ? "text-gray-400" : ""}`}>Diagnosis Started</p>
              {order.status !== "Pending" && (
                <p className="text-sm text-gray-500">{new Date(order.updatedAt).toLocaleString()}</p>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <div
              className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full ${
                order.status === "Fixed" ? "bg-teal-600" : "bg-gray-300"
              }`}
            >
              {order.status === "Fixed" ? (
                <CheckCircle className="w-5 h-5 text-white" />
              ) : (
                <span className="text-white">3</span>
              )}
            </div>
            <div className="ml-4">
              <p className={`font-medium ${order.status === "Fixed" ? "" : "text-gray-400"}`}>Repair Completed</p>
              {order.status === "Fixed" && (
                <p className="text-sm text-gray-500">{new Date(order.updatedAt).toLocaleString()}</p>
              )}
            </div>
          </div>

          {/* Connecting lines */}
          <div className="absolute top-10 left-4 w-0.5 h-16 bg-teal-600"></div>
          <div
            className={`absolute top-[106px] left-4 w-0.5 h-16 ${
              order.status === "Pending" ? "bg-gray-300" : "bg-teal-600"
            }`}
          ></div>
        </div>

        {order.repairCenter && (
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-md font-medium text-gray-800 mb-2">Repair Center</h3>
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-md overflow-hidden mr-3">
                <img
                  src={order.repairCenter.image || "/placeholder.svg?height=48&width=48"}
                  alt={order.repairCenter.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{order.repairCenter.name}</p>
                <p className="text-sm text-gray-600">{order.repairCenter.contact}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

export default StatusCard
