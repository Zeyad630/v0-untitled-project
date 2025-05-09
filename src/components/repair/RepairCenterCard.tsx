"use client"

import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import AuthModal from "../auth/AuthModal"
import { MapPin, Phone, Star, ArrowRight } from "lucide-react"

interface RepairCenterProps {
  center: {
    id: string
    name: string
    location: string
    contact: string
    rating: number
    specialties: string[]
    image: string
  }
}

const RepairCenterCard = ({ center }: RepairCenterProps) => {
  const { isAuthenticated } = useContext(AuthContext)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const navigate = useNavigate()

  const handleBookNow = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true)
      return
    }

    navigate(`/booking/${center.id}`)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-48 overflow-hidden">
        <img src={center.image || "/placeholder.svg"} alt={center.name} className="w-full h-full object-cover" />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{center.name}</h3>
          <div className="flex items-center bg-teal-50 px-2 py-1 rounded text-sm">
            <Star className="h-4 w-4 text-yellow-400 mr-1" />
            <span className="font-medium">{center.rating}</span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
            <span className="text-gray-600">{center.location}</span>
          </div>

          <div className="flex items-start">
            <Phone className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
            <span className="text-gray-600">{center.contact}</span>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Specialties:</h4>
          <div className="flex flex-wrap gap-2">
            {center.specialties.map((specialty, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                {specialty}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleBookNow}
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Book Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  )
}

export default RepairCenterCard
