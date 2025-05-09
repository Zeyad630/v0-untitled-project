"use client"

import type React from "react"

import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { OrderContext } from "../../context/OrderContext"
import Card from "../common/Card"
import { repairCenters } from "../../data/dummyData"
import { Loader2, Upload } from "lucide-react"

interface BookingFormProps {
  orderId?: string
}

const BookingForm = ({ orderId }: BookingFormProps) => {
  const { centerId } = useParams<{ centerId: string }>()
  const { user } = useContext(AuthContext)
  const { createOrder, getOrderById } = useContext(OrderContext)
  const navigate = useNavigate()

  const [name, setName] = useState(user?.name || "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [address, setAddress] = useState(user?.address || "")
  const [deviceType, setDeviceType] = useState("")
  const [problem, setProblem] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Find the selected repair center
  const repairCenter = repairCenters.find((center) => center.id === centerId)

  // If we have an orderId, load the order details
  useEffect(() => {
    if (orderId) {
      const order = getOrderById(orderId)
      if (order) {
        setDeviceType(order.deviceType)
        setProblem(order.problem)
      }
    }
  }, [orderId, getOrderById])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)

      // Create a preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name || !phone || !address) {
      setError("Please fill in all required fields")
      return
    }

    if (!deviceType || !problem) {
      setError("Please provide device information")
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would upload the image to a server
      // Here we're just simulating the upload
      let imageUrl = null
      if (imageFile) {
        // Simulate upload delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        imageUrl = imagePreview
      }

      // Create a new order or update existing one
      const order = createOrder({
        deviceType,
        problem,
        severity: "Needs Repair",
        repairCenter,
        imageUrl,
        customerInfo: {
          name,
          phone,
          address,
        },
      })

      // Navigate to the status page
      navigate(`/status/${order.id}`)
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (!repairCenter) {
    return <div>Repair center not found</div>
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Book a Repair</h2>
          <p className="text-gray-600 mt-1">Complete the form below to book a repair with {repairCenter.name}</p>
        </div>

        {error && <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-md font-medium text-gray-800 mb-2">Repair Center</h3>
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-md overflow-hidden mr-3">
                <img
                  src={repairCenter.image || "/placeholder.svg"}
                  alt={repairCenter.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium">{repairCenter.name}</p>
                <p className="text-sm text-gray-600">{repairCenter.location}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium text-gray-800 mb-4">Device Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="device-type" className="block text-sm font-medium text-gray-700 mb-1">
                  Device Type *
                </label>
                <input
                  id="device-type"
                  type="text"
                  value={deviceType}
                  onChange={(e) => setDeviceType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="problem" className="block text-sm font-medium text-gray-700 mb-1">
                  Problem Description *
                </label>
                <textarea
                  id="problem"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  required
                ></textarea>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Image (Optional)
                </label>
                <div className="mt-1 flex items-center">
                  <label className="cursor-pointer bg-white px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                    <Upload className="h-4 w-4 inline mr-1" />
                    Choose File
                    <input id="image" type="file" accept="image/*" onChange={handleImageChange} className="sr-only" />
                  </label>
                  <span className="ml-3 text-sm text-gray-500">{imageFile ? imageFile.name : "No file chosen"}</span>
                </div>

                {imagePreview && (
                  <div className="mt-3">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="h-32 w-auto object-contain border rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium text-gray-800 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  required
                ></textarea>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Submitting...
                </>
              ) : (
                "Book Repair"
              )}
            </button>
          </div>
        </form>
      </div>
    </Card>
  )
}

export default BookingForm
