"use client"

import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { repairCenters } from "../data/dummyData"
import RepairCenterCard from "../components/repair/RepairCenterCard"
import { MapPin, Search } from "lucide-react"

const RepairCentersPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCenters, setFilteredCenters] = useState(repairCenters)
  const location = useLocation()

  // Check if coming from diagnosis
  const fromDiagnosis = location.state?.fromDiagnosis
  const orderId = location.state?.orderId

  useEffect(() => {
    if (searchTerm) {
      const filtered = repairCenters.filter(
        (center) =>
          center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          center.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          center.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())),
      )
      setFilteredCenters(filtered)
    } else {
      setFilteredCenters(repairCenters)
    }
  }, [searchTerm])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Repair Centers</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Find a repair center near you to fix your device.
          {fromDiagnosis && " We recommend booking with one of our certified repair centers."}
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, location, or specialty..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Centers Grid */}
      {filteredCenters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCenters.map((center) => (
            <RepairCenterCard key={center.id} center={center} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No repair centers found</h3>
          <p className="text-gray-500">Try adjusting your search or check back later for more options.</p>
        </div>
      )}
    </div>
  )
}

export default RepairCentersPage
