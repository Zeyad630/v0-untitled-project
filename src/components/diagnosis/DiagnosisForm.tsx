"use client"

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { deviceTypes, simulateDiagnosis } from "../../data/dummyData"
import Card from "../common/Card"
import { Loader2 } from "lucide-react"

interface DiagnosisFormProps {
  onDiagnosisComplete: (result: any) => void
}

const DiagnosisForm = ({ onDiagnosisComplete }: DiagnosisFormProps) => {
  const [deviceType, setDeviceType] = useState("")
  const [problem, setProblem] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!deviceType) {
      setError("Please select a device type")
      return
    }

    if (problem.length < 10) {
      setError("Please provide a more detailed description of the problem")
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would call an AI API like Gemini
      // Here we're simulating the API call
      const result = await simulateDiagnosis(deviceType, problem)
      onDiagnosisComplete(result)
    } catch (err) {
      setError("An error occurred during diagnosis. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">AI Device Diagnosis</h2>

        {error && <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">{error}</div>}

        <div>
          <label htmlFor="device-type" className="block text-sm font-medium text-gray-700 mb-1">
            Device Type
          </label>
          <select
            id="device-type"
            value={deviceType}
            onChange={(e) => setDeviceType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            disabled={isLoading}
          >
            <option value="">Select a device type</option>
            {deviceTypes.map((device) => (
              <option key={device.value} value={device.label}>
                {device.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="problem" className="block text-sm font-medium text-gray-700 mb-1">
            Describe the Problem
          </label>
          <textarea
            id="problem"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            placeholder="Please describe the issue you're experiencing in detail..."
            disabled={isLoading}
          ></textarea>
          <p className="mt-1 text-sm text-gray-500">
            The more details you provide, the more accurate our diagnosis will be.
          </p>
        </div>

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Analyzing...
              </>
            ) : (
              "Diagnose My Device"
            )}
          </button>
        </div>
      </form>
    </Card>
  )
}

export default DiagnosisForm
