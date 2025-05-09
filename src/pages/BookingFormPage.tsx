"use client"

import { useParams, useLocation } from "react-router-dom"
import BookingForm from "../components/repair/BookingForm"

const BookingFormPage = () => {
  const { centerId } = useParams<{ centerId: string }>()
  const location = useLocation()

  // Check if coming from diagnosis with an order ID
  const orderId = location.state?.orderId

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Book a Repair</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Complete the form below to book your device repair.</p>
      </div>

      <BookingForm orderId={orderId} />
    </div>
  )
}

export default BookingFormPage
