"use client"

import { useState } from "react"
import DiagnosisForm from "../components/diagnosis/DiagnosisForm"
import DiagnosisResult from "../components/diagnosis/DiagnosisResult"

const DiagnosisPage = () => {
  const [diagnosisResult, setDiagnosisResult] = useState<any>(null)

  const handleDiagnosisComplete = (result: any) => {
    setDiagnosisResult(result)

    // Scroll to results
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Device Diagnosis</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Describe your device problem, and our AI will diagnose the issue and recommend solutions.
        </p>
      </div>

      {diagnosisResult ? (
        <DiagnosisResult result={diagnosisResult} />
      ) : (
        <DiagnosisForm onDiagnosisComplete={handleDiagnosisComplete} />
      )}

      {diagnosisResult && (
        <div className="mt-8 text-center">
          <button onClick={() => setDiagnosisResult(null)} className="text-teal-600 font-medium hover:text-teal-700">
            Start a new diagnosis
          </button>
        </div>
      )}
    </div>
  )
}

export default DiagnosisPage
