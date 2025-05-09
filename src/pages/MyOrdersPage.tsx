"use client"

import { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { OrderContext } from "../context/OrderContext"
import { AuthContext } from "../context/AuthContext"
import Card from "../components/common/Card"
import { Clock, CheckCircle, AlertTriangle, ChevronRight, Smartphone } from "lucide-react"

const MyOrdersPage = () => {
  const { getUserOrders } = useContext(OrderContext)
  const { isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated, navigate])

  const orders = getUserOrders()

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-5 w-5 text-amber-500" />
      case "In Progress":
        return <AlertTriangle className="h-5 w-5 text-blue-500" />
      case "Fixed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">My Orders</h1>
        <p className="text-xl text-gray-600">View and track all your device repair orders.</p>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="hover:shadow-lg transition-shadow">
              <Link to={`/status/${order.id}`} className="block">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gray-100 p-3 rounded-full">
                      <Smartphone className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{order.deviceType}</h3>
                      <p className="text-sm text-gray-500">
                        Order #{order.id.split("_")[1]} • {formatDate(order.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="flex items-center mr-4">
                      {getStatusIcon(order.status)}
                      <span
                        className={`ml-2 text-sm font-medium ${
                          order.status === "Pending"
                            ? "text-amber-500"
                            : order.status === "In Progress"
                              ? "text-blue-500"
                              : "text-green-500"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-600 line-clamp-2">{order.problem}</div>

                {order.repairCenter && (
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.repairCenter.name}</p>
                      <p className="text-xs text-gray-500">{order.repairCenter.location}</p>
                    </div>
                  </div>
                )}
              </Link>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <Smartphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
          <p className="text-gray-500 mb-6">You haven't placed any repair orders yet.</p>
          <Link
            to="/diagnosis"
            className="inline-flex items-center bg-teal-600 text-white px-6 py-3 rounded-md font-medium hover:bg-teal-700 transition-colors"
          >
            Start a Diagnosis
          </Link>
        </div>
      )}
    </div>
  )
}

export default MyOrdersPage
