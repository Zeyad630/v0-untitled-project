"use client"

import { Link } from "react-router-dom"
import { useEffect } from "react"
import { initializeDummyData, services } from "../data/dummyData"
import { Smartphone, Cpu, Wrench, ArrowRight, CheckCircle, Clock, Shield } from "lucide-react"

const HomePage = () => {
  // Initialize dummy data when the app loads
  useEffect(() => {
    initializeDummyData()
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-500 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Smart Device Repair Made Simple</h1>
              <p className="text-xl mb-8">
                Get your devices diagnosed and repaired by professionals. Fast, reliable, and hassle-free.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/diagnosis"
                  className="bg-white text-teal-700 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                  AI Diagnosis
                </Link>
                <Link
                  to="/repair-centers"
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
                >
                  Find Repair Centers
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Device Repair"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge AI technology with expert technicians to provide the best repair experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Cpu className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Diagnosis</h3>
              <p className="text-gray-600">
                Our advanced AI system can diagnose device issues with high accuracy, saving you time and money.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Wrench className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Technicians</h3>
              <p className="text-gray-600">
                Our certified technicians have years of experience repairing all types of devices.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-teal-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Warranty Guaranteed</h3>
              <p className="text-gray-600">All our repairs come with a 90-day warranty for parts and labor.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process makes getting your device repaired quick and easy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">1. Diagnose</h3>
              <p className="text-gray-600">Use our AI tool to diagnose your device issue.</p>
            </div>

            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">2. Book</h3>
              <p className="text-gray-600">Choose a repair center and book an appointment.</p>
            </div>

            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">3. Track</h3>
              <p className="text-gray-600">Track the status of your repair in real-time.</p>
            </div>

            <div className="text-center">
              <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">4. Fixed</h3>
              <p className="text-gray-600">Get your device back, good as new!</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/diagnosis"
              className="inline-flex items-center bg-teal-600 text-white px-6 py-3 rounded-md font-medium hover:bg-teal-700 transition-colors"
            >
              Start Diagnosis
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer a wide range of repair services for all your devices.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <p className="text-teal-600 font-medium">{service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Fix Your Device?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Start with our AI diagnosis tool or find a repair center near you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/diagnosis"
              className="bg-white text-teal-700 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Start Diagnosis
            </Link>
            <Link
              to="/repair-centers"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
            >
              Find Repair Centers
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
