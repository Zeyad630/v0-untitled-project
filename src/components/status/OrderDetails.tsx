import type { Order } from "../../context/OrderContext"
import Card from "../common/Card"

interface OrderDetailsProps {
  order: Order
}

const OrderDetails = ({ order }: OrderDetailsProps) => {
  return (
    <Card title="Order Details">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Device Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Device Type</p>
              <p className="text-base">{order.deviceType}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Severity</p>
              <p className={`text-base ${order.severity === "Simple" ? "text-green-600" : "text-amber-600"}`}>
                {order.severity}
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Problem Description</p>
          <p className="text-base text-gray-800">{order.problem}</p>
        </div>

        {order.solution && (
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">Suggested Solution</p>
            <p className="text-base text-gray-800">{order.solution}</p>
          </div>
        )}

        {order.imageUrl && (
          <div>
            <p className="text-sm font-medium text-gray-500 mb-2">Uploaded Image</p>
            <img
              src={order.imageUrl || "/placeholder.svg"}
              alt="Device"
              className="max-h-48 rounded-md border border-gray-200"
            />
          </div>
        )}

        {order.customerInfo && (
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Customer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-base">{order.customerInfo.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="text-base">{order.customerInfo.phone}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm font-medium text-gray-500">Address</p>
                <p className="text-base">{order.customerInfo.address}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

export default OrderDetails
