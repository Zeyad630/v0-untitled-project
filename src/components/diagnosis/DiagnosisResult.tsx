"use client"

import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { OrderContext } from "../../context/OrderContext"
import Card from "../common/Card"
import AuthModal from "../auth/AuthModal"
import { useState } from "react"
import { AlertTriangle, CheckCircle, ArrowRight } from "lucide-react"

interface DiagnosisResultProps {
  result: {
    deviceType: string
    problem: string
    diagnosis: string
    solution: string
    severity: "Simple" | "Needs Repair"
  }
}

const DiagnosisResult = ({ result }: DiagnosisResultProps) => {
  const { isAuthenticated } = useContext(AuthContext)
  const { createOrder } = useContext(OrderContext)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const navigate = useNavigate()

  const handleRepairClick = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true)
      return
    }

    // Create a new order with the diagnosis information
    const order = createOrder({
      deviceType: result.deviceType,
      problem: result.problem,
      severity: result.severity,
      solution: result.solution,
    })

    // Navigate to repair centers page
    navigate("/repair-centers", {
      state: {
        fromDiagnosis: true,
        orderId: order.id,
      },
    })
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          {result.severity === "Simple" ? (
            <CheckCircle className="h-6 w-6 text-green-500" />
          ) : (
            <AlertTriangle className="h-6 w-6 text-amber-500" />
          )}
          <h2 className="text-xl font-semibold text-gray-800">Diagnosis Result</h2>
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Device Type</p>
              <p className="text-base font-medium">{result.deviceType}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Severity</p>
              <p
                className={`text-base font-medium ${
                  result.severity === "Simple" ? "text-green-600" : "text-amber-600"
                }`}
              >
                {result.severity}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Problem</h3>
          <p className="text-gray-600">{result.problem}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Diagnosis</h3>
          <p className="text-gray-600">{result.diagnosis}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Solution</h3>
          <p className="text-gray-600">{result.solution}</p>
        </div>

        {result.severity === "Needs Repair" && (
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={handleRepairClick}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Find Repair Centers
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </Card>
  )
}

export default DiagnosisResult
